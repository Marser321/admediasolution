import { expect, test, type Page } from "@playwright/test";

// List of target routes to audit
const PAGES = [
    "/",
    "/about-us",
    "/servicios",
    "/servicios/embudos-neurales",
    "/servicios/contenido-generativo",
    "/servicios/ads-autopilot",
    "/casos",
    "/danger",
    "/equipo",
    "/planificacion",
    "/comunidad",
] as const;

// List of vibe themes to cycle through
const THEMES = ["classic", "luxury", "sky", "white"] as const;

interface ContrastFailure {
    tag: string;
    text: string;
    classes: string;
    fgColor: string;
    bgColor: string;
    ratio: string;
    threshold: number;
}

// ============================================================
// Helper: Run contrast audit on page
// ============================================================
async function runContrastAudit(page: Page): Promise<ContrastFailure[]> {
    return page.evaluate(() => {
        const failures: ContrastFailure[] = [];

        // Helper to parse rgb or rgba string into numeric components
        function parseRgb(colorStr: string): { r: number; g: number; b: number; a: number } {
            const matches = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (!matches) return { r: 255, g: 255, b: 255, a: 1 };
            return {
                r: parseInt(matches[1], 10),
                g: parseInt(matches[2], 10),
                b: parseInt(matches[3], 10),
                a: matches[4] !== undefined ? parseFloat(matches[4]) : 1,
            };
        }

        // Helper to find the computed background color, traversing up if transparent
        function getSolidBackgroundColor(element: HTMLElement): string {
            let current: HTMLElement | null = element;
            while (current) {
                const bg = window.getComputedStyle(current).backgroundColor;
                const parsed = parseRgb(bg);
                if (parsed.a > 0.05) {
                    return bg;
                }
                current = current.parentElement;
            }
            return "rgb(2, 6, 23)"; // Fallback to base navy bg if none found
        }

        // Helper to calculate relative luminance
        function getLuminance(rgbStr: string): number {
            const { r, g, b } = parseRgb(rgbStr);
            const a = [r, g, b].map((v) => {
                const s = v / 255;
                return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
        }

        // Helper to calculate contrast ratio
        function getContrastRatio(fg: string, bg: string): number {
            const l1 = getLuminance(fg);
            const l2 = getLuminance(bg);
            return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        }

        // Helper to check if an element is a styled gradient/button
        function hasBrandBg(element: HTMLElement): boolean {
            let curr: HTMLElement | null = element;
            while (curr) {
                const classes = curr.className || "";
                if (
                    classes.includes("bg-gradient-") ||
                    classes.includes("bg-primary") ||
                    classes.includes("bg-accent-") ||
                    classes.includes("bg-[#") ||
                    classes.includes("bg-slate-") ||
                    classes.includes("bg-zinc-") ||
                    classes.includes("bg-slate-950") ||
                    curr.tagName.toLowerCase() === "button"
                ) {
                    return true;
                }
                curr = curr.parentElement;
            }
            return false;
        }

        // Find all visible text elements
        const elements = document.querySelectorAll<HTMLElement>(
            "p, span, h1, h2, h3, h4, h5, h6, a, button, label, input"
        );

        elements.forEach((el) => {
            const style = window.getComputedStyle(el);
            if (
                style.display === "none" ||
                style.visibility === "hidden" ||
                style.opacity === "0" ||
                el.offsetWidth === 0 ||
                el.offsetHeight === 0
            ) {
                return;
            }

            const text = (el.innerText || el.getAttribute("placeholder") || "").trim();
            if (text.length < 2 || text.length > 250) return;

            // Skip icon components
            if (el.classList.contains("lucide") || el.closest(".lucide")) return;

            const fgColor = style.color;

            // Filter out false-positives for gradient text (which has transparent color in CSS computed properties)
            if (
                fgColor === "rgba(0, 0, 0, 0)" ||
                fgColor === "transparent" ||
                style.webkitTextFillColor === "transparent" ||
                el.classList.contains("text-transparent") ||
                el.classList.contains("bg-clip-text")
            ) {
                return;
            }

            // Filter out buttons/gradients that use background images (evaluated as transparent/fallback bg in CSS computed properties)
            if (hasBrandBg(el)) {
                return;
            }

            const bgColor = getSolidBackgroundColor(el);
            const ratio = getContrastRatio(fgColor, bgColor);

            const fontSize = parseFloat(style.fontSize);
            const fontWeight = parseInt(style.fontWeight, 10) || 400;
            const isLarge = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
            const threshold = isLarge ? 3.0 : 4.5;

            if (ratio < threshold) {
                failures.push({
                    tag: el.tagName.toLowerCase(),
                    text: text.slice(0, 45),
                    classes: el.className.split(" ").slice(0, 3).join(" "),
                    fgColor,
                    bgColor,
                    ratio: ratio.toFixed(2),
                    threshold,
                });
            }
        });

        return failures;
    });
}

// ============================================================
// Visual Theme Audit Test Suite
// ============================================================
test.describe("Visual Theme & Contrast Audit", () => {
    for (const url of PAGES) {
        for (const theme of THEMES) {
            test(`Audit contrast and render on [${url}] under [${theme}] theme`, async ({ page }, testInfo) => {
                const consoleErrors: string[] = [];
                page.on("console", (msg) => {
                    if (msg.type() === "error") consoleErrors.push(msg.text());
                });
                page.on("pageerror", (err) => consoleErrors.push(err.message));

                // Go to page
                await page.goto(url, { waitUntil: "networkidle" });

                // Inject theme into localStorage and class list
                await page.evaluate((themeName) => {
                    localStorage.setItem("vibe-theme", themeName);
                    document.documentElement.classList.remove("theme-classic", "theme-sky", "theme-white");
                    if (themeName === "classic") document.documentElement.classList.add("theme-classic");
                    if (themeName === "sky") document.documentElement.classList.add("theme-sky");
                    if (themeName === "white") document.documentElement.classList.add("theme-white");
                }, theme);

                // Reload to let components hydrate with theme state
                await page.reload({ waitUntil: "networkidle" });
                await page.waitForTimeout(500);

                // 1. Verify no console errors
                expect(consoleErrors).toEqual([]);

                // 2. Perform WCAG contrast audit
                const failures = await runContrastAudit(page);
                
                if (failures.length > 0) {
                    console.log(`\n⚠️ Contrast warnings on ${url} [Theme: ${theme}]:`);
                    failures.forEach(f => {
                        console.log(`  - <${f.tag}> "${f.text}" (ratio: ${f.ratio}, threshold: ${f.threshold}) | FG: ${f.fgColor} BG: ${f.bgColor} | classes: ${f.classes}`);
                    });
                }

                // Check for severe legibility bugs (any elements with extreme contrast ratio < 2.0 on standard text)
                const severeFailures = failures.filter(f => parseFloat(f.ratio) < 2.0);
                if (severeFailures.length > 0) {
                    console.log(`\n❌ Severe Contrast failures on ${url} [Theme: ${theme}]:`);
                    severeFailures.forEach(f => {
                        console.error(`  - <${f.tag}> "${f.text}" (ratio: ${f.ratio}) | FG: ${f.fgColor} BG: ${f.bgColor}`);
                    });
                }

                expect(severeFailures.length).toBe(0);

                // 3. Attach screenshot for visual inspection
                const sanitizeName = url.replace(/\//g, "home").replace(/[^a-zA-Z0-9]/g, "-");
                await testInfo.attach(`screenshot-${sanitizeName}-${theme}-${testInfo.project.name}.png`, {
                    body: await page.screenshot({ fullPage: false }),
                    contentType: "image/png",
                });
            });
        }
    }
});
