---
id: chat-widget
title: Embed the Chat Widget
sidebar_position: 1
---

# Embed the Chat Widget

Add the Netomi chat widget to your website in under 10 minutes.

## Prerequisites

- A Netomi workspace with at least one active agent
- Your **widget ID** from **Settings → Channels → Web** in the dashboard

## Install the widget

Paste this snippet just before your closing `</body>` tag:

```html
<script>
  (function (w, d, id) {
    w.NetomiSettings = { widgetId: id };
    var s = d.createElement('script');
    s.src = 'https://cdn.netomi.com/widget/v1/widget.js';
    s.async = true;
    d.body.appendChild(s);
  })(window, document, 'YOUR_WIDGET_ID');
</script>
```

## Identify the user

Pass user details so the agent can personalize replies:

```javascript
window.Netomi('identify', {
  userId: 'user_001',
  email: 'jane@example.com',
  name: 'Jane Doe',
  metadata: { plan: 'pro' },
});
```

## Customize appearance

```javascript
window.Netomi('config', {
  position: 'bottom-right',
  primaryColor: '#0a84ff',
  launcherIcon: 'https://your-cdn.com/icon.png',
});
```

## Programmatic control

| Method | Description |
|--------|-------------|
| `Netomi('open')` | Open the widget |
| `Netomi('close')` | Close the widget |
| `Netomi('reset')` | End the current conversation |

## Next steps

- [Handoff to a Human Agent](./handoff-to-agent.md)
- [Webhooks](/api-reference/webhooks) — react to widget events server-side
