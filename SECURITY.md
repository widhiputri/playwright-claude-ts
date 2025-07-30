# Security Guide

This guide explains how to securely manage credentials in your Playwright test suite.

## 🔐 Security Options (Recommended Order)

### 1. Environment Variables (Most Secure)
Create a `.env` file in the project root:

```bash
# Copy .env.example to .env and update with your values
cp .env.example .env
```

Add your credentials to `.env`:
```env
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=your-password
ENCRYPTION_KEY=your-secret-key-here
```

### 2. Encrypted Credentials (Fallback)
If environment variables aren't available, use encrypted storage:

```bash
# Run the encryption tool
npm run encrypt-credentials
```

This will:
- Prompt for your credentials
- Generate encrypted versions
- Show you how to update `secure-credentials.ts`

### 3. CI/CD Integration
For continuous integration, set environment variables in your CI system:

**GitHub Actions:**
```yaml
env:
  TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
  TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
  ENCRYPTION_KEY: ${{ secrets.ENCRYPTION_KEY }}
```

**Azure DevOps:**
```yaml
variables:
  TEST_USER_EMAIL: $(TEST_USER_EMAIL)
  TEST_USER_PASSWORD: $(TEST_USER_PASSWORD)
```

## 🛡️ Security Features

### Multi-Layer Security
1. **Environment Variables** - Primary method
2. **AES Encryption** - Fallback with key
3. **Obfuscated Fallback** - Development only

### Key Rotation
```bash
# Generate new encryption key
ENCRYPTION_KEY=$(openssl rand -hex 32)

# Re-encrypt credentials with new key
npm run encrypt-credentials
```

### Best Practices

#### ✅ Do:
- Use environment variables in production
- Keep encryption keys secret
- Rotate credentials regularly
- Use different credentials for different environments
- Set up proper CI/CD secrets management

#### ❌ Don't:
- Commit `.env` files to git
- Hardcode credentials in source code
- Share encryption keys in chat/email
- Use production credentials for testing
- Store credentials in screenshots/logs

## 🔧 Implementation

### Current Implementation:
```typescript
// utils/secure-credentials.ts
const credentials = SecureCredentials.getOperatorCredentials();

// Priority:
// 1. Environment variables (TEST_USER_EMAIL, TEST_USER_PASSWORD)
// 2. Encrypted fallback values
// 3. Safe defaults for development
```

### Usage in Tests:
```typescript
import { USER_CREDENTIALS } from '../utils/constants';

// Automatically uses the most secure available method
await page.fill('[name="email"]', USER_CREDENTIALS.OPERATOR.email);
await page.fill('[name="password"]', USER_CREDENTIALS.OPERATOR.password);
```

## 🚨 Emergency Response

If credentials are compromised:

1. **Immediate Actions:**
   ```bash
   # Change passwords in the application
   # Revoke API tokens
   # Update environment variables
   # Re-encrypt with new key
   ```

2. **Update Test Suite:**
   ```bash
   # Update .env file
   # Re-run encryption tool
   # Update CI/CD secrets
   # Test with new credentials
   ```

## 📋 Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] No hardcoded credentials in source code
- [ ] Environment variables set in CI/CD
- [ ] Encryption key is secret and secure
- [ ] Different credentials for different environments
- [ ] Regular credential rotation schedule
- [ ] Security review completed

---

**Remember:** Security is everyone's responsibility. When in doubt, choose the more secure option.
