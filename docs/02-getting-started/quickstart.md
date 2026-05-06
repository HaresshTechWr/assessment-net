---
id: quickstart
title: Quickstart
sidebar_position: 1
---

# Quickstart

Get up and running with the Netomi API in under 5 minutes.

### Step 1: Get your API key

Log in to your Netomi dashboard and navigate to **Settings → API Keys**. Copy your key — you will use it in every request.

## Step 2: Send your first message

Use the `/v1/conversations` endpoint to start a conversation with an AI agent.

```bash
curl -X POST https://api.netomi.com/v1/conversations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "message": "I need help tracking my order",
    "user_id": "user_001"
  }'
```

**Example response:**

```json
{
  "conversation_id": "conv_xyz789",
  "status": "active",
  "reply": {
    "text": "Sure! Please share your order number and I'll look that up for you.",
    "confidence": 0.97
  }
}
```

## Step 3: Continue the conversation

Pass the `conversation_id` to continue the same thread:

```bash
curl -X POST https://api.netomi.com/v1/conversations/conv_xyz789/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "My order number is 445566"
  }'
```

## What's next?

- [Authentication](../../authentication) — understand token types and expiry
- [SDK](/sdks/overview) — use our JavaScript or Python SDK instead of raw HTTP
- [API Reference](/api-reference/overview) — full list of endpoints
