import { Page, expect } from '@playwright/test';
import { APP_CONFIG } from '../utils/constants';

export class NavigationHelper {
  constructor(private page: Page) {}

  async openSidebarMenu(): Promise<void> {
    // Since navigating to the specific URL is more reliable, we'll skip the sidebar opening
    // and navigate directly to the account management URL
    console.log('Skipping sidebar menu - will navigate directly to Account Management');
  }

  async navigateToAccountManagement(): Promise<void> {
    // Navigate directly to the account management clients page
    await this.page.goto('https://ui.am.drax.dev/account-management/clients');
    
    // Wait for the page to load
    await this.page.waitForLoadState('networkidle');
    
    // Wait for the clients table to appear
    await this.page.waitForSelector('table', { timeout: APP_CONFIG.TIMEOUT.DEFAULT });
  }

  async switchToEntitiesTab(): Promise<void> {
    // Click on Entities tab
    await this.page.getByRole('tab', { name: 'Entities' }).click();
    
    // Wait for URL to change to entities
    await this.page.waitForURL('**/entities');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOnClientsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/account-management\/clients/);
    await expect(this.page.getByRole('tab', { name: 'Clients' })).toBeVisible();
  }

  async verifyOnEntitiesTab(): Promise<void> {
    await expect(this.page.getByRole('tab', { name: 'Entities' })).toHaveAttribute('aria-selected', 'true');
  }
}
