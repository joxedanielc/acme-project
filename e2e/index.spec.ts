import { test, expect, type Page } from "@playwright/test";

test.describe("Test the entire page flow and renders a report with total", () => {
  const tableBodyId = '[data-id="reportrow"]';

  test("Upload file and generate report", async ({ page }) => {
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    await page.setInputFiles("input[type='file']", "shiftData.txt");
    await page.locator('[data-id="calculate-shifts"]').click();
    await page.waitForSelector(tableBodyId);
    const rows = await page.locator(`${tableBodyId} >> tr`).count();
    await expect(rows).toBe(5);
  });
});

test.describe("Test the entire page flow and renders an error", () => {
  const tableBodyId = '[data-id="reportrow"]';

  test("Upload file and generate report", async ({ page }) => {
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    await page.setInputFiles("input[type='file']", "shiftDataError.txt");
    await page.locator('[data-id="calculate-shifts"]').click();
    const errorElement = await page
      .locator('[data-id="error-message"]')
      .count();
    await page.waitForSelector('[data-id="error-message"]');
    await expect(errorElement).toBe(1);
  });
});
