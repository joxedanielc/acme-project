import { test, expect, type Page } from "@playwright/test";
import fixtureReport from "./fixture/report.json";

test.describe("Test the entire page flow", () => {
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
