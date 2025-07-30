import { Page, expect } from '@playwright/test';
import { USER_CREDENTIALS, APP_CONFIG } from '../utils/constants';

export class LoginHelper {
  constructor(private page: Page) {}

  async navigateToLogin(): Promise<void> {
    await this.page.goto(APP_CONFIG.BASE_URL);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsOperator(): Promise<void> {
    // Wait for login form to appear (wait for page to redirect to Keycloak)
    await this.page.waitForURL('**/keycloak.am.drax.dev/**', { timeout: APP_CONFIG.TIMEOUT.DEFAULT });
    await this.page.waitForLoadState('networkidle');
    
    // Fill email
    await this.page.getByRole('textbox', { name: 'Email' }).fill(USER_CREDENTIALS.OPERATOR.email);
    
    // Fill password
    await this.page.getByRole('textbox', { name: 'Password' }).fill(USER_CREDENTIALS.OPERATOR.password);
    
    // Click sign in
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for redirect back to main application
    await this.page.waitForURL('**/ui.am.drax.dev/**', { timeout: APP_CONFIG.TIMEOUT.NAVIGATION });
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoginSuccess(): Promise<void> {
    // Verify we're on the dashboard
    await expect(this.page).toHaveURL(/ui\.am\.drax\.dev/);
    await expect(this.page).toHaveTitle(/Asset Management Operator Dashboard/);
  }
}
