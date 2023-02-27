import puppeteer, { Browser, Page } from "puppeteer";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Opens application and creates a new Task", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  it("will create and display new task under `pending`", async () => {
    await page.waitForSelector("#createTaskInput");
    await page.waitForSelector("#createTaskButton");
    let textToDisplay = "test creating a task";
    for (let i = 0; i < 3; i++) {
      await page.type("#createTaskInput", `${textToDisplay}${i}`);
      await page.click("#createTaskButton");
    }

    await page.waitForSelector("#taskSelectedBtn7");
    await page.waitForSelector("#taskSelectedBtn8");
    await page.waitForSelector("#taskSelectedBtn9");
    await page.waitForSelector("#changeStatusBtn");
    await page.click("#taskSelectedBtn7");
    await page.click("#taskSelectedBtn8");
    await page.click("#taskSelectedBtn9");
    await page.click("#changeStatusBtn");
    let completeList = await page.$$("#CompletedList");
    let lastItem = await completeList[completeList.length - 1];

    await lastItem.evaluate((item) => item.innerHTML);
    await page.waitForSelector("#task8");

    let taskText = await page.$eval("#task8", (task) => task.innerHTML);

    expect(taskText).toBe(`${textToDisplay}1`);
  });
});
