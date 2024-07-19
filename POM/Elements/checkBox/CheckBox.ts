import {Page} from "@playwright/test";

export class CheckBox {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public spanTitleLocator(text: string){
    return this.page.locator(".rct-title").getByText(text);
  }

  public async spanTitleList(){
    return await this.page.locator(".rct-title").all();
  }

  public expandButtonLocator(text: string){
    return this.page.locator(`//span[text()='${text}']//..//../button[@title]`)
  }

  public checkBoxLocator(text: string) {
    return this.page.locator(`//span[text()='${text}']//..//span[@class='rct-checkbox']`);
  }

  public iconLocator(text: string) {
    return this.page
      .locator(`//span[text()='${text}']//..//span[@class='rct-node-icon']//*[local-name()='svg']`);
  }

  public buttonExpandAllLocator(){
    return this.page.locator("//button[@title='Expand all']");
  }

  public buttonCollapseAllLocator(){
    return this.page.locator("//button[@title='Collapse all']");
  }
}