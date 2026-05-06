---
id: knowledge
title: Knowledge
sidebar_position: 5
---

# Knowledge

Endpoints for managing the knowledge base your agents use to answer questions.

## List knowledge sources

```bash
GET /v1/knowledge/sources
```

**Response:**

```json
{
  "data": [
    {
      "id": "src_abc",
      "type": "zendesk",
      "url": "https://acme.zendesk.com",
      "last_synced": "2025-01-15T10:00:00Z",
      "article_count": 142
    }
  ]
}
```

## Add an article

```bash
POST /v1/knowledge/articles
```

**Request body:**

```json
{
  "title": "How to reset your password",
  "body": "To reset your password, visit ...",
  "tags": ["account", "auth"]
}
```

## Trigger a sync

```bash
POST /v1/knowledge/sources/{source_id}/sync
```

Re-imports articles from the configured source. Returns a sync job ID for status polling.

## Source types

| Type | Description |
|------|-------------|
| `zendesk` | Zendesk Help Center |
| `salesforce` | Salesforce Knowledge |
| `confluence` | Confluence spaces |
| `url` | Public URL crawler |
| `manual` | Articles created via API or dashboard |
