# Email Checker

Simple website that checks:
- email syntax
- domain format
- MX records

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm start
```

Open http://localhost:3000

## Important
An MX check only proves that the domain has mail infrastructure. It does **not** prove that a specific mailbox exists. Many providers block SMTP probing or accept all recipients.

For production, add rate limiting, authentication, logging controls, and abuse protection.
