import puppeteer, { Browser, Page } from "puppeteer";
import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";

describe("Opens application and creates a new Task", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 25,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("Changing task Status", () => {
    it("change the new tasks completed status", async () => {
      await page.waitForSelector("#createTaskInput");
      await page.waitForSelector("#createTaskButton");
      await page.type("#createTaskInput", "test changing status", {
        delay: 15,
      });
      await page.click("#createTaskButton");
      await page.waitForSelector("#taskCheck7");
      await page.click("#taskCheck7");
      let completeList = await page.$$("#CompletedList");
      let lastItem = await completeList[completeList.length - 1];

      await lastItem.evaluate((item) => item.innerHTML);
      let taskText = await lastItem.$eval("#task7", (task) => task.innerHTML);

      expect(taskText).toBe("test changing status");
    }, 10000);
  });
});
