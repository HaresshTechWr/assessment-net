---
id: slack
title: Slack
sidebar_position: 3
---

# Slack

Deploy a Netomi agent into Slack for internal employee support.

## What this integration does

- Lets employees DM a Netomi-powered bot inside Slack
- Posts handoff requests to a designated channel for human agents
- Shares conversation transcripts via Slack threads

## Prerequisites

- A Slack workspace with admin permission to install apps
- A Netomi agent configured for the use case

## Setup

1. In Netomi, go to **Integrations → Slack** and click **Add to Slack**.
2. Authorize the OAuth flow with your Slack workspace.
3. Pick the agent that should handle DMs.
4. Choose a handoff channel (e.g., `#it-support`).

## Slash commands

| Command | Description |
|---------|-------------|
| `/netomi reset` | End the current conversation |
| `/netomi handoff` | Force escalation to a human |
| `/netomi status` | Show conversation ID and agent name |

## Channel routing

Map Slack channels to specific agents:

| Channel | Agent |
|---------|-------|
| `#it-support` | IT Helpdesk Bot |
| `#hr-questions` | HR Bot |
| `#sales-ops` | Sales Ops Bot |

## Limitations

- Each Slack workspace can connect to only one Netomi workspace.
- Threaded replies do not support rich attachments yet.
