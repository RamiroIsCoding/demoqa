import {expect, test} from "@playwright/test";
import {Inputs, TextBox} from "../../POM/Elements/TextBox";
import {zebrunner} from '@zebrunner/javascript-agent-playwright';

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
});

test("Submit valid data and verify output", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-24");
  const textBox: TextBox = new TextBox(page);

  await textBox.typeIntoInput("John Doe", Inputs.FullName);
  await textBox.typeIntoInput("john.doe@example.com", Inputs.Email);
  await textBox.typeIntoInput("123 Main St, Springfield", Inputs.CurrentAddress);
  await textBox.typeIntoInput("456 Elm St, Springfield", Inputs.PermanentAddress);
  await textBox.clickSubmit();

  const outputText = await textBox.getOutputText();
  expect(outputText).toContain("Name:John Doe");
  expect(outputText).toContain("Email:john.doe@example.com");
  expect(outputText).toContain("Current Address :123 Main St, Springfield");
  expect(outputText).toContain("Permananet Address :456 Elm St, Springfield");
});

test("Submit invalid email and verify error", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-25");
  const textBox: TextBox = new TextBox(page);

  await textBox.typeIntoInput("John Doe", Inputs.FullName);
  await textBox.typeIntoInput("john.doeexample.com", Inputs.Email); // Invalid email
  await textBox.typeIntoInput("123 Main St, Springfield", Inputs.CurrentAddress);
  await textBox.typeIntoInput("456 Elm St, Springfield", Inputs.PermanentAddress);
  await textBox.clickSubmit();

  await page.waitForTimeout(500)
  const borderColor = await textBox.getEmailBoxBorderStyle();
  expect(borderColor).toEqual("1px solid rgb(255, 0, 0)");
});

test("Submit form with only email and verify output", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-26");
  const textBox: TextBox = new TextBox(page);

  await textBox.typeIntoInput("john.doe@example.com", Inputs.Email);
  await textBox.clickSubmit();

  const outputText = await textBox.getOutputText();
  expect(outputText).toContain("Email:john.doe@example.com");
});

test("Submit form with invalid email and verify error", async ({ page }) => {
  zebrunner.testCaseKey("DMQARM-27");
  const textBox: TextBox = new TextBox(page);

  const invalidEmails = [
    "johndoegmail.com", // Missing '@'
    "john.doe@com", // Missing '.' after domain
    "john.doe@example.", // Missing characters after '.'
    "john@doe@example.com", // Multiple '@'
    "john.doe@example.c", // Less than 2 characters after '.'
  ];

  for (const email of invalidEmails) {
    await textBox.typeIntoInput(email, Inputs.Email);
    await textBox.clickSubmit();

    await page.waitForTimeout(500);
    const borderColor = await textBox.getEmailBoxBorderStyle();
    expect(borderColor).toEqual("1px solid rgb(255, 0, 0)");

    // Clear the input for the next iteration
    await textBox.clearInput(Inputs.Email);
  }
});
