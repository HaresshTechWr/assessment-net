---
id: versioning
title: API Versioning
sidebar_position: 3
---

# API Versioning

How Netomi versions the REST API and what to expect when upgrading.

## Versioning scheme

The API uses **URL-based major versions**:

```
https://api.netomi.com/v1/conversations
```

The current major version is **v1**.

## What is a breaking change

| Change | Breaking? |
|--------|-----------|
| Adding a new endpoint | No |
| Adding an optional field to a response | No |
| Adding a new event type | No |
| Removing a field | Yes |
| Renaming a field | Yes |
| Changing field types | Yes |
| Changing required request fields | Yes |

We will never make a breaking change within the same major version.

## Deprecation policy

- Deprecated endpoints are announced via the [changelog](/changelog) and the `Sunset` response header.
- Deprecated fields stay supported for **at least 12 months**.
- Major version EOL is announced **at least 18 months** in advance.

## How to detect deprecations

Responses for deprecated endpoints include:

```
Deprecation: true
Sunset: Wed, 01 Jan 2026 00:00:00 GMT
Link: <https://docs.netomi.com/changelog>; rel="deprecation"
```

## Pinning a version

Always include the major version in the URL. SDKs pin automatically — upgrade the SDK to move to a newer major.
