import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/servicios",
  "/servicios/embudos-neurales",
  "/planificacion",
  "/comunidad",
  "/danger",
  "/equipo",
  "/about-us",
  "/casos",
  "/logos",
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
          const doc = document.documentElement;
          const body = document.body;
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
          };
        });

        await testInfo.attach(`rhythm-${theme}.json`, {
          body: JSON.stringify(metrics, null, 2),
          contentType: "application/json",
        });

        expect(metrics.hasFrameworkOverlay).toBe(false);
        expect(metrics.bodyTextLength).toBeGreaterThan(route === "/logos" ? 40 : 100);
        expect(metrics.horizontalOverflow).toBeLessThanOrEqual(4);
        expect(metrics.clippedText).toEqual([]);
        expect(consoleErrors).toEqual([]);
      });
    }
  }
});
