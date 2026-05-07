---
id: key-concepts
title: Key Concepts
sidebar_position: 4
---

# Key Concepts

Understand the core building blocks of the Netomi platform before you start building.

## Core entities

| Entity | Description |
|--------|-------------|
| `Agent` | An AI bot configured to handle a specific use case (support, sales, etc.) |
| `Conversation` | A threaded exchange between an end user and an agent |
| `Message` | A single turn in a conversation, from either the user or the agent |
| `Knowledge` | Articles, FAQs, and documents the agent uses to answer questions |
| `Webhook` | An HTTP callback Netomi sends when conversation events occur |

## How a conversation flows

1. A user sends a message via your chat widget, app, or channel integration.
2. Netomi routes the message to the configured agent.
3. The agent uses its training and knowledge sources to generate a reply.
4. The reply is returned synchronously and (optionally) emitted as a webhook event.
5. If the agent cannot resolve the issue, it escalates to a human agent via handoff.

## Channels

Netomi supports the following channels out of the box:

- Web chat widget
- Email
- Voice
- WhatsApp / SMS
- Slack, Microsoft Teams
- Custom (via REST API)

## Environments

| Environment | Purpose |
|-------------|---------|
| `sandbox` | Free testing — no real users, isolated agents |
| `production` | Live traffic — billed per conversation |

## Next steps

- [Quickstart](./quickstart.md) — make your first API call
- [Authentication](./authentication.md) — set up API keys
