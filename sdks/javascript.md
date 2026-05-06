---
id: javascript
title: JavaScript SDK
sidebar_position: 2
---

# JavaScript SDK

The official Node.js / TypeScript client for the Netomi API.

## Installation

```bash
npm install @netomi/sdk
```

## Initialize the client

```javascript
import { NetomiClient } from '@netomi/sdk';

const client = new NetomiClient({
  apiKey: process.env.NETOMI_API_KEY,
  environment: 'production', // or 'sandbox'
});
```

## Common operations

**Start a conversation:**

```javascript
const conversation = await client.conversations.create({
  agentId: 'agent_abc123',
  message: 'Hello',
  userId: 'user_001',
});
```

**Send a follow-up:**

```javascript
const reply = await client.conversations.sendMessage(conversation.id, {
  message: 'My order number is 445566',
});
```

**List agents:**

```javascript
for await (const agent of client.agents.list()) {
  console.log(agent.name);
}
```

## Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | — | Required. Your API key |
| `environment` | string | `production` | `production` or `sandbox` |
| `timeout` | number | `30000` | Request timeout in ms |
| `maxRetries` | number | `3` | Auto-retry on 5xx and 429 |

## Error handling

```javascript
import { NetomiAPIError } from '@netomi/sdk';

try {
  await client.conversations.create({ /* ... */ });
} catch (err) {
  if (err instanceof NetomiAPIError) {
    console.error(err.code, err.message);
  }
}
```

## TypeScript

The SDK ships with full type definitions — no `@types/` package required.
