import {Page} from "@playwright/test";

export enum Inputs {
  FullName,
  Email,
  CurrentAddress,
  PermanentAddress,
}

export class TextBox {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private fullNameInputLocator() {
    return this.page.locator("#userName");
  }

  private emailInputLocator() {
    return this.page.locator("#userEmail");
  }

  private currentAddressTextAreaLocator() {
    return this.page.locator("#currentAddress");
  }

  private permanentAddressTextAreaLocator() {
    return this.page.locator("#permanentAddress");
  }

  private submitButtonLocator(){
    return this.page.locator("#submit");
  }

  private outputLocator(){
    return this.page.locator("#output");
  }

  public async getEmailBoxBorderStyle() {
    return await this.emailInputLocator().evaluate((element) =>
      window.getComputedStyle(element).getPropertyValue('border'),
    );
  }

  public async typeIntoInput(text: string, inputToType: Inputs) {
    switch (inputToType) {
      case Inputs.FullName:
        await this.fullNameInputLocator().fill(text);
        break;
      case Inputs.Email:
        await this.emailInputLocator().fill(text);
        break;
      case Inputs.CurrentAddress:
        await this.currentAddressTextAreaLocator().fill(text);
        break;
      case Inputs.PermanentAddress:
        await this.permanentAddressTextAreaLocator().fill(text);
        break;
    }
  }

  public async clearInput(inputToType: Inputs) {
    switch (inputToType) {
      case Inputs.FullName:
        await this.fullNameInputLocator().clear();
        break;
      case Inputs.Email:
        await this.emailInputLocator().clear();
        break;
      case Inputs.CurrentAddress:
        await this.currentAddressTextAreaLocator().clear();
        break;
      case Inputs.PermanentAddress:
        await this.permanentAddressTextAreaLocator().clear();
        break;
    }
  }

  public async clickSubmit(){
    await this.submitButtonLocator().click();
  }

  public async getOutputText(){
    return await this.outputLocator().innerText();
  }

}