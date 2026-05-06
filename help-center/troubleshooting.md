---
id: troubleshooting
title: Troubleshooting
sidebar_position: 90
---

# Troubleshooting

Quick fixes for the most common issues.

## Authentication

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `401 Unauthorized` | Missing or invalid API key | Verify the `Authorization: Bearer` header and key value |
| `401` only in production | Using a `test` key against production | Generate a `live` key from the dashboard |
| `403 Forbidden` | Key lacks scope for the endpoint | Regenerate with the required scopes |

## Conversations

| Symptom | Fix |
|---------|-----|
| Agent returns "I don't know" | Check the agent has knowledge sources synced and is trained |
| Conversation stuck in `handoff` | Verify your contact center integration is connected and the queue has live agents |
| `404` on conversation ID | Conversations expire after 24 hours of inactivity — start a new one |

## Webhooks

| Symptom | Fix |
|---------|-----|
| Events not arriving | Confirm the URL is HTTPS and returns `2xx` within 5 seconds |
| Signature mismatch | Ensure you verify against the **raw** request body, not parsed JSON |
| Duplicate deliveries | Webhooks are at-least-once — make your handler idempotent |

## Rate limits

If you hit `429`, see [Rate Limits](./platform/rate-limits.md) and implement exponential backoff with jitter.

## SDK issues

- **Node.js**: ensure Node 18+ is installed
- **Python**: ensure Python 3.9+ is installed
- For TypeScript type errors after an upgrade, run `npm rebuild`

## Still stuck?

- Check the [FAQ](./faq.md)
- Email `support@netomi.com` with your `request_id` (returned in `meta.request_id`)
