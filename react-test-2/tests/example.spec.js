// @ts-check
import { test, expect } from "@playwright/test";

const LOCAL_HOST = "http://localhost:5173";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCAL_HOST);

  const text = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute("src");

  expect(textContent?.length).toBeGreaterThan(0);
  expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
});