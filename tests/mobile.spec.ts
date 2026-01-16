import { test, expect } from "@playwright/test";

const PAGES = [
    { path: "/", name: "home", expectFaq: true },
    { path: "/dfa-apostille", name: "dfa", expectFaq: true },
    { path: "/nbi-clearance", name: "nbi", expectFaq: true },
    { path: "/contact", name: "contact", expectFaq: false }
];

const hamburgerSelectors = [
    ".mobile-menu",
    "#mobile-menu",
    'button[aria-label*="メニュー"]',
    'button[aria-label*="menu" i]'
];

test.describe("IGRS mobile regression (nav + FAQ)", () => {
    for (const pageDef of PAGES) {
        test(`${pageDef.name}: mobile nav opens/closes (overlay + Esc)`, async ({ page }) => {
            await page.goto(pageDef.path);

            let btn = null;
            for (const sel of hamburgerSelectors) {
                const candidate = page.locator(sel).first();
                if (await candidate.count()) { btn = candidate; break; }
            }
            expect(btn, "Hamburger button not found").toBeTruthy();

            await btn!.click();
            await expect(page.locator("body")).toHaveClass(/nav-open/);
            await expect(page.locator(".nav-overlay")).toBeVisible();

            await page.keyboard.press("Escape");
            await expect(page.locator("body")).not.toHaveClass(/nav-open/);
        });

        test(`${pageDef.name}: FAQ accordion state`, async ({ page }) => {
            await page.goto(pageDef.path);
            const faqItems = page.locator("details.faq-item");

            if (!pageDef.expectFaq) {
                await expect(faqItems).toHaveCount(0);
                return;
            }

            await expect(faqItems.first()).toBeVisible();
            await expect(faqItems.nth(0)).toHaveAttribute("open", "");

            const second = faqItems.nth(1);
            if (await second.count()) {
                await expect(second).not.toHaveAttribute("open", "");
                await second.locator("summary").click();
                await expect(second).toHaveAttribute("open", "");
            }
        });
    }
});
