---
id: conversations
title: Conversations
sidebar_position: 3
---

# Conversations

Endpoints for starting, continuing, and retrieving conversations.

## Create a conversation

```bash
POST /v1/conversations
```

**Request body:**

```json
{
  "agent_id": "agent_abc123",
  "message": "I need help tracking my order",
  "user_id": "user_001",
  "metadata": { "order_id": "445566" }
}
```

**Response:**

```json
{
  "conversation_id": "conv_xyz789",
  "status": "active",
  "reply": {
    "text": "Sure! Please share your order number.",
    "confidence": 0.97
  }
}
```

## Send a message

```bash
POST /v1/conversations/{conversation_id}/messages
```

**Request body:**

```json
{
  "message": "My order number is 445566"
}
```

## Get a conversation

```bash
GET /v1/conversations/{conversation_id}
```

Returns the full message history, agent metadata, and current status.

## Conversation status

| Status | Meaning |
|--------|---------|
| `active` | Conversation is in progress with an AI agent |
| `handoff` | Escalated to a human agent |
| `resolved` | Closed by the user or agent |
| `expired` | Inactive for 24 hours |

## Errors

See [Error Codes](./error-codes.md) for the full list.
