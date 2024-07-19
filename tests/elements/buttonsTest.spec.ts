import {expect, Locator, Page, test} from "@playwright/test";
import {Buttons} from "../../POM/Elements/Buttons"
import {zebrunner} from '@zebrunner/javascript-agent-playwright';

test.beforeEach(async ({page})=>{
  await page.goto("https://demoqa.com/buttons");
})

test("Check 'Double Click Me' button works correctly", { tag: ['@smoke'] }, async({page})=>{
  zebrunner.testCaseKey("DMQARM-7");
  const buttons: Buttons = new Buttons(page);
  await buttons.doubleClickButtonLocator().click();
  expect(await buttons.doubleClickMessageLocator().isVisible()).toBeFalsy();
  await buttons.doubleClickButtonLocator().dblclick();
  expect(await buttons.doubleClickMessageLocator().isVisible()).toBeTruthy();
  expect(await buttons.doubleClickMessageLocator().innerText()).toEqual("You have done a double click");
})

test("Check 'Right Click Me' button works correctly", async({page})=>{
  zebrunner.testCaseKey("DMQARM-8");
  const buttons: Buttons = new Buttons(page);
  await buttons.rightClickButtonLocator().click();
  expect(await buttons.rightClickMessageLocator().isVisible()).toBeFalsy();
  await buttons.rightClickButtonLocator().click({button: "right"});
  expect(await buttons.rightClickMessageLocator().isVisible()).toBeTruthy();
  expect(await buttons.rightClickMessageLocator().innerText()).toEqual("You have done a right click");
})

test("Check 'Click Me' button works correctly", async({page})=>{
  zebrunner.testCaseKey("DMQARM-9");
  const buttons: Buttons = new Buttons(page);
  await buttons.clickMeButtonLocator().click({button: "middle"});
  expect(await buttons.clickMeMessageLocator().isVisible()).toBeFalsy();
  await buttons.clickMeButtonLocator().click();
  expect(await buttons.clickMeMessageLocator().isVisible()).toBeTruthy();
  expect(await buttons.clickMeMessageLocator().innerText()).toEqual("You have done a dynamic click");
})

