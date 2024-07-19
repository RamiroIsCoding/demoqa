import {expect, Locator, Page} from "@playwright/test";

enum groupContainer {
  Elements = "Elements",
  Forms = "Forms",
  AlertsFramesWindows = "Alerts, Frame & Windows",
  Widgets = "Widgets",
  Interactions = "Interactions",
  BookStoreApplication = "Book Store Application",
}

enum ContainerName {
  Elements = "Elements",
  Forms = "Forms",
  AlertsFramesWindows = "Alerts, Frame & Windows",
  Widgets = "Widgets",
  Interactions = "Interactions",
  BookStoreApplication = "Book Store Application",
}

enum ElementsContent {
  TextBox = "Text Box",
  CheckBox = "Check Box",
  RadioButton = "Radio Button",
  WebTables = "Web Tables",
  Buttons = "Buttons",
  Links = "Links",
  BrokenLinks = "Broken Links - Images",
  UploadAndDownload = "Upload and Download",
  DynamicProperties = "Dynamic Properties",
}

export class LeftPanel {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private containerLocator(containerName: groupContainer) {
    return this.page.locator(".left-pannel .group-header .header-text").getByText(containerName);
  }

  private containerContentLocator(){
    return this.page.locator("ul[class='menu-list'] li");
  }

  private async isContainerOpened(containerName: groupContainer) {
    const list = await this.containerContentLocator().all();
    const visibleElements: string[] = [];
    for (const el of list) {
      if(await el.isVisible()){
        visibleElements.push(await el.innerText());
      }
    }
    const actualElements: string[] = [];
    for(const el in ElementsContent){
      actualElements.push(el);
    }
    expect(actualElements).toEqual(visibleElements);
  }

  private openContainer(containerName: groupContainer) {
    this.page.locator(".left-pannel .group-header .header-text").getByText(containerName);
  }

  private closeContainer(containerName: groupContainer) {
    this.page.locator(".left-pannel .group-header .header-text").getByText(containerName);
  }

  private selectSubElement() {

  }
}