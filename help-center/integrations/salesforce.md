---
id: salesforce
title: Salesforce
sidebar_position: 2
---

# Salesforce

Integrate Netomi with Salesforce Service Cloud for knowledge and case handoff.

## What this integration does

- **Knowledge sync** — pulls Salesforce Knowledge articles into the agent.
- **Case creation** — opens a Case on handoff and links the conversation transcript.
- **Live Agent handoff** — routes to a Service Cloud queue.

## Prerequisites

- Salesforce Service Cloud
- A Salesforce Connected App with `api` and `refresh_token` scopes
- Netomi workspace admin role

## Setup

1. In Salesforce, create a Connected App: **Setup → App Manager → New Connected App**.
2. Enable OAuth Settings, set the callback URL to `https://app.netomi.com/oauth/salesforce`.
3. In Netomi, go to **Integrations → Salesforce** and click **Connect**.
4. Authorize via the Salesforce login flow.

## Configuration

| Setting | Description |
|---------|-------------|
| `Knowledge object` | Which Knowledge object to sync (default: `Knowledge__kav`) |
| `Case record type` | Record type used for handoff cases |
| `Default queue` | Salesforce queue receiving handoff cases |
| `Field mapping` | Map Netomi metadata to Case custom fields |

## Field mapping example

| Netomi field | Salesforce Case field |
|--------------|----------------------|
| `user.email` | `SuppliedEmail` |
| `conversation.summary` | `Description` |
| `conversation.id` | `Netomi_Conversation_Id__c` |

## Limitations

- Salesforce API limits apply — sync large KBs during off-hours.
- Multi-org Salesforce setups require one Netomi workspace per org.
