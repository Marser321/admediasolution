import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/servicios",
  "/servicios/embudos-neurales",
  "/servicios/contenido-generativo",
  "/servicios/ads-autopilot",
  "/planificacion",
  "/comunidad",
  "/danger",
  "/equipo",
  "/about-us",
  "/casos",
] as const;

const THEMES = ["classic", "luxury", "white", "sky"] as const;

type Theme = (typeof THEMES)[number];

async function setTheme(page: Page, theme: Theme) {
  await page.addInitScript((themeName) => {
    window.localStorage.setItem("vibe-theme", themeName);
    window.sessionStorage.setItem("promo-popup-closed", "true");
  }, theme);
}

test.describe("rhythm/theme audit", () => {
  for (const route of ROUTES) {
    for (const theme of THEMES) {
      test(`${route} renders with stable rhythm in ${theme}`, async ({ page }, testInfo) => {
        await setTheme(page, theme);

        const consoleErrors: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => consoleErrors.push(error.message));

        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(650);

        const metrics = await page.evaluate(() => {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const mobileAudit = viewportWidth <= 430;
          const doc = document.documentElement;
          const body = document.body;
          const isVisible = (el: Element) => {
            const element = el as HTMLElement;
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              Number(style.opacity) > 0.05 &&
              style.pointerEvents !== "none" &&
              !element.closest('[aria-hidden="true"]')
            );
          };

          const sections = [...document.querySelectorAll("main > section, main > footer")].map((el, index) => {
            const rect = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            const heading = el.querySelector("h1,h2,h3");
            const paragraph = el.querySelector("p");
            const headingRect = heading?.getBoundingClientRect();
            const paragraphRect = paragraph?.getBoundingClientRect();

            return {
              index,
              id: el.id || el.tagName.toLowerCase(),
              height: Math.round(rect.height),
              paddingTop: style.paddingTop,
              paddingBottom: style.paddingBottom,
              heading: heading?.textContent?.trim().slice(0, 80) ?? null,
              headingParagraphGap: headingRect && paragraphRect ? Math.round(paragraphRect.top - headingRect.bottom) : null,
            };
          });

          const clippedText = [...document.querySelectorAll("h1,h2,h3,p,a,button,span,label")]
            .filter((el) => {
              const rect = el.getBoundingClientRect();
              const style = getComputedStyle(el);
              const text = el.textContent?.trim().replace(/\s+/g, " ") ?? "";
              if (rect.width < 1 || rect.height < 1 || style.visibility === "hidden" || style.display === "none") return false;
              if (el.classList.contains("sr-only")) return false;
              if (!text) return false;
              if (el.querySelector("svg")) return false;
              return el.scrollWidth > el.clientWidth + 16 && rect.width <= viewportWidth;
            })
            .slice(0, 12)
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              text: el.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ?? "",
              clientWidth: el.clientWidth,
              scrollWidth: el.scrollWidth,
            }));

          const unexplainedHorizontalScrollers = mobileAudit
            ? [...document.querySelectorAll<HTMLElement>("body *")]
                .filter((el) => {
                  if (!isVisible(el)) return false;
                  const style = getComputedStyle(el);
                  return (
                    el.scrollWidth > el.clientWidth + 4 &&
                    (style.overflowX === "auto" || style.overflowX === "scroll") &&
                    !el.hasAttribute("data-mobile-scroll-affordance")
                  );
                })
                .slice(0, 12)
                .map((el) => ({
                  tag: el.tagName.toLowerCase(),
                  text: el.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ?? "",
                  clientWidth: el.clientWidth,
                  scrollWidth: el.scrollWidth,
                }))
            : [];

          const smallTouchTargets = mobileAudit
            ? [...document.querySelectorAll<HTMLElement>("button, select, a[href], input:not([type='hidden'])")]
                .filter((el) => {
                  if (!isVisible(el) || el.hasAttribute("disabled")) return false;
                  if (el.matches("input[type='radio'], input[type='checkbox']")) {
                    const label = el.closest("label");
                    if (label) {
                      const labelRect = label.getBoundingClientRect();
                      return labelRect.width < 44 || labelRect.height < 44;
                    }
                  }

                  const style = getComputedStyle(el);
                  if (el.tagName === "A" && style.display === "inline") return false;
                  const rect = el.getBoundingClientRect();
                  return rect.width < 44 || rect.height < 44;
                })
                .slice(0, 20)
                .map((el) => {
                  const rect = el.getBoundingClientRect();
                  return {
                    tag: el.tagName.toLowerCase(),
                    text: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                  };
                })
            : [];

          const tinyMeaningfulText = mobileAudit
            ? [...document.querySelectorAll<HTMLElement>("p, span, label, a, button")]
                .filter((el) => {
                  if (!isVisible(el)) return false;
                  const text = el.textContent?.trim().replace(/\s+/g, " ") ?? "";
                  if (text.length < 2 || text.length > 120) return false;
                  if ([...el.children].some((child) => child.textContent?.trim())) return false;
                  return Number.parseFloat(getComputedStyle(el).fontSize) < 12;
                })
                .slice(0, 24)
                .map((el) => ({
                  tag: el.tagName.toLowerCase(),
                  text: el.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ?? "",
                  fontSize: getComputedStyle(el).fontSize,
                }))
            : [];

          const mobileMilestones = [...document.querySelectorAll<HTMLElement>("[data-mobile-milestone]")].map((el) => {
            const rect = el.getBoundingClientRect();
            return {
              year: el.dataset.mobileMilestone ?? "",
              height: Math.round(rect.height),
              opacity: Number(getComputedStyle(el).opacity),
            };
          });

          return {
            url: location.pathname,
            viewportWidth,
            viewportHeight,
            totalHeight: doc.scrollHeight,
            horizontalOverflow: Math.max(doc.scrollWidth, body.scrollWidth) - viewportWidth,
            bodyTextLength: body.innerText.trim().length,
            hasFrameworkOverlay: !!document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"),
            sections,
            clippedText,
            unexplainedHorizontalScrollers,
            smallTouchTargets,
            tinyMeaningfulText,
            mobileMilestones,
          };
        });

        await testInfo.attach(`rhythm-${theme}.json`, {
          body: JSON.stringify(metrics, null, 2),
          contentType: "application/json",
        });

        expect(metrics.hasFrameworkOverlay).toBe(false);
        expect(metrics.bodyTextLength).toBeGreaterThan(100);
        expect(metrics.horizontalOverflow).toBeLessThanOrEqual(4);
        expect(metrics.clippedText).toEqual([]);
        expect(metrics.unexplainedHorizontalScrollers).toEqual([]);
        expect(metrics.smallTouchTargets).toEqual([]);
        expect(metrics.tinyMeaningfulText).toEqual([]);
        if (route === "/about-us" && metrics.viewportWidth <= 430) {
          expect(metrics.mobileMilestones).toHaveLength(5);
          expect(metrics.mobileMilestones.every((milestone) => milestone.height > 300)).toBe(true);
        }
        expect(consoleErrors).toEqual([]);

        if (theme === "classic" && metrics.viewportWidth <= 430) {
          await testInfo.attach("mobile-header.png", {
            body: await page.screenshot({ fullPage: false }),
            contentType: "image/png",
          });

          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
          await page.waitForTimeout(250);
          await testInfo.attach("mobile-middle.png", {
            body: await page.screenshot({ fullPage: false }),
            contentType: "image/png",
          });

          await page.evaluate(() => {
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "instant",
            });
          });
          await page.waitForFunction(() => {
            const mobileNav = document.querySelector<HTMLElement>('nav[aria-label="Navegación principal móvil"]');
            if (!mobileNav) return true;
            const style = getComputedStyle(mobileNav);
            if (mobileNav.getAttribute("aria-hidden") === "true" || Number(style.opacity) < 0.1) return true;
            const legal = document.querySelector<HTMLElement>("[data-footer-legal]");
            if (!legal) return false;
            return legal.getBoundingClientRect().bottom <= mobileNav.getBoundingClientRect().top;
          }, undefined, { timeout: 5_000 });
          await testInfo.attach("mobile-footer.png", {
            body: await page.screenshot({ fullPage: false }),
            contentType: "image/png",
          });
        }
      });
    }
  }
});
