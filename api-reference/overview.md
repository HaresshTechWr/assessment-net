---
id: overview
title: Overview
sidebar_position: 1
---

The Netomi REST API gives you programmatic access to agents, conversations, and webhooks.

## Base URL

```
https://api.netomi.com/v1
```

## Request format

All requests must include:

```
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

## Available endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /conversations` | Start a new conversation |
| `POST /conversations/{id}/messages` | Send a message in an existing conversation |
| `GET /conversations/{id}` | Retrieve conversation details |
| `GET /agents` | List all available agents |
| `GET /agents/{id}` | Get details for a specific agent |
| `POST /webhooks` | Register a webhook endpoint |
| `DELETE /webhooks/{id}` | Remove a webhook |

## Response format

All responses return JSON with a consistent structure:

```json
{
  "data": { },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

## Rate limits

| Plan | Requests per minute |
|------|-------------------|
| Starter | 60 |
| Growth | 300 |
| Enterprise | Custom |

When you exceed the limit, the API returns `429 Too Many Requests`.

## Pagination

List endpoints support cursor-based pagination:

```bash
GET /agents?limit=20&cursor=agent_abc123
```

Response includes a `next_cursor` field when more results exist.
