import {expect, test} from "@playwright/test";
import {RadioButton, RadioButtonSelector} from "../../POM/Elements/RadioButton"
import {zebrunner} from '@zebrunner/javascript-agent-playwright';

test.beforeEach(async ({page})=>{
  await page.goto("https://demoqa.com/radio-button");
})

test("Verify that the 'Yes' radio button can be selected", { tag: ['@smoke'] }, async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-17");
  const radioButton: RadioButton = new RadioButton(page);

  await radioButton.radioLocator(RadioButtonSelector.Yes).click();
  expect(await radioButton.radioLocator(RadioButtonSelector.Yes).isChecked()).toBeTruthy();
  expect(await radioButton.radioResultLocator().innerText()).toEqual("You have selected Yes");
});

test("Verify that the 'Impressive' radio button can be selected", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-18");
  const radioButton: RadioButton = new RadioButton(page);

  await radioButton.radioLocator(RadioButtonSelector.Impressive).click();
  expect(await radioButton.radioLocator(RadioButtonSelector.Impressive).isChecked()).toBeTruthy();
  expect(await radioButton.radioResultLocator().innerText()).toEqual("You have selected Impressive");
});

test("Verify that the 'No' radio button is disabled", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-19");
  const radioButton: RadioButton = new RadioButton(page);

  expect(await radioButton.radioLocator(RadioButtonSelector.No).isDisabled()).toBeTruthy();
});