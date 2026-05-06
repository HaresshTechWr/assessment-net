---
id: sync-knowledge-base
title: Sync a Knowledge Base
sidebar_position: 3
---

# Sync a Knowledge Base

Keep your agent's knowledge fresh by syncing articles from an external source.

## Supported sources

| Source | Auth method |
|--------|-------------|
| Zendesk Help Center | API token |
| Salesforce Knowledge | OAuth 2.0 |
| Confluence | API token |
| Public URL | None (crawler) |

## Connect a source

1. Go to **Knowledge → Sources** in the dashboard.
2. Click **Add Source** and pick the integration.
3. Enter credentials and the help center URL.
4. Choose a sync schedule (manual, hourly, daily).

## Trigger a manual sync via API

```bash
POST /v1/knowledge/sources/{source_id}/sync
```

**Response:**

```json
{
  "job_id": "sync_abc123",
  "status": "running",
  "started_at": "2025-01-15T10:00:00Z"
}
```

## Poll sync status

```bash
GET /v1/knowledge/jobs/{job_id}
```

**Statuses:** `running`, `completed`, `failed`.

## Filter what gets synced

```json
{
  "filters": {
    "categories": ["billing", "account"],
    "labels": ["public"],
    "exclude_drafts": true
  }
}
```

## Best practices

- Sync **incrementally** (default) rather than full re-imports for large KBs.
- Tag articles with `public` to keep internal-only docs out of agent responses.
- After a sync, retrain the agent — see the dashboard's **Training** tab.
