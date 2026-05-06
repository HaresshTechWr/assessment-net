---
id: webhooks
title: Webhooks
sidebar_position: 6
---

# Webhooks

Subscribe to conversation events delivered to an HTTPS endpoint you control.

## Register a webhook

```bash
POST /v1/webhooks
```

**Request body:**

```json
{
  "url": "https://your-app.com/netomi/webhook",
  "events": ["conversation.created", "message.received", "conversation.handoff"],
  "secret": "whsec_your_signing_secret"
}
```

## Event types

| Event | When it fires |
|-------|---------------|
| `conversation.created` | A new conversation starts |
| `message.received` | The user sends a message |
| `message.sent` | The agent sends a reply |
| `conversation.handoff` | The conversation escalates to a human |
| `conversation.resolved` | The conversation closes |

## Payload format

```json
{
  "event": "message.received",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "conversation_id": "conv_xyz789",
    "message": { "text": "Hello", "user_id": "user_001" }
  }
}
```

## Signature verification

Each request includes an `X-Netomi-Signature` header. Verify it using HMAC-SHA256 with your signing secret:

```javascript
const crypto = require('crypto');
const expected = crypto
  .createHmac('sha256', process.env.NETOMI_WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex');
const valid = expected === req.headers['x-netomi-signature'];
```

## Retries

Failed deliveries (non-2xx responses) are retried with exponential backoff for up to 24 hours.

## Delete a webhook

```bash
DELETE /v1/webhooks/{webhook_id}
```
