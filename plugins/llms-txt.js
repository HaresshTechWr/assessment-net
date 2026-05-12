'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Parse YAML frontmatter from a markdown file.
 * Returns { meta, body } where meta contains string-valued keys.
 */
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: text };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([\w-]+):\s*(.*?)\s*$/);
    if (m) meta[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return { meta, body: match[2] };
}

/** Strip leading numeric sort prefix from a path segment: "02-getting-started" → "getting-started" */
function stripNumericPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

/** Recursively collect all .md/.mdx files under dir, returning paths relative to dir. */
function collectMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    const abs = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      for (const sub of collectMarkdownFiles(abs)) {
        results.push(`${entry.name}/${sub}`);
      }
    } else if (/\.(mdx?)$/.test(entry.name)) {
      results.push(entry.name);
    }
  }

  return results.sort();
}

/** Collapse consecutive slashes in a URL path without touching the `://` in the scheme. */
function normalizeUrl(url) {
  return url.replace(/([^:])\/\/+/g, '$1/');
}

/**
 * Build the public URL for a doc page.
 * Uses `id` from frontmatter when available; otherwise derives from the file path.
 */
function buildUrl(siteUrl, routeBase, filePath, meta) {
  if (meta.id) {
    return normalizeUrl(`${siteUrl}${routeBase}/${meta.id}`);
  }

  const withoutExt = filePath.replace(/\.(mdx?)$/, '');
  const segments = withoutExt.split('/').map(stripNumericPrefix);
  if (segments[segments.length - 1] === 'index') segments.pop();

  return normalizeUrl(`${siteUrl}${routeBase}/${segments.join('/')}`);
}

/**
 * Derive a human-readable title from the file path when frontmatter doesn't provide one.
 * Handles `.api.mdx`, `.tag.mdx`, `.info.mdx` compound extensions used by the OpenAPI plugin.
 */
function fileToTitle(filePath) {
  return path
    .basename(filePath, path.extname(filePath))
    .replace(/\.(api|tag|info)$/, '')
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ');
}

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function pluginLLMsTxt(context, _options = {}) {
  return {
    name: 'docusaurus-plugin-llms-txt',

    async postBuild({ outDir }) {
      const { siteConfig, siteDir } = context;
      const siteUrl = (siteConfig.url + siteConfig.baseUrl).replace(/\/+$/, '');

      const sections = [
        {
          label: 'Documentation (v1.0.0)',
          dir: path.join(siteDir, 'versioned_docs', 'version-1.0.0'),
          routeBase: '/docs/1.0.0',
        },
        {
          label: 'Documentation (Next)',
          dir: path.join(siteDir, 'docs'),
          routeBase: '/docs/next',
        },
        {
          label: 'API Reference',
          dir: path.join(siteDir, 'api-reference'),
          routeBase: '/api-reference',
        },
        {
          label: 'SDKs',
          dir: path.join(siteDir, 'sdks'),
          routeBase: '/sdks',
        },
        {
          label: 'Help Center',
          dir: path.join(siteDir, 'help-center'),
          routeBase: '/help-center',
        },
        {
          label: 'Changelog',
          dir: path.join(siteDir, 'blog'),
          routeBase: '/changelog',
        },
      ];

      // llms.txt — structured index (the llmstxt.org spec format)
      const indexLines = [
        `# ${siteConfig.title}`,
        '',
        `> ${siteConfig.tagline || 'Developer Documentation'}`,
        `> Site: ${siteUrl}`,
        '',
      ];

      // llms-full.txt — full markdown content for deep agent consumption
      const fullParts = [
        `# ${siteConfig.title}`,
        '',
        `> ${siteConfig.tagline || 'Developer Documentation'}`,
        `> Site: ${siteUrl}`,
        '',
        '---',
        '',
      ];

      for (const section of sections) {
        const files = collectMarkdownFiles(section.dir);
        if (files.length === 0) continue;

        const entries = [];

        for (const file of files) {
          const raw = fs.readFileSync(path.join(section.dir, file), 'utf8');
          const { meta, body } = parseFrontmatter(raw);

          const title =
            meta.title || meta.sidebar_label || fileToTitle(file);
          const description = meta.description || '';
          const url = buildUrl(siteUrl, section.routeBase, file, meta);

          entries.push({ title, url, description, body: body.trim() });
        }

        if (entries.length === 0) continue;

        // Index section
        indexLines.push(`## ${section.label}`, '');
        for (const { title, url, description } of entries) {
          const suffix = description ? `: ${description}` : '';
          indexLines.push(`- [${title}](${url})${suffix}`);
        }
        indexLines.push('');

        // Full-content section
        fullParts.push(`## ${section.label}`, '');
        for (const { title, url, body } of entries) {
          fullParts.push(`### ${title}`, '', `Source: ${url}`, '', body, '', '---', '');
        }
      }

      const content = { 'llms.txt': indexLines.join('\n'), 'llms-full.txt': fullParts.join('\n') };

      for (const [name, text] of Object.entries(content)) {
        // Build output — served at the root URL in production.
        fs.writeFileSync(path.join(outDir, name), text);
        // Repo root — easy for agents to find in the repository.
        fs.writeFileSync(path.join(siteDir, name), text);
        // static/ — picked up by the Docusaurus dev server so local
        // development works without needing to run a full build first.
        fs.writeFileSync(path.join(siteDir, 'static', name), text);
      }

      console.log(`[llms-txt] Generated llms.txt and llms-full.txt in build/, repo root, and static/.`);
    },
  };
};
