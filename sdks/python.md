---
id: python
title: Python SDK
sidebar_position: 3
---

# Python SDK

The official Python client for the Netomi API.

## Installation

```bash
pip install netomi-python
```

Requires Python 3.9+.

## Initialize the client

```python
import os
from netomi import NetomiClient

client = NetomiClient(
    api_key=os.environ["NETOMI_API_KEY"],
    environment="production",  # or "sandbox"
)
```

## Common operations

**Start a conversation:**

```python
conversation = client.conversations.create(
    agent_id="agent_abc123",
    message="Hello",
    user_id="user_001",
)
```

**Send a follow-up:**

```python
reply = client.conversations.send_message(
    conversation.id,
    message="My order number is 445566",
)
```

**List agents:**

```python
for agent in client.agents.list():
    print(agent.name)
```

## Async support

```python
from netomi import AsyncNetomiClient

async with AsyncNetomiClient(api_key="...") as client:
    conversation = await client.conversations.create(
        agent_id="agent_abc123",
        message="Hello",
        user_id="user_001",
    )
```

## Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `api_key` | str | — | Required |
| `environment` | str | `"production"` | `production` or `sandbox` |
| `timeout` | float | `30.0` | Request timeout in seconds |
| `max_retries` | int | `3` | Auto-retry on 5xx and 429 |

## Error handling

```python
from netomi import NetomiAPIError

try:
    client.conversations.create(...)
except NetomiAPIError as err:
    print(err.code, err.message)
```
