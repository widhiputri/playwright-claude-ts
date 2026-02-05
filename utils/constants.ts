import { SecureCredentials } from './secure-credentials';

export const APP_CONFIG = {
    BASE_URL: process.env.BASE_URL,
    LOGIN_URL: process.env.LOGIN_URL,
    TIMEOUT: {
          DEFAULT: parseInt(process.env.TIMEOUT || '60000'),
          NAVIGATION: parseInt(process.env.NAVIGATION_TIMEOUT || '90000'),
          SHORT: parseInt(process.env.SHORT_TIMEOUT || '10000')
    }
} as const;

export const USER_CREDENTIALS = {
    OPERATOR: SecureCredentials.getOperatorCredentials()
} as const;

export const CLIENT_CONFIG = {
    NAME_PREFIX: 'Testing PW Clients',
    TYPE: 'Intermediary'
} as const;

export const ENTITY_CONFIG = {
    NAME_PREFIX: 'Testing PW Entity',
    TYPE: 'Corporate',
    REMARKS: 'MCP testing',
    EXPECTED_STATUS: 'under_review'
} as const;

export const SELECTORS = {
    MENU: {
          SIDEBAR_TOGGLE: 'img[alt="menu-unfold"]',
          ACCOUNT_MANAGEMENT: 'menuitem:has-text("Account Management")',
          ENTITIES_TAB: 'tab:has-text("Entities")'
    },
    LOGIN: {
          EMAIL_INPUT: 'textbox[name="Email"]',
          PASSWORD_INPUT: 'textbox[name="Password"]',
          SIGN_IN_BUTTON: 'button:has-text("Sign In")'
    },
    CLIENT: {
          ADD_NEW_BUTTON: 'button:has-text("Add new")',
          CLIENT_NAME_INPUT: 'input[placeholder*="Client Name"], input[name*="name"]',
          CLIENT_TYPE_SELECT: 'select[name*="type"], .ant-select:has-text("Select")',
          SUBMIT_BUTTON: 'button:has-text("Submit"), button:has-text("Save")',
          CLIENT_TABLE: 'table',
          CLIENT_ROWS: 'tbody tr'
    },
    ENTITY: {
          ADD_NEW_BUTTON: 'button:has-text("Add new")',
          ENTITY_NAME_INPUT: 'input[placeholder*="Entity Name"], input[name*="name"]',
          CLIENT_SELECT: 'select[name*="client"], .ant-select:has-text("Select")',
          ENTITY_TYPE_SELECT: 'select[name*="type"], .ant-select:has-text("Corporate")',
          REMARKS_INPUT: 'textarea[name*="remarks"], input[name*="remarks"]',
          SUBMIT_BUTTON: 'button:has-text("Submit"), button:has-text("Save")',
          ENTITY_TABLE: 'table',
          ENTITY_ROWS: 'tbody tr'
    }
} as const;
