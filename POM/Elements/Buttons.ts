import {Page} from "@playwright/test";

export class Buttons{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public doubleClickButtonLocator(){
    return this.page.locator("#doubleClickBtn");
  }

  public rightClickButtonLocator(){
    return this.page.locator("#rightClickBtn");
  }

  public clickMeButtonLocator(){
    return this.page.getByText("Click Me", {exact: true});
  }

  public doubleClickMessageLocator(){
    return this.page.locator("#doubleClickMessage");
  }

  public rightClickMessageLocator(){
    return this.page.locator("#rightClickMessage");
  }

  public clickMeMessageLocator(){
    return this.page.locator("#dynamicClickMessage");
  }
}