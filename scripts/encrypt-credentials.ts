/**
 * Utility script to encrypt credentials
 * Run this once to generate encrypted versions of your credentials
 * 
 * Usage: npx ts-node scripts/encrypt-credentials.ts
 */

import * as CryptoJS from 'crypto-js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-me';

function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

async function promptCredentials() {
  console.log('🔐 Credential Encryption Tool');
  console.log('=====================================');
  console.log('This will encrypt your credentials for secure storage.\n');

  const email = await new Promise<string>((resolve) => {
    rl.question('Enter email: ', (answer) => resolve(answer));
  });

  const password = await new Promise<string>((resolve) => {
    rl.question('Enter password: ', (answer) => resolve(answer));
  });

  const encryptedEmail = encrypt(email);
  const encryptedPassword = encrypt(password);

  console.log('\n🔒 Encrypted Credentials:');
  console.log('=====================================');
  console.log(`Email: "${encryptedEmail}"`);
  console.log(`Password: "${encryptedPassword}"`);
  
  console.log('\n📝 Update your secure-credentials.ts with these values:');
  console.log(`
const encryptedCredentials = {
  email: '${encryptedEmail}',
  password: '${encryptedPassword}'
};
  `);

  console.log('\n💡 For maximum security, also set environment variables:');
  console.log(`TEST_USER_EMAIL=${email}`);
  console.log(`TEST_USER_PASSWORD=${password}`);
  console.log('ENCRYPTION_KEY=your-secret-key');

  rl.close();
}

// Run if this script is executed directly
if (require.main === module) {
  promptCredentials().catch(console.error);
}

export { encrypt };
