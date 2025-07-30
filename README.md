# Playwright Test Suite for Asset Management System

Research project exploring Claude-based MCP integration with Playwright using TypeScript. Focused on evaluating AI-assisted E2E test generation, prompt structure, and real-time test scripting via Claude and VS Code Copilot.

## Test Coverage

The test suite covers the following scenarios:

### 1. Complete Resource Creation Workflow
- **Login**: User authentication
- **Navigation**: Access platform through the application UI
- **Resource Management**:
  - Generate unique resource names using timestamps
  - Check for existing resources
  - Create new resources with specific type
  - Verify resource creation and table display

### 2. Existing resource Handling
- Test duplicate resource detection
- Verify resource existence checks work correctly

### 3. Form Validation
- Test mandatory field validation for resource creation
- Verify error handling and form behavior

## Project Structure

```
playwright-claude-ts/
├── features/
│   ├── resource-management.feature         # Gherkin feature definitions
│   └── steps/
│       └── resource-management.ts          # Step implementations
├── helpers/
│   ├── login-helper.ts                     # Login functionality
│   └── navigation-helper.ts                # Navigation helpers
├── utils/
│   ├── constants.ts                        # Application constants and selectors
│   └── test-data-generator.ts              # Test data generation utilities
├── support/
│   └── hooks.ts                            # Cucumber hooks and browser setup
├── reports/                                # Test reports
├── screenshots/                            # Failure screenshots
└── package.json                            # Dependencies and scripts
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
- **Authentication**: OAuth2 through Keycloak
- **Browser**: Chromium (configurable)

## Example Test Run Output

```
✓ Create a new resource and entity with unique timestamp names
✓ Verify existing resource handling  
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