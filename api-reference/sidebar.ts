import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "netomi-api",
    },
    {
      type: "category",
      label: "Conversations",
      link: {
        type: "doc",
        id: "conversations",
      },
      items: [
        {
          type: "doc",
          id: "create-conversation",
          label: "Start a conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "get-conversation",
          label: "Get a conversation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "send-message",
          label: "Send a message",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Agents",
      link: {
        type: "doc",
        id: "agents",
      },
      items: [
        {
          type: "doc",
          id: "list-agents",
          label: "List agents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-agent",
          label: "Get an agent",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      link: {
        type: "doc",
        id: "webhooks",
      },
      items: [
        {
          type: "doc",
          id: "create-webhook",
          label: "Register a webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "list-webhooks",
          label: "List webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "delete-webhook",
          label: "Delete a webhook",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
