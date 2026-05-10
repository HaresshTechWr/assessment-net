import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/changelog',
    component: ComponentCreator('/changelog', '992'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '53a'),
    exact: true
  },
  {
    path: '/playground',
    component: ComponentCreator('/playground', '4ec'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/api-reference',
    component: ComponentCreator('/api-reference', '797'),
    routes: [
      {
        path: '/api-reference',
        component: ComponentCreator('/api-reference', 'b69'),
        routes: [
          {
            path: '/api-reference',
            component: ComponentCreator('/api-reference', '52b'),
            routes: [
              {
                path: '/api-reference/agents',
                component: ComponentCreator('/api-reference/agents', '0ed'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/conversations',
                component: ComponentCreator('/api-reference/conversations', 'a91'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/create-conversation',
                component: ComponentCreator('/api-reference/create-conversation', '8fe'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/create-webhook',
                component: ComponentCreator('/api-reference/create-webhook', '7e9'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/delete-webhook',
                component: ComponentCreator('/api-reference/delete-webhook', 'faf'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/error-codes',
                component: ComponentCreator('/api-reference/error-codes', 'c84'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/get-agent',
                component: ComponentCreator('/api-reference/get-agent', '35d'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/get-conversation',
                component: ComponentCreator('/api-reference/get-conversation', 'ae1'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/list-agents',
                component: ComponentCreator('/api-reference/list-agents', '973'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/list-webhooks',
                component: ComponentCreator('/api-reference/list-webhooks', 'c01'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/netomi-api',
                component: ComponentCreator('/api-reference/netomi-api', 'f1b'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/overview',
                component: ComponentCreator('/api-reference/overview', '933'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/send-message',
                component: ComponentCreator('/api-reference/send-message', 'f87'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api-reference/webhooks',
                component: ComponentCreator('/api-reference/webhooks', '91b'),
                exact: true,
                sidebar: "apiSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '185'),
    routes: [
      {
        path: '/docs/1.0.0',
        component: ComponentCreator('/docs/1.0.0', 'e1b'),
        routes: [
          {
            path: '/docs/1.0.0',
            component: ComponentCreator('/docs/1.0.0', '98a'),
            routes: [
              {
                path: '/docs/1.0.0/getting-started/authentication',
                component: ComponentCreator('/docs/1.0.0/getting-started/authentication', '726'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1.0.0/getting-started/key-concepts',
                component: ComponentCreator('/docs/1.0.0/getting-started/key-concepts', 'ed5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1.0.0/getting-started/quickstart',
                component: ComponentCreator('/docs/1.0.0/getting-started/quickstart', '50d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1.0.0/guides/chat-widget',
                component: ComponentCreator('/docs/1.0.0/guides/chat-widget', '198'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1.0.0/guides/handoff-to-agent',
                component: ComponentCreator('/docs/1.0.0/guides/handoff-to-agent', 'f2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1.0.0/guides/sync-knowledge-base',
                component: ComponentCreator('/docs/1.0.0/guides/sync-knowledge-base', 'a8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1.0.0/introduction',
                component: ComponentCreator('/docs/1.0.0/introduction', 'cf4'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/docs/next',
        component: ComponentCreator('/docs/next', '43a'),
        routes: [
          {
            path: '/docs/next',
            component: ComponentCreator('/docs/next', '829'),
            routes: [
              {
                path: '/docs/next/getting-started/authentication',
                component: ComponentCreator('/docs/next/getting-started/authentication', 'e85'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/next/getting-started/key-concepts',
                component: ComponentCreator('/docs/next/getting-started/key-concepts', '6c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/next/getting-started/quickstart',
                component: ComponentCreator('/docs/next/getting-started/quickstart', '9ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/next/guides/chat-widget',
                component: ComponentCreator('/docs/next/guides/chat-widget', 'bf4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/next/guides/handoff-to-agent',
                component: ComponentCreator('/docs/next/guides/handoff-to-agent', '84c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/next/guides/sync-knowledge-base',
                component: ComponentCreator('/docs/next/guides/sync-knowledge-base', '851'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/next/introduction',
                component: ComponentCreator('/docs/next/introduction', '5f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/help-center',
    component: ComponentCreator('/help-center', '2a9'),
    routes: [
      {
        path: '/help-center',
        component: ComponentCreator('/help-center', '877'),
        routes: [
          {
            path: '/help-center',
            component: ComponentCreator('/help-center', '503'),
            routes: [
              {
                path: '/help-center/faq',
                component: ComponentCreator('/help-center/faq', '140'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/integrations/salesforce',
                component: ComponentCreator('/help-center/integrations/salesforce', '653'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/integrations/slack',
                component: ComponentCreator('/help-center/integrations/slack', '78e'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/integrations/zendesk',
                component: ComponentCreator('/help-center/integrations/zendesk', 'd41'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/platform/environments',
                component: ComponentCreator('/help-center/platform/environments', '237'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/platform/rate-limits',
                component: ComponentCreator('/help-center/platform/rate-limits', 'ca2'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/platform/versioning',
                component: ComponentCreator('/help-center/platform/versioning', 'fc1'),
                exact: true,
                sidebar: "helpSidebar"
              },
              {
                path: '/help-center/troubleshooting',
                component: ComponentCreator('/help-center/troubleshooting', '9ae'),
                exact: true,
                sidebar: "helpSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/sdks',
    component: ComponentCreator('/sdks', '1eb'),
    routes: [
      {
        path: '/sdks',
        component: ComponentCreator('/sdks', '302'),
        routes: [
          {
            path: '/sdks',
            component: ComponentCreator('/sdks', '473'),
            routes: [
              {
                path: '/sdks/examples',
                component: ComponentCreator('/sdks/examples', 'c05'),
                exact: true,
                sidebar: "sdksSidebar"
              },
              {
                path: '/sdks/javascript',
                component: ComponentCreator('/sdks/javascript', 'a04'),
                exact: true,
                sidebar: "sdksSidebar"
              },
              {
                path: '/sdks/overview',
                component: ComponentCreator('/sdks/overview', '1b6'),
                exact: true,
                sidebar: "sdksSidebar"
              },
              {
                path: '/sdks/python',
                component: ComponentCreator('/sdks/python', '034'),
                exact: true,
                sidebar: "sdksSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
