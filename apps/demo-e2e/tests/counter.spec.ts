import { expect, test } from '@playwright/test';

const { step } = test;

test('Counter', async ({ page }) => {
  await step('has proper url', async () => {
    await page.goto('/');

    expect(page.url()).toBe('http://localhost:4200/');
  });

  await step('has proper title', async () => {
    await expect(page).toHaveTitle('Demo');
  });

  const counterLocator = page.locator('ssq-counter');
  const valueLocator = counterLocator.locator('output');
  const decreaseLocator = counterLocator.getByRole('button', { name: 'Decrease' });
  const increaseLocator = counterLocator.getByRole('button', { name: 'Increase' });
  const snackbarLocator = page.locator('.cdk-overlay-container .mdc-snackbar');

  await step('too low value error snack bar has been rendered', async () => {
    await decreaseLocator.click();

    await expect(snackbarLocator.getByText('Count is too low')).toBeInViewport();
  });

  await step('counter value should equal 1', async () => {
    await increaseLocator.click();

    await expect(valueLocator).toContainText('1');
  });

  await step('too high value error snack bar has been rendered', async () => {
    for (let i = 0; i < 5; i++) {
      await increaseLocator.click();
    }

    await expect(valueLocator).toContainText('5');
    await expect(snackbarLocator.getByText('Count is too high')).toBeInViewport();
  });
});
