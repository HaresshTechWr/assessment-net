---
id: overview
title: Overview
sidebar_position: 1
---

# SDK Overview

Netomi provides official SDKs for JavaScript and Python. The SDKs wrap the REST API and handle authentication, retries, and error parsing for you.

## Available SDKs

| Language | Package | Status |
|----------|---------|--------|
| JavaScript / Node.js | `@netomi/sdk` | Stable |
| Python | `netomi-python` | Stable |

## When to use the SDK vs. the API directly

Use the **SDK** when:
- You are building a backend service in Node.js or Python
- You want automatic retry and error handling
- You prefer typed responses over raw JSON

Use the **REST API directly** when:
- You are using a language without an official SDK
- You are making simple one-off requests (e.g., from a shell script or Postman)

## Installation

**JavaScript:**

```bash
npm install @netomi/sdk
```

**Python:**

```bash
pip install netomi-python
```

## Quick example

**JavaScript:**

```javascript
import { NetomiClient } from '@netomi/sdk';

const client = new NetomiClient({ apiKey: process.env.NETOMI_API_KEY });

const conversation = await client.conversations.create({
  agentId: 'agent_abc123',
  message: 'I need help with my account',
  userId: 'user_001'
});

console.log(conversation.reply.text);
```

**Python:**

```python
from netomi import NetomiClient

client = NetomiClient(api_key=os.environ["NETOMI_API_KEY"])

conversation = client.conversations.create(
    agent_id="agent_abc123",
    message="I need help with my account",
    user_id="user_001"
)

print(conversation.reply.text)
```

## Next steps

- [JavaScript SDK](./javascript)
- [Python SDK](./python)
- [Examples](./examples)
