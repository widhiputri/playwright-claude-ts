import { Page, expect } from '@playwright/test';
import { APP_CONFIG, CLIENT_CONFIG } from '../utils/constants';

export class ClientHelper {
  constructor(private page: Page) {}

  async checkIfClientExists(clientName: string): Promise<boolean> {
    // Wait for the client table to load
    await this.page.waitForSelector('table', { timeout: APP_CONFIG.TIMEOUT.DEFAULT });
    
    // Get all client rows
    const clientRows = await this.page.locator('tbody tr').all();
    
    for (const row of clientRows) {
      const cellText = await row.locator('td').first().textContent();
      if (cellText && cellText.includes(clientName)) {
        return true;
      }
    }
    
    return false;
  }

  async createNewClient(clientName: string, clientType: string = CLIENT_CONFIG.TYPE): Promise<void> {
    // Click Add new button
    await this.page.getByRole('button', { name: /Add new/ }).click();
    
    // Wait for the form page to load
    await this.page.waitForURL('**/clients/create');
    await this.page.waitForLoadState('networkidle');
    
    // Fill client name
    await this.page.getByRole('textbox', { name: 'Enter client name' }).fill(clientName);
    
    // Click on client type dropdown
    await this.page.locator('.ant-select').click();
    
    // Select the client type option
    await this.page.getByText(clientType, { exact: true }).click();
    
    // Submit the form
    await this.page.getByRole('button', { name: 'Submit' }).click();
    
    // Wait for redirect back to clients list
    await this.page.waitForURL('**/clients');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyClientInTable(clientName: string): Promise<void> {
    // Wait for table to update
    await this.page.waitForTimeout(2000);
    
    // Check if client appears in table
    const clientExists = await this.checkIfClientExists(clientName);
    expect(clientExists).toBeTruthy();
    
    // Verify the client row is visible
    const clientRow = this.page.locator('tbody tr').filter({ hasText: clientName });
    await expect(clientRow).toBeVisible();
  }
}
