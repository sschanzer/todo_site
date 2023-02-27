import puppeteer, { Browser, Page } from "puppeteer";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Opens application and creates a new Task", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 20,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("Creating a Task", () => {
    it("will create and display new task under `pending`", async () => {
      await page.waitForSelector("#createTaskInput");
      await page.waitForSelector("#createTaskButton");
      await page.type("#createTaskInput", "test creating a task", {
        delay: 10,
      });
      await page.click("#createTaskButton");

      await page.waitForSelector("#task7");
      let taskText = await page.$eval("#task7", (task) => task.innerHTML);

      expect(taskText).toBe("test creating a task");
    });
  });
});
