import {Page} from "@playwright/test";

export class WebTables{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public addButton(){
    this.page.locator("#addNewRecordButton");
  }

  public searchBarInput(){
    this.page.locator("#addNewRecordButton");
  }

  public searchButton(){
    this.page.locator("#basic-addon2");
  }

  
}