---
id: authentication
title: Authentication
sidebar_position: 2
---

# Authentication

All Netomi API requests require authentication using a Bearer token.

## API keys

Include your API key in the `Authorization` header of every request:

```bash
Authorization: Bearer YOUR_API_KEY
```

## Getting your API key

1. Log in to the [Netomi Dashboard](https://app.netomi.com)
2. Go to **Settings → API Keys**
3. Click **Generate New Key**
4. Copy and store it securely — it will not be shown again

## Key types

| Type | Use case |
|------|----------|
| `live` | Production environments |
| `test` | Development and testing — no real agents triggered |

## Security best practices

- Never expose your API key in client-side code or public repositories
- Rotate keys regularly from the dashboard
- Use environment variables to store keys in your application

```bash
# Example: store in environment variable
export NETOMI_API_KEY=your_key_here
```

## Error responses

If your key is missing or invalid, the API returns:

```json
{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}
```

See [Error Codes](/api-reference/error-codes) for the full list.

