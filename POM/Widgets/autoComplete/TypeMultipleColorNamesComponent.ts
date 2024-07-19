import {Locator, Page} from "@playwright/test";

export class TypeMultipleColorNamesComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public inputLocator(): Locator {
    return this.page.locator("#autoCompleteMultiple .auto-complete__value-container input");
  }

  public async autoCompleteOptionsList() {
    return await this.page.locator("//div[contains(@class, 'auto-complete__menu-list')]//div").all();
  }

  public async resultsList(): Promise<Locator[]> {
    return await this.page
      .locator("#autoCompleteMultiple .auto-complete__value-container > .auto-complete__multi-value").all();
  }

  public async xResultListLocator(): Promise<Locator[]> {
    return await this.page
      .locator("#autoCompleteMultiple .auto-complete__value-container > .auto-complete__multi-value svg")
      .all();
  }

  public closeAllResultsLocator(): Locator{
     return this.page.locator("#autoCompleteMultiple .auto-complete__indicators svg");
  }

  public async addColor(input: string) {
    await this.inputLocator().fill(input);
    await this.page.waitForTimeout(100);
    let options: Locator[] = await this.autoCompleteOptionsList();
    await options[0].click();
  }

}