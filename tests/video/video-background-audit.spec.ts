import { expect, test, type Locator, type Page } from "@playwright/test";
import sharp from "sharp";

const THEMES = ["luxury", "classic", "sky", "white"] as const;
const FRAME_POSITIONS = [0.1, 0.5, 0.9] as const;

type Theme = (typeof THEMES)[number];

const VIDEO_CASES = [
  { name: "home", route: "/", profile: "hero" },
  { name: "servicios", route: "/servicios", profile: "services" },
  { name: "comunidad", route: "/comunidad", profile: "community" },
  { name: "about", route: "/about-us", profile: "media-card", scrollToEnd: true },
] as const;

interface ContrastTarget {
  id: string;
  text: string;
  fg: { r: number; g: number; b: number; a: number };
  rect: { x: number; y: number; width: number; height: number };
  threshold: number;
}

function srgbChannel(value: number) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  return (
    0.2126 * srgbChannel(r) +
    0.7152 * srgbChannel(g) +
    0.0722 * srgbChannel(b)
  );
}

function contrastRatio(
  foreground: { r: number; g: number; b: number },
  background: { r: number; g: number; b: number },
) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

async function setTheme(page: Page, theme: Theme) {
  await page.addInitScript((themeName) => {
    window.localStorage.setItem("vibe-theme", themeName);
    window.sessionStorage.setItem("promo-popup-closed", "true");
  }, theme);
}

async function prepareCase(
  page: Page,
  videoCase: (typeof VIDEO_CASES)[number],
) {
  if (!("scrollToEnd" in videoCase) || !videoCase.scrollToEnd) return;

  await page.evaluate(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight * 0.96,
      behavior: "instant",
    });
  });
  await page.waitForTimeout(900);
}

async function waitForPoster(profile: Locator) {
  await expect(profile).toBeVisible();
  await profile.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        if ((image as HTMLImageElement).complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );
  });
}

async function seekVideo(video: Locator, position: number) {
  await video.evaluate(async (node, requestedPosition) => {
    const media = node as HTMLVideoElement;

    if (media.readyState < 1) {
      await new Promise<void>((resolve) => {
        media.addEventListener("loadedmetadata", () => resolve(), { once: true });
      });
    }

    media.pause();
    const duration = Number.isFinite(media.duration) ? media.duration : 0;
    const target = Math.max(0, Math.min(duration * requestedPosition, duration - 0.05));

    await new Promise<void>((resolve) => {
      const timeout = window.setTimeout(resolve, 2500);
      media.addEventListener(
        "seeked",
        () => {
          window.clearTimeout(timeout);
          resolve();
        },
        { once: true },
      );
      media.currentTime = target;
    });
  }, position);
}

async function readTreatment(profile: Locator) {
  return profile.evaluate((container) => {
    const posterLayer = container.querySelector<HTMLElement>('[data-video-layer="poster"]');
    const posterAsset =
      posterLayer?.matches(".video-background__asset")
        ? posterLayer
        : posterLayer?.querySelector<HTMLElement>(".video-background__asset");
    const videoLayer = container.querySelector<HTMLElement>('[data-video-layer="video"]');
    const videoAsset = videoLayer?.querySelector<HTMLElement>(".video-background__asset");
    const scrim = container.querySelector<HTMLElement>('[data-video-layer="scrim"]');
    const containerStyle = getComputedStyle(container);

    return {
      assetOpacity: containerStyle.getPropertyValue("--video-asset-opacity").trim(),
      posterFilter: posterAsset ? getComputedStyle(posterAsset).filter : null,
      posterBlend: posterLayer ? getComputedStyle(posterLayer).mixBlendMode : null,
      videoFilter: videoAsset ? getComputedStyle(videoAsset).filter : null,
      videoBlend: videoLayer ? getComputedStyle(videoLayer).mixBlendMode : null,
      scrimBackground: scrim ? getComputedStyle(scrim).backgroundImage : null,
    };
  });
}

async function collectContrastTargets(page: Page, profile: string) {
  return page.evaluate((profileName) => {
    const parseColor = (value: string) => {
      const match = value.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/,
      );
      if (!match) return null;
      return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
        a: match[4] === undefined ? 1 : Number(match[4]),
      };
    };

    const roots = [
      ...document.querySelectorAll<HTMLElement>(
        `[data-video-contrast-content="${profileName}"]`,
      ),
    ];
    const seen = new Set<HTMLElement>();
    const targets: ContrastTarget[] = [];

    roots.forEach((root) => {
      const candidates = [
        ...(root.matches("h1,h2,h3,h4,p,a,button,label,[data-video-audit-text]")
          ? [root]
          : []),
        ...root.querySelectorAll<HTMLElement>(
          "h1,h2,h3,h4,p,a,button,label,[data-video-audit-text]",
        ),
      ];

      candidates.forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);

        const style = getComputedStyle(element);
        const textNodes: Text[] = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let currentNode = walker.nextNode();
        while (currentNode) {
          if (currentNode.textContent?.trim()) textNodes.push(currentNode as Text);
          currentNode = walker.nextNode();
        }

        const textRange = document.createRange();
        if (textNodes.length > 0) {
          textRange.setStart(textNodes[0], 0);
          const lastTextNode = textNodes[textNodes.length - 1];
          textRange.setEnd(lastTextNode, lastTextNode.textContent?.length ?? 0);
        }
        const rangeRect =
          textNodes.length > 0 ? textRange.getBoundingClientRect() : null;
        const rect =
          rangeRect && rangeRect.width > 0 && rangeRect.height > 0
            ? rangeRect
            : element.getBoundingClientRect();
        const text = element.textContent?.trim().replace(/\s+/g, " ") ?? "";
        const color = parseColor(style.color);
        const centerX = Math.min(
          window.innerWidth - 1,
          Math.max(0, rect.left + rect.width / 2),
        );
        const centerY = Math.min(
          window.innerHeight - 1,
          Math.max(0, rect.top + rect.height / 2),
        );
        const topElement = document.elementFromPoint(centerX, centerY);
        const isOccluded =
          topElement !== null &&
          topElement !== element &&
          !element.contains(topElement) &&
          !topElement.contains(element);

        if (
          !text ||
          !color ||
          color.a === 0 ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number(style.opacity) === 0 ||
          rect.width < 2 ||
          rect.height < 2 ||
          rect.right <= 0 ||
          rect.bottom <= 0 ||
          rect.left >= window.innerWidth ||
          rect.top >= window.innerHeight ||
          rect.bottom > window.innerHeight - 64 ||
          isOccluded ||
          element.classList.contains("text-transparent") ||
          style.webkitTextFillColor === "rgba(0, 0, 0, 0)"
        ) {
          return;
        }

        const fontSize = Number.parseFloat(style.fontSize);
        const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
        const id = `video-audit-${targets.length}`;
        element.dataset.videoAuditId = id;

        targets.push({
          id,
          text: text.slice(0, 80),
          fg: color,
          rect: {
            x: Math.max(0, rect.x),
            y: Math.max(0, rect.y),
            width: Math.min(rect.width, window.innerWidth - Math.max(0, rect.x)),
            height: Math.min(rect.height, window.innerHeight - Math.max(0, rect.y)),
          },
          threshold: isLarge ? 3 : 4.5,
        });
      });
    });

    return targets;
  }, profile);
}

async function hideAuditedText(page: Page) {
  await page.evaluate(() => {
    const modified = new Map<HTMLElement, string | null>();
    const remember = (element: HTMLElement) => {
      if (!modified.has(element)) modified.set(element, element.getAttribute("style"));
    };

    document
      .querySelectorAll<HTMLElement>("[data-video-audit-id]")
      .forEach((element) => {
        remember(element);
        element.style.setProperty("transition", "none", "important");
        element.style.setProperty("color", "transparent", "important");
        element.style.setProperty("-webkit-text-fill-color", "transparent", "important");
        element.style.setProperty("text-shadow", "none", "important");

        element
          .querySelectorAll<HTMLElement>(".text-transparent,.bg-clip-text")
          .forEach((descendant) => {
            remember(descendant);
            descendant.style.setProperty("background-image", "none", "important");
            descendant.style.setProperty("-webkit-text-fill-color", "transparent", "important");
          });

        element.querySelectorAll<HTMLElement>("svg").forEach((icon) => {
          remember(icon);
          icon.style.setProperty("visibility", "hidden", "important");
        });
      });

    (window as typeof window & {
      __videoAuditStyles?: Array<[HTMLElement, string | null]>;
    }).__videoAuditStyles = [...modified.entries()];
  });
}

async function restoreAuditedText(page: Page) {
  await page.evaluate(() => {
    const auditWindow = window as typeof window & {
      __videoAuditStyles?: Array<[HTMLElement, string | null]>;
    };

    auditWindow.__videoAuditStyles?.forEach(([element, style]) => {
      if (style === null) element.removeAttribute("style");
      else element.setAttribute("style", style);
      delete element.dataset.videoAuditId;
    });
    delete auditWindow.__videoAuditStyles;
  });
  await page.waitForTimeout(750);
}

async function auditFrameContrast(
  page: Page,
  profile: string,
): Promise<Array<{ text: string; ratio: number; threshold: number }>> {
  const targets = await collectContrastTargets(page, profile);
  expect(targets.length).toBeGreaterThan(0);

  await hideAuditedText(page);
  const screenshot = await page.screenshot({
    scale: "css",
  });
  await restoreAuditedText(page);

  const { data, info } = await sharp(screenshot)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return targets.flatMap((target) => {
    const startX = Math.max(0, Math.floor(target.rect.x));
    const endX = Math.min(info.width - 1, Math.ceil(target.rect.x + target.rect.width));
    const startY = Math.max(0, Math.floor(target.rect.y));
    const endY = Math.min(info.height - 1, Math.ceil(target.rect.y + target.rect.height));
    const step = Math.max(
      2,
      Math.floor(Math.sqrt(Math.max(1, target.rect.width * target.rect.height) / 220)),
    );
    const ratios: number[] = [];

    for (let y = startY; y <= endY; y += step) {
      for (let x = startX; x <= endX; x += step) {
        const index = (y * info.width + x) * info.channels;
        const background = {
          r: data[index],
          g: data[index + 1],
          b: data[index + 2],
        };
        const foreground = {
          r: target.fg.r * target.fg.a + background.r * (1 - target.fg.a),
          g: target.fg.g * target.fg.a + background.g * (1 - target.fg.a),
          b: target.fg.b * target.fg.a + background.b * (1 - target.fg.a),
        };
        ratios.push(contrastRatio(foreground, background));
      }
    }

    ratios.sort((a, b) => a - b);
    const robustMinimum = ratios[Math.floor(ratios.length * 0.1)] ?? 0;

    return robustMinimum + 0.01 < target.threshold
      ? [{ text: target.text, ratio: robustMinimum, threshold: target.threshold }]
      : [];
  });
}

async function warmPixelShare(image: Buffer) {
  const { data, info } = await sharp(image)
    .resize({ width: 480, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let chromaticPixels = 0;
  let warmPixels = 0;

  for (let index = 0; index < data.length; index += info.channels) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    if (chroma < 24) continue;
    chromaticPixels += 1;
    if (r > b + 18 && r > g + 8) warmPixels += 1;
  }

  return chromaticPixels === 0 ? 0 : warmPixels / chromaticPixels;
}

test.describe("video background profiles", () => {
  for (const videoCase of VIDEO_CASES) {
    for (const theme of THEMES) {
      test(`${videoCase.name} is readable in ${theme}`, async ({ page }, testInfo) => {
        const consoleErrors: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => consoleErrors.push(error.message));

        await setTheme(page, theme);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(videoCase.route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(650);
        await prepareCase(page, videoCase);

        const profile = page.locator(
          `[data-video-profile="${videoCase.profile}"]`,
        ).first();
        await waitForPoster(profile);
        await testInfo.attach(
          `${videoCase.name}-${theme}-${testInfo.project.name}-poster.png`,
          {
            body: await profile.screenshot({ animations: "disabled" }),
            contentType: "image/png",
          },
        );

        const posterTreatment = await readTreatment(profile);
        expect(posterTreatment.assetOpacity).not.toBe("");
        expect(posterTreatment.scrimBackground).not.toBe("none");

        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.reload({ waitUntil: "domcontentloaded" });
        await page.waitForTimeout(650);
        await prepareCase(page, videoCase);
        const video = profile.locator("video");
        await expect(video).toHaveCount(1);
        await video.waitFor({ state: "attached" });
        await page.waitForFunction(
          (profileName) => {
            const media = document.querySelector<HTMLVideoElement>(
              `[data-video-profile="${profileName}"] video`,
            );
            return Boolean(media && media.readyState >= 1);
          },
          videoCase.profile,
        );

        const videoTreatment = await readTreatment(profile);
        expect(videoTreatment.videoFilter).toBe(posterTreatment.posterFilter);
        expect(videoTreatment.videoBlend).toBe(posterTreatment.posterBlend);

        for (const position of FRAME_POSITIONS) {
          await seekVideo(video, position);
          const frame = await profile.screenshot({ animations: "disabled" });
          await testInfo.attach(
            `${videoCase.name}-${theme}-${testInfo.project.name}-${Math.round(position * 100)}.png`,
            { body: frame, contentType: "image/png" },
          );

          if (
            (theme === "sky" || theme === "white") &&
            videoCase.profile !== "media-card"
          ) {
            expect(await warmPixelShare(frame)).toBeLessThan(0.2);
          }

          const contrastFailures = await auditFrameContrast(
            page,
            videoCase.profile,
          );
          expect(
            contrastFailures,
            `WCAG contrast failures at ${Math.round(position * 100)}%: ${JSON.stringify(contrastFailures)}`,
          ).toEqual([]);
        }

        expect(consoleErrors).toEqual([]);
      });
    }
  }
});
