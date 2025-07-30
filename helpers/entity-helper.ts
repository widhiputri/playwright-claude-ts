import { Page, expect } from '@playwright/test';
import { APP_CONFIG, ENTITY_CONFIG } from '../utils/constants';

export class EntityHelper {
  constructor(private page: Page) {}

  async createNewEntity(entityData: {
    name: string;
    clientName: string;
    type: string;
    remarks: string;
  }): Promise<void> {
    // Click Add new button for entity
    await this.page.getByRole('button', { name: /Add new/ }).click();
    
    // Wait for the entity form page to load
    await this.page.waitForURL('**/entities/create');
    await this.page.waitForLoadState('networkidle');
    
    // Fill entity name
    await this.page.getByRole('textbox', { name: 'Enter entity name' }).fill(entityData.name);
    
    // Select entity type
    const entityTypeSelect = this.page.locator('.ant-select').first();
    await entityTypeSelect.click();
    await this.page.getByText(entityData.type, { exact: true }).nth(1).click(); // Use nth(1) to get the dropdown option
    
    // Select client - this needs to be the second select dropdown
    const clientSelect = this.page.locator('.ant-select').nth(1);
    await clientSelect.click();
    
    // Wait for options to load and select the client
    await this.page.waitForTimeout(1000);
    await this.page.getByText(entityData.clientName).click();
    
    // Fill remarks
    await this.page.getByRole('textbox', { name: 'Enter remarks' }).fill(entityData.remarks);
    
    // Submit the form
    await this.page.getByRole('button', { name: 'Submit' }).click();
    
    // Wait for redirect back to entities list
    await this.page.waitForURL('**/entities');
    await this.page.waitForLoadState('networkidle');
  }

  async fillMandatoryFields(entityData: {
    name: string;
    clientName: string;
    type: string;
    remarks: string;
  }): Promise<void> {
    await this.createNewEntity(entityData);
  }

  async verifyEntitySaved(): Promise<void> {
    // Check that we're back on the entities list page
    await this.page.waitForURL('**/entities');
    await expect(this.page).toHaveURL(/entities$/);
  }

  async verifyEntityInTable(entityName: string): Promise<void> {
    // Wait for table to update
    await this.page.waitForTimeout(2000);
    
    // Wait for the entity table to load
    await this.page.waitForSelector('table', { timeout: APP_CONFIG.TIMEOUT.DEFAULT });
    
    // Check if entity appears in table
    const entityRow = this.page.locator('tbody tr').filter({ hasText: entityName });
    await expect(entityRow).toBeVisible();
  }

  async verifyEntityStatus(entityName: string, expectedStatus: string = ENTITY_CONFIG.EXPECTED_STATUS): Promise<void> {
    // Wait for table to update
    await this.page.waitForTimeout(2000);
    
    // Find the entity row and check status
    const entityRow = this.page.locator('tbody tr').filter({ hasText: entityName });
    await expect(entityRow).toBeVisible();
    
    // The status is "Under Review" in the UI, not "under_review"
    const displayStatus = expectedStatus === 'under_review' ? 'Under Review' : expectedStatus;
    
    // Verify the status (this might need adjustment based on the actual table structure)
    const statusCell = entityRow.locator('td').filter({ hasText: displayStatus });
    await expect(statusCell).toBeVisible();
  }

  async checkValidationErrors(): Promise<boolean> {
    // Check for validation error messages
    const errorMessages = this.page.locator('.ant-form-item-explain-error, .error-message, [role="alert"]');
    return await errorMessages.count() > 0;
  }
}
