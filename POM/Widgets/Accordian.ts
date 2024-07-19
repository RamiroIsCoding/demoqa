import {Page} from "@playwright/test";

export enum Header{
  WhatIs="What is Lorem Ipsum?",
  WhereDoes="Where does it come from?",
  WhyDoWe="Why do we use it?",
}
export class Accordian{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public cardHeaderLocator(header: Header){
    return this.page.getByText(header);
  }

  public cardBodyLocator(header: Header){
    return this.page.getByText(header).locator("//..//div[@class='card-body']");
  }
}