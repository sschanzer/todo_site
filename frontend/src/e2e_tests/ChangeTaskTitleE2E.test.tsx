import puppeteer, { Browser, Page } from "puppeteer";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Change Task Title", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 15,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  it("will create a task and change its title", async () => {
    // create a task
    await page.waitForSelector("#createTaskInput");
    await page.waitForSelector("#createTaskButton");
    let textToDisplay = "test changing a task";
    let newText = " new";
    await page.type("#createTaskInput", textToDisplay, { delay: 10 });
    await page.click("#createTaskButton");

    // ensure task exists on page
    await page.waitForSelector("#task7");
    await page.waitForSelector("#showChangeForm7");

    // change the tasks title
    await page.click("#showChangeForm7");
    await page.waitForSelector("#newTitleForm7");
    const inputField = await page.$("#newTitleForm7");
    await inputField?.click();
    await page.type("#newTitleForm7", newText);
    await page.click("#confirmChange7");

    // assert the tasks title has been changed
    let taskText = await page.$eval("#task7", (task) => task.innerHTML);
    expect(taskText).toBe(textToDisplay + newText);
  });
});
