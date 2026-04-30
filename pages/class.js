import { expect } from '@playwright/test';
import path from 'path';
import locator from '../locators/locators.json';
import { text } from 'stream/consumers';

async function addClass(page,facilityName,Timestamp) {
    await page.locator(locator.addClassButton).click();
    await page.getByRole('button', { name: 'Host Facility Choose location' }).click();
    await page.getByRole('option', { name: facilityName }).click();
    await page.getByRole('textbox', { name: 'Class Title' }).fill('Title test : '+Timestamp);
    await page.locator(locator.imageInput).setInputFiles(path.resolve('resources/class.jpg'));
    await page.waitForTimeout(10000); // can remove this when the time issue here is fixed
    await page.getByRole('button', { name: 'Class Level All Levels' }).click();
    await page.getByRole('option', { name: 'Beginner' }).click();
    await page.getByRole('textbox', { name: 'Price Per Sessions ($)' }).fill('100');
    await page.getByRole('textbox', { name: 'Duration' }).fill('1h');
    await page.getByRole('textbox', { name: 'Member Checklist' }).fill('member : '+Timestamp);
    await page.getByRole('textbox', { name: 'Quick Intro' }).fill('intro of class : '+Timestamp);
    await page.getByRole('button', { name: 'Create Class' }).click({force:true,delay:1000});
    const successMsg = page.locator("//div[@role='status' and text()='Class created successfully']").first();
    await expect(successMsg).toBeVisible();
}

async function editClass(page) {
    
}

async function navigateToFacility(page, facilityName) {
    await page.getByRole('button', { hasText: facilityName }).click();
}

export {addClass,editClass,navigateToFacility};


  
  
//   await page.getByRole('button', { name: 'Host Facility Choose location' }).click();
//   await page.getByRole('option', { name: 'Test title : upd' }).click();
//   await page.getByRole('option', { name: 'Test title : upd' }).click();
//   await page.getByRole('textbox', { name: 'Class Title' }).press('CapsLock');
//   await page.getByRole('textbox', { name: 'Class Title' }).fill('T');
//   await page.getByRole('textbox', { name: 'Class Title' }).press('CapsLock');
//   await page.getByRole('textbox', { name: 'Class Title' }).fill('Title test');
//   await page.locator('div').filter({ hasText: /^Upload Cover PhotoJPG, JPEG, PNG, WEBP & Max 5MB$/ }).nth(2).click();
//   await page.locator('#headlessui-dialog-_r_1g_').setInputFiles('Large_elegant_event_202604131751.png');
//   await page.getByRole('button', { name: 'Class Level All Levels' }).click();
//   await page.getByRole('option', { name: 'Beginner' }).click();
//   await page.getByRole('textbox', { name: 'Price Per Sessions ($)' }).click();
//   await page.getByRole('textbox', { name: 'Price Per Sessions ($)' }).fill('0100');
//   await page.getByRole('textbox', { name: 'Duration' }).click();
//   await page.getByRole('textbox', { name: 'Duration' }).fill('1h');
//   await page.getByRole('textbox', { name: 'Member Checklist' }).click();
//   await page.getByRole('textbox', { name: 'Member Checklist' }).fill('member 1');
//   await page.getByRole('textbox', { name: 'Quick Intro' }).click();
//   await page.getByRole('textbox', { name: 'Quick Intro' }).fill('intro of class');
//   await page.getByRole('button', { name: 'Create Class' }).click();
