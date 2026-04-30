import { expect } from '@playwright/test';
import { timeStamp } from 'console';
import path from 'path';
import locator from '../locators/locators.json';

async function addFacility(page) {
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.locator(locator.addFacilityButton).click();
    await page.locator(locator.facilityTitleInput).fill(`Test title : ${timeStamp}`);
    await page.locator(locator.facilityLocation
        
    ).fill(`test location : ${timeStamp}`);
    const filePath = path.resolve(__dirname, '../resources/image.png');
    await page.locator(locator.imageInput).setInputFiles(filePath);
    await page.locator(locator.imageDeleteButton).hover();
    await expect(page.locator(locator.imageDeleteButton)).toBeVisible();
    await page.locator(locator.themeSelectorDark).click();
    await page.locator(locator.facilityAbout).fill(`About this class : ${timeStamp}`);
    await page.locator(locator.facilityVisibilityCheckbox).click();
    await page.locator(locator.saveChangeButton).click();
    return timeStamp;
}

async function editFacility(page) {
    await page.locator(locator.editFacilityButton).first().click();
    await page.locator(locator.facilityTitleInput).fill(`Test title : upd`);
    await page.locator(locator.facilityLocation).fill(`test location : upd`);
    await page.locator(locator.imageDeleteButton).hover();
    await page.locator(locator.imageDeleteButton).click();
    const filePath = path.resolve(__dirname, '../resources/updated.png');
    await page.locator(locator.imageInput).setInputFiles(filePath);
    await page.waitForTimeout(5000);
    await page.locator(locator.themeSelectorDark).hover();
    await expect(page.locator(locator.img)).toHaveScreenshot('updated.png');
    await page.locator(locator.themeSelectorDark).click();
    await page.locator(locator.facilityAbout).fill(`About this class : upd`);
    await page.locator(locator.facilityVisibilityCheckbox).click();
    await page.locator(locator.saveChangeButton).click();
}

async function verifyEdit(page,timeStamp){
    const firstRowTitle = await page.locator(`//tr[1]/td[1]`).innerText();
    expect(firstRowTitle).toBe(`Test title : upd`);
}

async function EditPermissions(page, timeStamp) {
    await page.reload();
    await page.locator(``).click();

}

async function setFacilityActive(page, facilityName) {
    // click the edit button in facility
    await page.locator(locator.searchBox).fill(facilityName);
    await page.locator(locator.editFacilityButton).first().click();
    // click the active toggle button
    if (await page.locator(locator.facilityVisibilityCheckbox).isUnchecked()) {
    await page.locator(locator.facilityVisibilityCheckbox).click();
    }
    await page.locator(locator.saveChangeButton).click();
}



export {addFacility,editFacility};