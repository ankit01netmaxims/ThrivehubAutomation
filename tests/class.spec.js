import { test, expect } from '@playwright/test';
import {login,search,navigateTo} from '../utils/general.js';
import {addClass,navigateToFacility,editClass} from '../pages/class.js';

test('classes check', async ({ page }) => {
  await login(page);
  await navigateTo(page,'Classes');
  let timeStamp = new Date().getTime();
  await addClass(page,'Test title : upd',timeStamp);
  //verify the added class using the same timestamp
});

test('edit class check', async ({ page }) => {
  await login(page);
  await navigateTo(page,'Classes');
  await navigateToFacility(page,'test');
  await editClass(page);  
});
