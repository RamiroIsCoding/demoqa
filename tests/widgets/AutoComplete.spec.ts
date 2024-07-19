import {expect, Locator, Page, test} from "@playwright/test";
import {AutoCompletePage} from "../../POM/Widgets/autoComplete/AutoCompletePage"
import {TypeMultipleColorNamesComponent} from "../../POM/Widgets/autoComplete/TypeMultipleColorNamesComponent";
import {TypeSingleColorNameComponent} from "../../POM/Widgets/autoComplete/TypeSingleColorNameComponent";
import {zebrunner} from '@zebrunner/javascript-agent-playwright';

test.beforeEach(async ({page}) => {
  await page.goto("https://demoqa.com/auto-complete");
})

test.describe("Type multiple color names tests", { tag: ['@smoke'] }, ()=>{
  test("Check auto complete suggestions", async ({page}) => {
    zebrunner.testCaseKey("DMQARM-1");
    const autoComplete: AutoCompletePage = new AutoCompletePage(page);
    const tmcnComponent: TypeMultipleColorNamesComponent = autoComplete.getTypeMultipleColorNamesComponent();

    let input = "r";
    await tmcnComponent.inputLocator().fill(input);
    await page.waitForTimeout(100);
    const autoCompleteSuggestions = await tmcnComponent.autoCompleteOptionsList();
    for (const element of autoCompleteSuggestions) {
      const content = await element.innerText();
      expect(content.toLowerCase()).toContain("r");
    }
  })

  test("Check if multiple options can be selected", async ({page}) => {
    zebrunner.testCaseKey("DMQARM-2");
    const autoComplete: AutoCompletePage = new AutoCompletePage(page);
    const tmcnComponent: TypeMultipleColorNamesComponent = autoComplete.getTypeMultipleColorNamesComponent();

    await tmcnComponent.addColor("Red");
    await tmcnComponent.addColor("Green");
    const results: string[] = [];
    for (const result of await tmcnComponent.resultsList()) {
      results.push(await result.innerText());
    }
    expect(results).toEqual(["Red", "Green"]);
  })

  test("Select a color and close it with the x inside the result", async ({page}) => {
    zebrunner.testCaseKey("DMQARM-3");
    const autoComplete: AutoCompletePage = new AutoCompletePage(page);
    const tmcnComponent: TypeMultipleColorNamesComponent = autoComplete.getTypeMultipleColorNamesComponent();

    await tmcnComponent.addColor("Red")
    await tmcnComponent.addColor("Green")
    const xResultsLocators: Locator[] = await tmcnComponent.xResultListLocator()
    let counter = 2;
    expect(xResultsLocators.length).toEqual(counter);
    for (let index = 0; index > 2; index++) {
      await xResultsLocators[index].click();
      expect(xResultsLocators.length).toEqual(counter--);
    }
  })

  test("check close all button functionality",async({page})=>{
    zebrunner.testCaseKey("DMQARM-4");
    const autoComplete: AutoCompletePage = new AutoCompletePage(page);
    const tmcnComponent: TypeMultipleColorNamesComponent = autoComplete.getTypeMultipleColorNamesComponent();

    expect(await tmcnComponent.closeAllResultsLocator().isVisible()).toBeFalsy();
    await tmcnComponent.addColor("Red");
    await tmcnComponent.addColor("Green");
    let results: Locator[] = await tmcnComponent.resultsList();
    expect(results.length).toEqual(2);
    expect(await tmcnComponent.closeAllResultsLocator().isVisible()).toBeTruthy();
    await tmcnComponent.closeAllResultsLocator().click();
    expect(await tmcnComponent.closeAllResultsLocator().isVisible()).toBeFalsy();
    results = await tmcnComponent.resultsList();
    expect(results.length).toEqual(0);
  })
})

test.describe("Type single color name component tests",()=>{
  test("Check auto complete suggestions", async ({page}) => {
    zebrunner.testCaseKey("DMQARM-5");
    const autoComplete: AutoCompletePage = new AutoCompletePage(page);
    const tscnComponent: TypeSingleColorNameComponent = autoComplete.getTypeSingleColorNameComponent();

    let input = "r";
    await tscnComponent.inputLocator().fill(input);
    await page.waitForTimeout(100);
    const autoCompleteSuggestions = await tscnComponent.autoCompleteOptionsList();
    for (const element of autoCompleteSuggestions) {
      const content = await element.innerText();
      expect(content.toLowerCase()).toContain("r");
    }
  })

  test("Select multiple colors", async({page})=>{
    zebrunner.testCaseKey("DMQARM-6");
    const autoComplete: AutoCompletePage = new AutoCompletePage(page);
    const tscnComponent: TypeSingleColorNameComponent = autoComplete.getTypeSingleColorNameComponent();

    await tscnComponent.addColor("Red");
    expect(await tscnComponent.resultLocator().innerText()).toEqual("Red");
    await tscnComponent.addColor("Green");
    expect(await tscnComponent.resultLocator().innerText()).toEqual("Green");
  })
})