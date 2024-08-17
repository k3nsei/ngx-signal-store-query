import { expect, test } from '@playwright/test';

const { step } = test;

test('Repository List', async ({ page }) => {
  const googleResponses = page.waitForResponse(
    (res) =>
      res.request().url().endsWith('gh-org-repos-google.json') &&
      res.request().method() === 'GET' &&
      res.status() === 200,
  );

  await step('has proper url', async () => {
    await page.goto('/');

    expect(page.url()).toBe('http://localhost:4200/');
  });

  await step('has proper title', async () => {
    await expect(page).toHaveTitle('Demo');
  });

  const listLocator = page.locator('ssq-github-repos .list');
  const headerLocator = listLocator.locator('[mat-subheader]');
  const skeletonLocator = listLocator.locator('.list-item.skeleton');
  const listItemLocator = listLocator.locator('.list-item');

  await step('has proper header', async () => {
    await expect(headerLocator.getByText('Google Repositories')).toBeInViewport();
  });

  await step('has loading skeletons', async () => {
    await expect(skeletonLocator).toHaveCount(3);
  });

  await step('has CSP-Validator on a list', async () => {
    await googleResponses;

    await expect(listItemLocator.getByRole('link', { name: 'CSP-Validator' })).toBeInViewport();
  });

  const angularResponses = page.waitForResponse(
    (res) =>
      res.request().url().endsWith('gh-org-repos-angular.json') &&
      res.request().method() === 'GET' &&
      res.status() === 200,
  );

  await step('has proper header', async () => {
    await expect(headerLocator.getByText('Angular Repositories')).toBeInViewport();
  });

  await step('has loading skeletons', async () => {
    await expect(skeletonLocator).toHaveCount(3);
  });

  await step('has batarang on a list', async () => {
    await angularResponses;

    const locator = listItemLocator.getByRole('link', { name: 'batarang' });

    await locator.first().scrollIntoViewIfNeeded();

    await expect(locator).toBeInViewport();
  });
});
