import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Set mock header for all requests
    await page.setExtraHTTPHeaders({
      'x-mock-user': 'true'
    });
    await use(page);
  },
});

test('navigation between lessons in course portal', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  
  // Go to course root (using a known slug from codebase)
  // We'll use ceo-ai-command as it's the one the user reported
  const username = 'mockuser';
  const courseSlug = 'ceo-ai-command';
  
  await page.goto(`/student-portal/${username}/${courseSlug}/week-1/day-1`);
  
  // Verify we are on Day 1
  await expect(page.locator('h1.lesson-title')).toContainText(/Build Your Command Center/i);
  
  // Click Day 2 in sidebar
  // We need to find the link. Based on our code it should have text like "Deploy Your Agent Fleet"
  const day2Link = page.locator('a.lesson-link').filter({ hasText: /Deploy Your Agent Fleet/i });
  await day2Link.click();
  
  // Verify URL changed
  await expect(page).toHaveURL(new RegExp(`/week-1/day-2`));
  
  // Verify content changed
  await expect(page.locator('h1.lesson-title')).toContainText(/Deploy Your Agent Fleet/i);
  
  // Click Day 3
  const day3Link = page.locator('a.lesson-link').filter({ hasText: /Automation Power/i });
  await day3Link.click();
  
  // Verify URL and content
  await expect(page).toHaveURL(new RegExp(`/week-1/day-3`));
  await expect(page.locator('h1.lesson-title')).toContainText(/Automation Power/i);
  
  // Test rapid navigation (the "3-4 times" limit reported by user)
  for (let i = 1; i <= 4; i++) {
    await page.locator('a.lesson-link').nth(i % 6).click();
    // Wait for content to at least start changing or URL to update
    await page.waitForTimeout(200); 
  }
});
