---
id: error-codes
title: Error Codes
sidebar_position: 2
---

# Error Codes

All API errors follow a consistent JSON structure:

```json
{
  "error": "error_code",
  "message": "A human-readable description of the error",
  "request_id": "req_abc123"
}
```

## HTTP status codes

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `400` | Bad request — check your request body |
| `401` | Unauthorized — invalid or missing API key |
| `403` | Forbidden — your plan does not support this action |
| `404` | Not found — the resource does not exist |
| `429` | Too many requests — you have hit the rate limit |
| `500` | Internal server error — something went wrong on our end |

## Common error codes

| Code | Description |
|------|-------------|
| `unauthorized` | API key is missing or invalid |
| `invalid_request` | Required fields are missing or malformed |
| `agent_not_found` | The specified `agent_id` does not exist |
| `conversation_closed` | The conversation has already ended |
| `rate_limit_exceeded` | Too many requests — slow down and retry |
| `internal_error` | Unexpected server error — contact support if it persists |

## Handling errors

```javascript
const response = await fetch('https://api.netomi.com/v1/conversations', {
  method: 'POST',
  headers: { Authorization: `Bearer ${API_KEY}` },
  body: JSON.stringify({ agent_id, message, user_id })
});

if (!response.ok) {
  const error = await response.json();
  console.error(`Error ${response.status}: ${error.message}`);
}
```
