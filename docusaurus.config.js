// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  themes: [
  [
    require.resolve('@easyops-cn/docusaurus-search-local'),
    {
      hashed: true,
      docsRouteBasePath: ['/docs', '/api', '/sdk'], // include both doc instances
      indexBlog: false,
      language: ['en'],
    },
  ],
],

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
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
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Netomi',
        logo: {
          alt: 'Netomi Docs Logo',
          src: 'img/logo.svg',
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
          {to: '/changelog', label: 'Changelog', position: 'left'},
          {
            type: 'doc',
            docId: 'faq',
            docsPluginId: 'help-center',
            position: 'left',
            label: 'Help Center',
          },
          { type: 'search', position: 'right' },
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
