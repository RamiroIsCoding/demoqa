import {expect, Page, test} from "@playwright/test";
import {CheckBox} from "../../POM/Elements/checkBox/CheckBox"
const data = require("../../POM/Elements/checkBox/checkBoxData.json");
import {zebrunner} from '@zebrunner/javascript-agent-playwright';

test.beforeEach(async ({page}) => {
  await page.goto("https://demoqa.com/checkbox");
});

test("Check every element is visible when expand all button is clicked", { tag: ['@smoke'] }, async ({page}) => {
  zebrunner.testCaseKey("DMQARM-20");
  const checkBox: CheckBox = new CheckBox(page);
  await checkBox.buttonExpandAllLocator().click();
  await loopFromData(data, checkBox);
})

async function loopFromData(data: object, checkBox: CheckBox) {
  for (const title in data) {
    if (data.hasOwnProperty(title)) {
      expect(await checkBox.spanTitleLocator(title).isVisible()).toBeTruthy();
      expect(await checkBox.iconLocator(title).isVisible()).toBeTruthy();
      expect(await checkBox.checkBoxLocator(title).isVisible()).toBeTruthy();
      if(await checkBox.iconLocator(title).getAttribute("class") !== 'rct-icon rct-icon-leaf-close'){
        expect(await checkBox.expandButtonLocator(title).isVisible()).toBeTruthy();
      }
      if (Object.keys(data[title]).length > 0) {
        await loopFromData(data[title], checkBox);
      }
    }
  }
}

test("check only 'Home' is visible when collapse all button is clicked", async ({page}) => {
  zebrunner.testCaseKey("DMQARM-21");
  const checkBox: CheckBox = new CheckBox(page);
  await checkBox.buttonExpandAllLocator().click();
  await checkBox.buttonCollapseAllLocator().click();
  await loopFromDataNotVisible(data, checkBox);
})

test("Verify initial state",async({page})=>{
  zebrunner.testCaseKey("DMQARM-22");
  const checkBox: CheckBox = new CheckBox(page);
  await loopFromDataNotVisible(data, checkBox);
})

async function loopFromDataNotVisible(data: object, checkBox: CheckBox) {
  for (const title in data) {
    if (data.hasOwnProperty(title)) {
      if (title !== 'Home') {
        expect(await checkBox.spanTitleLocator(title).isVisible()).toBeFalsy();
        expect(await checkBox.iconLocator(title).isVisible()).toBeFalsy();
        expect(await checkBox.checkBoxLocator(title).isVisible()).toBeFalsy();
        expect(await checkBox.expandButtonLocator(title).isVisible()).toBeFalsy();
      } else {
        expect(await checkBox.spanTitleLocator(title).isVisible()).toBeTruthy();
        expect(await checkBox.iconLocator(title).isVisible()).toBeTruthy();
        expect(await checkBox.checkBoxLocator(title).isVisible()).toBeTruthy();
        expect(await checkBox.expandButtonLocator(title).isVisible()).toBeTruthy();
      }
      if (Object.keys(data[title]).length > 0) {
        await loopFromDataNotVisible(data[title], checkBox);
      }
    }
  }
}

test("check toggle button works", (async ({page}) => {
  zebrunner.testCaseKey("DMQARM-23");
  const checkBox: CheckBox = new CheckBox(page);
  await checkToggleFunctionality(data, checkBox, page);
}))

async function checkToggleFunctionality(data: object, checkBox: CheckBox, page: Page) {
  for (const title in data) {
    if (data.hasOwnProperty(title)) {
      expect(await checkBox.spanTitleLocator(title).isVisible()).toBeTruthy();
      if (await checkBox.expandButtonLocator(title).isVisible()) {
        await checkBox.expandButtonLocator(title).click();
      }
      if (Object.keys(data[title]).length > 0) {
        await checkToggleFunctionality(data[title], checkBox, page);
      }
    }
  }
}
