import puppeteer, { Browser, Page } from "puppeteer";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Deleteting a single task", () => {
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

  it("will create a task to delete", async () => {
    // create a task
    await page.waitForSelector("#createTaskInput");
    await page.waitForSelector("#createTaskButton");
    let textToDisplay = "test deleting a task";
    await page.type("#createTaskInput", textToDisplay);
    await page.click("#createTaskButton");

    // ensure task exists on page
    await page.waitForSelector("#task7");
    await page.waitForSelector("#deleteBtn7");

    // delete task
    await page.click("#deleteBtn7");
    await page.waitForSelector("#task7", { hidden: true });
    const taskDoesNotExist = await page.$("#taskMaster7");
    const displayStyle = await taskDoesNotExist?.evaluate(
      (node) => getComputedStyle(node).display
    );

    // assert selector query is null
    expect(displayStyle).toBe("none");
  });
});
