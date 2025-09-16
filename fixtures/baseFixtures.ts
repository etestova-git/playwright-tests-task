import { test as base } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

type BaseFixtures = {
  managePage: ManagePage;
};

export const test = base.extend<BaseFixtures>({
  managePage: async ({ page }, use) => {
    const mp = new ManagePage(page);
    await use(mp);
  },
});

export { expect } from '@playwright/test';
