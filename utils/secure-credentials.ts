import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Simple encryption/decryption utility for sensitive data
 */
class SecureCredentials {
  private static readonly ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-me';

  /**
   * Encrypts a string using AES encryption
   */
  static encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.ENCRYPTION_KEY).toString();
  }

  /**
   * Decrypts an encrypted string
   */
  static decrypt(encryptedText: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Gets credentials from environment variables or encrypted fallback
   */
  static getOperatorCredentials(): { email: string; password: string } {
    // Priority 1: Environment variables (most secure)
    if (process.env.TEST_USER_EMAIL && process.env.TEST_USER_PASSWORD) {
      return {
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD
      };
    }

    // Priority 2: Encrypted fallback (if env vars not available)
    const encryptedCredentials = {
      // These are encrypted versions generated with npm run encrypt-credentials
      email: 'U2FsdGVkX19f3uQClDA+9V2QgBcHGWphfGoILrp2gxk=',
      password: 'U2FsdGVkX18Sfu8tS0uOV395565rElY7VR2x/34BtaA='
    };

    try {
      return {
        email: this.decrypt(encryptedCredentials.email),
        password: this.decrypt(encryptedCredentials.password)
      };
    } catch (error) {
      console.warn('Failed to decrypt credentials, using fallback');
      // Priority 3: Fallback for development (least secure)
      return {
        email: 'test-user@example.com',
        password: 'test-password'
      };
    }
  }
}

export { SecureCredentials };
