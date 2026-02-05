/**
 * Secure Credentials Management
 * 
 * This module handles retrieval of test credentials from environment variables.
 * IMPORTANT: Never hardcode credentials in this file!
 * 
 * Environment variables required:
 * - TEST_USER_EMAIL: Email for test user authentication
 * - TEST_USER_PASSWORD: Password for test user authentication
 * 
 * Setup:
 * 1. Copy .env.example to .env
 * 2. Configure TEST_USER_EMAIL and TEST_USER_PASSWORD with your test credentials
 * 3. Never commit .env file to version control
 */

class SecureCredentials {
    /**
     * Gets operator credentials from environment variables
     * Throws error if credentials are not properly configured
     */
  static getOperatorCredentials(): { email: string; password: string } {
        const email = process.env.TEST_USER_EMAIL;
        const password = process.env.TEST_USER_PASSWORD;

      if (!email || !password) {
              throw new Error(
                        'TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables are required.\n' +
                        'Please configure your .env file:\n' +
                        '1. Copy .env.example to .env\n' +
                        '2. Set TEST_USER_EMAIL=your-test-email@example.com\n' +
                        '3. Set TEST_USER_PASSWORD=your-test-password\n' +
                        '4. Never commit .env to version control\n\n' +
                        'For more information, see SECURITY.md'
                      );
      }

      return { email, password };
  }
}

export { SecureCredentials };
