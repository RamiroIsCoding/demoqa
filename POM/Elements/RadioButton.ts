import {Page} from "@playwright/test";

export enum RadioButtonSelector{
  Yes='yesRadio',
  Impressive='impressiveRadio',
  No='noRadio'
}

export class RadioButton {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public radioLocator(radioButton: RadioButtonSelector){
    return this.page.locator(`label[for='${radioButton}']`);
  }

  public radioResultLocator(){
    return this.page.locator("p[class='mt-3']");
  }
}