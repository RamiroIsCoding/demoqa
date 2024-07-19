import {expect, test} from "@playwright/test";
import {Accordian, Header} from "../../POM/Widgets/Accordian"
import {zebrunner} from '@zebrunner/javascript-agent-playwright';

test.beforeEach(async ({page})=>{
  await page.goto("https://demoqa.com/accordian");
})

test("Verify initial state", async ({page})=>{
  zebrunner.testCaseKey("DMQARM-10");
  const accordian: Accordian = new Accordian(page);
  expect(await accordian.cardBodyLocator(Header.WhatIs).isVisible()).toBeTruthy();
  expect(await accordian.cardBodyLocator(Header.WhereDoes).isVisible()).toBeFalsy();
  expect(await accordian.cardBodyLocator(Header.WhyDoWe).isVisible()).toBeFalsy();
})

test("Expand 'What is Lorem Ipsum?' section and verify", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-11");
  const accordian: Accordian = new Accordian(page);

  await accordian.cardHeaderLocator(Header.WhatIs).click();
  await accordian.cardHeaderLocator(Header.WhatIs).click();
  await page.waitForTimeout(300);

  expect(await accordian.cardBodyLocator(Header.WhatIs).isVisible()).toBeTruthy();
  expect(await accordian.cardBodyLocator(Header.WhereDoes).isVisible()).toBeFalsy();
  expect(await accordian.cardBodyLocator(Header.WhyDoWe).isVisible()).toBeFalsy();
});


test("Expand 'Where does it come from?' section and verify", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-12");
  const accordian: Accordian = new Accordian(page);

  await accordian.cardHeaderLocator(Header.WhereDoes).click();
  await page.waitForTimeout(300);

  expect(await accordian.cardBodyLocator(Header.WhatIs).isVisible()).toBeFalsy();
  expect(await accordian.cardBodyLocator(Header.WhereDoes).isVisible()).toBeTruthy();
  expect(await accordian.cardBodyLocator(Header.WhyDoWe).isVisible()).toBeFalsy();
});


test("Expand 'Why do we use it?' section and verify", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-13");
  const accordian: Accordian = new Accordian(page);

  await accordian.cardHeaderLocator(Header.WhyDoWe).click();
  await page.waitForTimeout(300);

  expect(await accordian.cardBodyLocator(Header.WhatIs).isVisible()).toBeFalsy();
  expect(await accordian.cardBodyLocator(Header.WhereDoes).isVisible()).toBeFalsy();
  expect(await accordian.cardBodyLocator(Header.WhyDoWe).isVisible()).toBeTruthy();
});

test("Verify content of 'What is Lorem Ipsum?' section", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-14");
  const accordian: Accordian = new Accordian(page);

  await page.waitForTimeout(300);

  const content = await accordian.cardBodyLocator(Header.WhatIs).innerText();
  expect(content).toEqual("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
});

test("Verify content of 'Where does it come from?' section", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-15");
  const accordian: Accordian = new Accordian(page);

  await accordian.cardHeaderLocator(Header.WhereDoes).click();
  await page.waitForTimeout(300);

  const content = await accordian.cardBodyLocator(Header.WhereDoes).innerText();
  expect(content).toEqual("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.");
});

test("Verify content of 'Why do we use it?' section", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-16");
  const accordian: Accordian = new Accordian(page);

  await accordian.cardHeaderLocator(Header.WhyDoWe).click();
  await page.waitForTimeout(300);

  const content = await accordian.cardBodyLocator(Header.WhyDoWe).innerText();
  expect(content).toEqual("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).");
});