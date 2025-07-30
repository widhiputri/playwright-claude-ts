# Playwright Test Suite for Asset Management System

This repository contains comprehensive Playwright tests for the Asset Management System's client and entity management features.

## Test Coverage

The test suite covers the following scenarios:

### 1. Complete Client and Entity Creation Workflow
- **Login**: Authenticate as an operator user
- **Navigation**: Access Account Management through the application UI
- **Client Management**:
  - Generate unique client names using timestamps
  - Check for existing clients
  - Create new clients with type "Intermediary"
  - Verify client creation and table display
- **Entity Management**:
  - Switch to Entities tab
  - Create new entities linked to clients
  - Fill mandatory fields (Name, Client, Type: Corporate, Remarks)
  - Verify entity creation and status ("Under Review")

### 2. Existing Client Handling
- Test duplicate client detection
- Verify client existence checks work correctly

### 3. Form Validation
- Test mandatory field validation for entity creation
- Verify error handling and form behavior

## Project Structure

```
playwright-claude-ts/
├── features/
│   ├── client-entity-management.feature    # Gherkin feature definitions
│   └── steps/
│       └── client-entity-management.ts     # Step implementations
├── helpers/
│   ├── login-helper.ts                     # Login functionality
│   ├── navigation-helper.ts                # Navigation helpers
│   ├── client-helper.ts                    # Client management helpers
│   └── entity-helper.ts                    # Entity management helpers
├── utils/
│   ├── constants.ts                        # Application constants and selectors
│   └── test-data-generator.ts              # Test data generation utilities
├── support/
│   └── hooks.ts                           # Cucumber hooks and browser setup
├── reports/                               # Test reports
├── screenshots/                           # Failure screenshots
└── package.json                          # Dependencies and scripts
```

## Key Features

### Dynamic Test Data
- Uses `Date.now()` timestamps for unique identifiers
- Ensures test isolation and repeatability
- Prevents data conflicts between test runs

### Robust Selectors
- Uses semantic locators (role-based selectors)
- Verified through MCP browser inspection
- Avoids hardcoded selectors for maintainability

### Error Handling
- Comprehensive error capture with screenshots
- Proper timeout handling
- Graceful failure recovery

### Best Practices
- Page Object Model pattern with helper classes
- Separation of concerns (constants, utilities, helpers)
- TypeScript for type safety
- Cucumber BDD for readable test scenarios

## Setup and Execution

### Prerequisites
- Node.js and npm installed
- All dependencies installed via `npm install`

### Available Scripts
- `npm test` - Run all test scenarios
- `npm run test:headed` - Run tests with HTML reporting
- `npm run test:debug` - Run tests with debug tags

### Configuration
- Default timeout: 60 seconds for navigation
- Browser: Chromium with slow motion for debugging
- Screenshots captured on failure
- Reports generated in HTML format

## Test Environment
- **Application URL**: https://ui.am.drax.dev/
- **Test User**: qa-op@hydrax.io
- **Authentication**: OAuth2 through Keycloak
- **Browser**: Chromium (configurable)

## Example Test Run Output

```
✓ Create a new client and entity with unique timestamp names
✓ Verify existing client handling  
✓ Handle mandatory field validation for entity creation

3 scenarios (3 passed)
36 steps (36 passed)
```

## Integration Notes

This test suite is designed to work with the MCP (Model Context Protocol) server for:
- DOM inspection and verification
- Dynamic selector validation
- Real-time application state checking

The tests follow the Copilot Instructions guidelines for:
- Clean, maintainable code structure
- Semantic locator usage
- TypeScript best practices
- Proper error handling and reporting
