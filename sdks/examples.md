---
id: examples
title: Examples
sidebar_position: 4
---

# Examples

Common integration patterns using the Netomi SDK.

## Start a conversation

```javascript
import { NetomiClient } from '@netomi/sdk';

const client = new NetomiClient({ apiKey: process.env.NETOMI_API_KEY });

const conversation = await client.conversations.create({
  agentId: 'agent_abc123',
  message: 'Where is my order?',
  userId: 'user_001'
});

console.log('Agent replied:', conversation.reply.text);
console.log('Conversation ID:', conversation.conversation_id);
```

## Continue an existing conversation

```javascript
const reply = await client.conversations.sendMessage('conv_xyz789', {
  message: 'My order number is 445566'
});

console.log(reply.text);
```

## Handle a webhook event

Set up an Express endpoint to receive real-time events from Netomi:

```javascript
import express from 'express';

const app = express();
app.use(express.json());

app.post('/webhooks/netomi', (req, res) => {
  const { event, data } = req.body;

  if (event === 'conversation.resolved') {
    console.log(`Conversation ${data.conversation_id} was resolved`);
    // update your CRM, send a follow-up email, etc.
  }

  res.sendStatus(200);
});

app.listen(3000);
```

## List available agents

```javascript
const agents = await client.agents.list();

agents.forEach(agent => {
  console.log(`${agent.id}: ${agent.name}`);
});
```

## Error handling

```javascript
import { NetomiError } from '@netomi/sdk';

try {
  const conversation = await client.conversations.create({
    agentId: 'invalid_id',
    message: 'Hello',
    userId: 'user_001'
  });
} catch (err) {
  if (err instanceof NetomiError) {
    console.error(`API error ${err.status}: ${err.message}`);
  } else {
    throw err;
  }
}
```
