---
id: environments
title: Environments
sidebar_position: 2
---

# Environments

Netomi provides isolated environments for development and production.

## Available environments

| Environment | Base URL | Purpose |
|-------------|----------|---------|
| `sandbox` | `https://api.sandbox.netomi.com/v1` | Free testing, no billing, isolated agents |
| `production` | `https://api.netomi.com/v1` | Live traffic, billed per conversation |

## API keys are environment-scoped

A `live` key only works against production; a `test` key only works against sandbox. See [Authentication](/docs/getting-started/authentication).

## Promoting an agent to production

1. Build and test the agent in sandbox.
2. In the dashboard, open the agent and click **Promote to Production**.
3. Production receives a snapshot — sandbox changes do not auto-propagate.

## Data isolation

- Conversations, users, and knowledge are **completely separate** between environments.
- Webhooks are configured per environment.
- Analytics dashboards default to production but can be filtered to sandbox.

## CI/CD recommendations

- Use sandbox for integration tests.
- Run a smoke test against production after every deploy of your application.
- Store keys as environment variables, never in source control.
