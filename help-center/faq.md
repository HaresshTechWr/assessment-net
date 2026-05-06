---
id: faq
title: FAQ
sidebar_position: 91
---

# FAQ

Answers to questions developers ask most often.

## General

**Is there a free tier?**
Yes — sandbox is free and includes 1,000 sandbox conversations per month.

**What languages do agents support?**
40+ languages out of the box. The agent auto-detects the user's language from the first message.

**Where is data stored?**
By default, in our US region. Enterprise customers can choose EU, UK, or APAC residency.

## API

**Are there official SDKs?**
Yes — JavaScript and Python today. See the [SDK Overview](/sdks/overview).

**Can I use the API from the browser?**
Not with a `live` key. Use the [chat widget](/docs/guides/chat-widget) or proxy requests through your backend.

**Does the API support streaming responses?**
Yes — `POST /v1/conversations` accepts `Accept: text/event-stream` for token-by-token replies.

**How do I test webhooks locally?**
Use a tunnel like ngrok or Cloudflare Tunnel and register the public URL as your webhook endpoint.

## Billing

**How are conversations counted?**
A conversation is one continuous thread between a user and an agent. Multiple messages within the same thread count as one conversation.

**Do test (sandbox) conversations count toward billing?**
No.

## Compliance

**Is Netomi SOC 2 compliant?**
Yes — SOC 2 Type II. Reports available under NDA via your account manager.

**Is Netomi HIPAA compliant?**
HIPAA is available on Enterprise plans with a signed BAA.

**How is PII handled?**
PII can be redacted automatically before being passed to LLMs. Configure rules in **Settings → Privacy**.

## Still have questions?

- Read the [Troubleshooting](./troubleshooting.md) guide
- Email `support@netomi.com`
