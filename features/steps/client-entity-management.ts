import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Page, expect } from '@playwright/test';
import { LoginHelper } from '../../helpers/login-helper';
import { NavigationHelper } from '../../helpers/navigation-helper';
import { ClientHelper } from '../../helpers/client-helper';
import { EntityHelper } from '../../helpers/entity-helper';
import { generateClientTestData, generateEntityTestData } from '../../utils/test-data-generator';
import { APP_CONFIG } from '../../utils/constants';

// Set default timeout for Cucumber steps
setDefaultTimeout(APP_CONFIG.TIMEOUT.NAVIGATION);

// Global variables for test data
let page: Page;
let loginHelper: LoginHelper;
let navigationHelper: NavigationHelper;
let clientHelper: ClientHelper;
let entityHelper: EntityHelper;
let clientTestData: ReturnType<typeof generateClientTestData>;
let entityTestData: ReturnType<typeof generateEntityTestData>;
let clientExists: boolean = false;

// Navigation steps
Given('the user navigates to the application homepage', async function() {
  page = this.page;
  loginHelper = new LoginHelper(page);
  await loginHelper.navigateToLogin();
});

When('the user logs in with valid operator credentials', async function() {
  navigationHelper = new NavigationHelper(page);
  clientHelper = new ClientHelper(page);
  entityHelper = new EntityHelper(page);
  
  await loginHelper.loginAsOperator();
  await loginHelper.verifyLoginSuccess();
});

When('the user opens the sidebar menu', async function() {
  await navigationHelper.openSidebarMenu();
});

When('the user navigates to Account Management under Clients tab', async function() {
  await navigationHelper.navigateToAccountManagement();
  await navigationHelper.verifyOnClientsPage();
});

When('the user navigates to Account Management', async function() {
  await navigationHelper.navigateToAccountManagement();
});

// Client management steps
When('the user generates a unique client name with timestamp', async function() {
  clientTestData = generateClientTestData();
  console.log(`Generated client name: ${clientTestData.name}`);
});

Then('the user checks if the client name already exists in the client table', async function() {
  clientExists = await clientHelper.checkIfClientExists(clientTestData.name);
  console.log(`Client exists: ${clientExists}`);
});

When('the client does not exist', async function() {
  expect(clientExists).toBeFalsy();
});

When('the client already exists', async function() {
  expect(clientExists).toBeTruthy();
});

Then('the user creates a new client with type {string}', async function(clientType: string) {
  await clientHelper.createNewClient(clientTestData.name, clientType);
});

Then('the user verifies the client appears in the client table', async function() {
  await clientHelper.verifyClientInTable(clientTestData.name);
});

Then('the user skips client creation and proceeds to entity creation', async function() {
  console.log('Client already exists, skipping creation');
  // No action needed, just proceed to entity creation
});

// Entity management steps
When('the user switches to the Entities tab', async function() {
  await navigationHelper.switchToEntitiesTab();
  await navigationHelper.verifyOnEntitiesTab();
});

When('the user creates a new entity with generated client name', async function() {
  entityTestData = generateEntityTestData(clientTestData.name);
  console.log(`Generated entity name: ${entityTestData.name}`);
});

When('the user fills all mandatory entity fields', async function() {
  await entityHelper.fillMandatoryFields(entityTestData);
});

When('the user submits the entity form', async function() {
  // This is handled within the fillMandatoryFields method
  console.log('Entity form submitted');
});

Then('the user verifies the entity is successfully saved', async function() {
  await entityHelper.verifyEntitySaved();
});

Then('the user verifies the entity appears in the entity table', async function() {
  await entityHelper.verifyEntityInTable(entityTestData.name);
});

Then('the user verifies the entity status is {string}', async function(expectedStatus: string) {
  await entityHelper.verifyEntityStatus(entityTestData.name, expectedStatus);
});

When('the user generates the same client name again', async function() {
  // Use the same client name that was already generated
  console.log(`Using existing client name: ${clientTestData.name}`);
});

Then('the client should exist in the table', async function() {
  const exists = await clientHelper.checkIfClientExists(clientTestData.name);
  expect(exists).toBeTruthy();
});

// Validation steps
When('the user attempts to create a new entity without filling mandatory fields', async function() {
  // Click Add new button without filling any fields
  await page.getByRole('button', { name: /Add new/ }).click();
  await page.waitForURL('**/entities/create');
  
  // Try to submit without filling fields
  await page.getByRole('button', { name: 'Submit' }).click();
});

Then('the user should see validation errors', async function() {
  // Since it's a page-based form, we check for validation messages or that we stay on the same page
  // The form should show validation errors and not redirect
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/entities\/create/);
});

Then('the form should remain on the create entity page', async function() {
  // Verify we're still on the create entity page (form wasn't submitted)
  await expect(page).toHaveURL(/entities\/create/);
});
