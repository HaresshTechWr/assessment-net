---
id: rate-limits
title: Rate Limits
sidebar_position: 1
---

# Rate Limits

Limits applied per workspace to keep the API responsive for all customers.

## Default limits

| Plan | Requests / minute | Concurrent conversations |
|------|------------------|--------------------------|
| Starter | 60 | 50 |
| Growth | 300 | 500 |
| Enterprise | Custom | Custom |

## Response headers

Every response includes:

```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 287
X-RateLimit-Reset: 1737028800
```

## When you hit the limit

The API returns `429 Too Many Requests`:

```json
{
  "error": "rate_limited",
  "message": "Too many requests. Retry after 12 seconds.",
  "retry_after": 12
}
```

## Best practices

- **Honor `Retry-After`** — exponential backoff with jitter.
- **Batch requests** where possible (e.g., bulk knowledge imports).
- **Cache** read-heavy responses such as `GET /agents`.
- For high-volume webhooks, ensure your endpoint returns `2xx` within 5 seconds.

## Increasing your limit

Contact your account manager or email `support@netomi.com` with your projected QPS and use case.
