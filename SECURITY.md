# Security Policy

## Reporting Security Vulnerabilities
If you discover a security vulnerability in this repository, please do **not** open a public GitHub issue. Instead, please report it responsibly to the maintainers.

## Security Best Practices

### 1. Environment Configuration
**CRITICAL:** Never commit `.env` files or credentials to version control.
- Copy `.env.example` to `.env` locally
- Configure with YOUR test environment details
- Keep `.env` in your `.gitignore` (already configured)
- Never share `.env` files in public channels or repositories
     
### 2. Test Credentials
- **Use a dedicated test account** - Never use production credentials
- **Rotate test credentials regularly** - Replace expired or compromised credentials
- **Configure via environment variables only**:
  ```bash
  TEST_USER_EMAIL=your-test-email@your-domain.com
  TEST_USER_PASSWORD=your-secure-password
  ```
- Do not hardcode credentials in code, comments, or configuration files
             
### 3. Application URLs             
- All application URLs (BASE_URL, LOGIN_URL) must be configured via environment variables
- Example placeholders are provided in `.env.example`
- Configure these with YOUR test environment URLs
- Internal URLs should not appear in code
                       
### 4. Safe Code Practices                     
- [x] **DO**: Store sensitive data in environment variables
- [x] **DO**: Use `.env.example` for placeholder values only
- [x] **DO**: Add `.env` to `.gitignore`
- [x] **DO**: Review changes before committing
- [x] **DO**: Rotate credentials if accidentally exposed
                               
- [ ] **DON'T**: Commit `.env` files
- [ ] **DON'T**: Hardcode URLs or credentials
- [ ] **DON'T**: Share test credentials in issues or discussions
- [ ] **DON'T**: Use production credentials in tests
                                         
### 5. CI/CD Pipeline Security
For automated testing in CI/CD pipelines (GitHub Actions, Jenkins, etc.):
- **GitHub Actions**: Use [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
  ```yaml
  - name: Run tests
    env:
      BASE_URL: ${{ secrets.BASE_URL }}
      LOGIN_URL: ${{ secrets.LOGIN_URL }}
      TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
    run: npm test
  ```
- **Other CI/CD systems**: Use your platform's built-in secrets management
  - Never log or echo sensitive variables
  - Ensure sensitive output is masked in build logs
                                                   
### 6. Dependency Security                                                  
- Regularly update dependencies: `npm install --save`
- Check for vulnerabilities: `npm audit`
- Review dependency changes in pull requests
- Use lock files (`package-lock.json`) for reproducible builds
                                                           
### 7. Code Review Guidelines
Before committing, ensure:                                                       
- [ ] No `.env` files are staged
- [ ] No hardcoded credentials in code
- [ ] No sensitive URLs revealed
- [ ] Environment variables are used instead
- [ ] `.gitignore` is properly configured
- [ ] No sensitive data in comments
                                                             
### 8. If Credentials Are Accidentally Exposed
If you commit sensitive data:
1. **Immediately rotate the credentials** - Invalidate test accounts and regenerate access tokens
2. **Remove from git history** - Use `git filter-repo`:
   ```bash
   git filter-repo --path .env --invert-paths
   git push origin --force --all
   ```
3. **Inform the maintainers** - Report the incident for audit purposes
                                                             
## Security Scanning                                                         
This repository uses:
- Git `.gitignore` to prevent accidental credential commits
- Environment variable validation in code (errors thrown if required vars missing)
- No encryption of credentials in code (environment variables only)
                                                             
## Additional Resources
- [OWASP - Environment Variables](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [GitHub - Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [npm - Security Advisories](https://www.npmjs.com/advisories)
- [Playwright - Best Practices](https://playwright.dev/docs/best-practices)
