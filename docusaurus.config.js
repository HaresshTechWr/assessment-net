// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Netomi Developer Docs',
  tagline: 'Build with the Netomi Agentic AI Platform',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  themes: [
    'docusaurus-theme-openapi-docs',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: ['/docs', '/api-reference', '/sdks', '/help-center'],
        indexBlog: false,
        language: ['en'],
      },
    ],
  ],

  url: 'https://your-netlify-url.netlify.app',
  baseUrl: '/',

  organizationName: 'HaresshTechWr',
  projectName: 'assessment-net',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          lastVersion: '1.0.0',
          versions: {
            current: {
              label: 'Next 🚧',
              path: 'next',
            },
            '1.0.0': {
              label: '1.0.0',
              path: '1.0.0',
            },
          },
          editUrl: 'https://github.com/HaresshTechWr/assessment-net/tree/main/',
        },
        blog: {
          path: 'blog',
          routeBasePath: 'changelog',
          blogTitle: 'Changelog',
          blogDescription: 'Product updates and release notes',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/HaresshTechWr/assessment-net/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sdks',
        path: 'sdks',
        routeBasePath: 'sdks',
        sidebarPath: './sidebarsSdks.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api-reference',
        path: 'api-reference',
        routeBasePath: 'api-reference',
        sidebarPath: './sidebarsApi.js',
        docItemComponent: '@theme/ApiItem',
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'api-reference',
        config: {
          netomi: {
            specPath: 'openapi.yaml',
            outputDir: 'api-reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'help-center',
        path: 'help-center',
        routeBasePath: 'help-center',
        sidebarPath: './sidebarsHelp.js',
      },
    ],
  ],

  themeConfig:
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Netomi',
        logo: {
          alt: 'Netomi Docs Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'overview',
            docsPluginId: 'sdks',
            position: 'left',
            label: 'SDKs',
          },
          {
            type: 'doc',
            docId: 'overview',
            docsPluginId: 'api-reference',
            position: 'left',
            label: 'API Reference',
          },
          {
            label: 'More',
            position: 'left',
            items: [
              {to: '/changelog', label: 'Changelog'},
              {to: '/help-center/faq', label: 'Help Center'},
            ],
          },
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'default',
            position: 'right',
            className: 'netomi-version-dropdown',
          },
          {type: 'search', position: 'right'},
          {
            href: 'https://app.netomi.com',
            label: 'Sign in',
            position: 'right',
            className: 'navbar-signin-button',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              {label: 'Documentation', to: '/docs/introduction'},
              {label: 'SDKs', to: '/sdks/overview'},
              {label: 'API Reference', to: '/api-reference/overview'},
              {label: 'Changelog', to: '/changelog'},
            ],
          },
          {
            title: 'Support',
            items: [
              {label: 'Help Center', to: '/help-center/faq'},
              {label: 'Troubleshooting', to: '/help-center/troubleshooting'},
            ],
          },
          {
            title: 'Company',
            items: [
              {label: 'Sign in', href: 'https://app.netomi.com'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Netomi. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;