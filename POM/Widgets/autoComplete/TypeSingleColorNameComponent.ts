import {Locator, Page} from "@playwright/test";

export class TypeSingleColorNameComponent {
  readonly page: Page

  constructor(page: Page) {
    this.page = page;
  }

  public inputLocator(): Locator {
    return this.page.locator("#autoCompleteSingle .auto-complete__value-container input");
  }

  public async autoCompleteOptionsList() {
    return await this.page.locator("//div[contains(@class, 'auto-complete__menu-list')]//div").all();
  }

  public resultLocator() {
    return this.page
      .locator("#autoCompleteSingle .auto-complete__value-container > .auto-complete__single-value");
  }

  public async addColor(input: string) {
    await this.inputLocator().fill(input);
    await this.page.waitForTimeout(100);
    let options: Locator[] = await this.autoCompleteOptionsList();
    await options[0].click();
  }
}