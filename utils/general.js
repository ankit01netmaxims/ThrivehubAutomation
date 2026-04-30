import { expect } from '@playwright/test';
import { Network } from 'node:inspector/promises';
import locator from '../locators/locators.json';

async function login(page) {
  await page.goto('https://thrive-hub.imaxims.com/');

  const emailInput = page.locator('#email');
  const passwordInput = page.locator('#password');

  await emailInput.fill('admin@yopmail.com');
  await passwordInput.fill('Admin@12345');

  await page.locator(locator.loginBtn).click();

  await page.waitForLoadState('domcontentloaded'); 
  if (await page.locator(locator.navbarButton).isVisible()) {
    await page.locator(locator.navbarButton).click();
  }
  await expect(page.locator(locator.logoutButton)).toBeVisible();
}

async function logout(page) {  
  const emailInput = page.locator('#email');
  const passwordInput = page.locator('#password');
  
  const logoutBtn = page.locator(locator.logoutButton);

  await logoutBtn.click();
  await page.waitForLoadState('domcontentloaded'); 
  await expect(page.locator(loginBtn)).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
}

async function search(page, searchText) {
  const searchBox = page.locator(locator.searchBox);
  await searchBox.fill(searchText);

  await page.waitForTimeout(1000); // or replace with proper wait on results

  const paginationCount=await page.locator(locator.paginationCount).innerText();
  const rows = page.locator(locator.rows);
  await page.waitForTimeout(3000);
  const rowCount = await rows.count()-1; // Adjust for header row if present
  expect(rowCount).toBeGreaterThan(0);
  expect(rowCount).toBeLessThanOrEqual(Number(paginationCount));

  console.log("Total rows:", rowCount);

  const searchLower = searchText.toLowerCase();

  for (let i = 1; i < rowCount; i++) {
    await page.waitForLoadState('networkidle');
    const cellText = await page.locator(`//tr[${i}]/td[1]`).innerText();
    const cellLower = cellText.toLowerCase();
    await page.waitForLoadState('networkidle');
    if (!cellLower.includes(searchLower)) {
      throw new Error(`Row ${i} does not contain search text`);
    }
  }
}

const tabHeadingMap = {
  Facilities: 'Facility Network',
  Classes: 'Classes Management',
  Dashboard: 'Dashboard'
};

async function navigateTo(page, key) {
  const expectedHeading = tabHeadingMap[key];

  if (!expectedHeading) {
    throw new Error(`Invalid key: ${key}`);
  }

  await page.locator(`//span[normalize-space()='${key}']`).click();

  const heading = page.locator(locator.heading);

  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(expectedHeading);
}

export {login,search,navigateTo};