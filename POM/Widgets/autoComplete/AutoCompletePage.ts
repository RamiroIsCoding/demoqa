import {Locator, Page} from "@playwright/test";
import {TypeMultipleColorNamesComponent} from "./TypeMultipleColorNamesComponent";
import {TypeSingleColorNameComponent} from "./TypeSingleColorNameComponent";

export class AutoCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getTypeMultipleColorNamesComponent(): TypeMultipleColorNamesComponent {
    return new TypeMultipleColorNamesComponent(this.page);
  }
  public getTypeSingleColorNameComponent(): TypeSingleColorNameComponent {
    return new TypeSingleColorNameComponent(this.page)
  }
}