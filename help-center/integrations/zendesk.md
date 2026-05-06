---
id: zendesk
title: Zendesk
sidebar_position: 1
---

# Zendesk

Connect Netomi to Zendesk for knowledge sync and human-agent handoff.

## What this integration does

- **Knowledge sync** — imports Help Center articles into the agent's knowledge base.
- **Handoff** — creates Zendesk tickets when the AI agent escalates.
- **Transcript sync** — full conversation history attached to each ticket.

## Prerequisites

- Zendesk Suite (Team plan or higher)
- Zendesk admin access to generate an API token
- Netomi workspace admin role

## Setup

1. In Zendesk, go to **Admin Center → Apps and Integrations → APIs → Zendesk API** and generate a token.
2. In Netomi, go to **Integrations → Zendesk** and click **Connect**.
3. Enter your subdomain (`acme` for `acme.zendesk.com`), admin email, and API token.
4. Select the brands and Help Centers to sync.

## Configuration

| Setting | Description |
|---------|-------------|
| `Sync schedule` | Manual, hourly, or daily |
| `Default group` | Zendesk group that receives handoff tickets |
| `Ticket priority` | Default priority for handoff tickets |
| `Custom fields` | Map Netomi metadata to Zendesk custom fields |

## Webhook events sent to Zendesk

- `conversation.handoff` → creates a new ticket
- `conversation.resolved` → closes the linked ticket
- `message.received` → appends to the ticket's internal note

## Troubleshooting

| Error | Fix |
|-------|-----|
| `401 Unauthorized` | Regenerate the API token and reconnect |
| Articles not syncing | Verify the Help Center is set to public |
| Tickets not creating | Check the assigned group has live agents |
