---
id: agents
title: Agents
sidebar_position: 4
---

# Agents

Endpoints for listing and inspecting AI agents configured in your workspace.

## List agents

```bash
GET /v1/agents
```

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Max results per page (default 20, max 100) |
| `cursor` | string | Pagination cursor from the previous response |
| `status` | string | Filter by `active`, `paused`, or `archived` |

**Response:**

```json
{
  "data": [
    {
      "id": "agent_abc123",
      "name": "Order Support Bot",
      "channels": ["web", "email"],
      "status": "active"
    }
  ],
  "next_cursor": "agent_def456"
}
```

## Get an agent

```bash
GET /v1/agents/{agent_id}
```

Returns the agent's configuration, training status, and connected knowledge sources.

## Update an agent

```bash
PATCH /v1/agents/{agent_id}
```

**Request body:**

```json
{
  "name": "Renamed Agent",
  "status": "paused"
}
```

## Notes

- Agent creation is currently dashboard-only — the API is read/update only.
- Agents are scoped per workspace; cross-workspace access is not supported.
