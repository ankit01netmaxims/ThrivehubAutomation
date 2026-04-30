import { test, expect } from '@playwright/test';
import {login,search,navigateTo} from '../utils/general.js';
import {addFacility, editFacility,verifyEdit} from '../pages/facilities.js'
import { timeStamp } from 'console';

test('facilities check', async ({ page }) => {
  await login(page);
  await navigateTo(page,'Facilities');
  await search(page,'test');
  let timeStamp=await addFacility(page);
  await search(page,timeStamp);
});

test('Edit facility',async ({ page })=>{
  await login(page);
  await navigateTo(page,'Facilities');
  await editFacility(page);
  await search(page,'Test title : upd');
  await verifyEdit(page,'Test title : upd');
  //also verify the facility edit when ticket 146 is solved
  //delete all the updated facilities in a loop when feature is developed
});