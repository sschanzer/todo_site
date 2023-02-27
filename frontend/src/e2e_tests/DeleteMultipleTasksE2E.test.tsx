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

  it("will create multiple tasks, select the created tasks, and delete them", async () => {
    // create multiple tasks
    await page.waitForSelector("#createTaskInput");
    await page.waitForSelector("#createTaskButton");
    let textToDisplay = "test deleting a task";
    for (let i = 1; i < 4; i++) {
      await page.type("#createTaskInput", `${textToDisplay}${i}`);
      await page.click("#createTaskButton");
    }

    // ensure all tasks exists on page
    await page.waitForSelector("#task7");
    await page.waitForSelector("#task8");
    await page.waitForSelector("#task9");

    //select tasks to delete
    for (let j = 7; j < 10; j++) {
      await page.click(`#taskSelectedBtn${j}`);
    }

    // delete tasks
    await page.click("#DeleteMultBtn");
    let results = [];
    for (let k = 7; k < 10; k++) {
      await page.waitForSelector(`#task${k}`, { hidden: true });
      const taskDoesNotExist = await page.$(`#taskMaster${k}`);
      const displayStyle = await taskDoesNotExist?.evaluate(
        (node) => getComputedStyle(node).display
      );
      results.push(displayStyle);
    }

    // assert all selector querys are null
    expect(results).toStrictEqual(["none", "none", "none"]);
  });
});
