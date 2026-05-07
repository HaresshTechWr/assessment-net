# Netomi Developer Docs — Technical Assessment

**Live site:** https://assessment-net.netlify.app/ 
**Repository:** [https://github.com/HaresshTechWr/assessment-net](https://github.com/HaresshTechWr/assessment-net)

## What I built

A developer-facing documentation site using Docusaurus, organised into four sections: **Documentation**, **API Reference**, **SDKs**, and a **Help Center**. The site includes **local search, versioning scoped to the main docs instance**, and is deployed via Netlify with a GitHub Actions pipeline that runs quality checks on every pull request.

## Decisions and why

### Separate plugin instances for each content type

Documentation, API Reference, SDKs, and Help Center are separate Docusaurus plugin instances, each with its own sidebar and URL path. This keeps versioning scoped to just the main docs, the API reference follows the API's own version, the SDK follows its package version, and the Help Center is always current (always updated!).

### Netlify over GitHub Pages

Netlify deploys Docusaurus with zero configuration and provides preview deployments for every pull request.  Reviewers see the rendered docs before merging, not just raw markdown. GitHub Pages requires additional configuration and a separate deploy workflow, adding friction without meaningful benefit for this use case.

### Three CI checks: build, markdown lint, broken links

- The **build check** catches broken MDX syntax or misconfigured sidebars before they reach users. A broken build means nothing ships.
- **Markdown lint** runs only on files changed in the PR, not the entire repository. This keeps feedback fast and relevant meaning writers see what they need to fix without noise from unrelated files, which they haven't touched upon.
- The **broken link checker** runs against the compiled HTML, not the source markdown. This matters because Docusaurus generates paths dynamically — versioned cross-references only exist after the build. A source-level check would miss those entirely.

Both Lint & link violation checks do not block the pipeline, only a **broken build does**.  Meaning, changes wouldn't be deployed to the site.

### Accessibility check with pa11y

Pa11y runs WCAG compliance checks on the rendered pages after every PR and saves the report as a downloadable artifact. Why pa11y ? it catches accessibility issues, contrast issues, missing ARIA labels, and keyboard navigation problems entirely. Giving actionable inputs to make our site more accessible for EVERYONE.

### Local search with @easyops-cn/docusaurus-search-local  

Search is enabled across all four content sections.

## What I would add with more time

### Separate versioning instances for plugin

Documentation, API Reference, SDKs, and Help Center are separate Docusaurus plugin instances. A single global version would couple their release cycles together unnecessarily.

The version dropdown sits in the global navbar, so it remains visible when browsing SDKs or API Reference, but it only controls the Documentation section. In production, the cleaner solution would be to move the version selector into the docs sidebar itself, keeping it contextual rather than global.

### Interactive API reference

Using `docusaurus-plugin-openapi-docs` — the `openapi.yaml` spec is already in the repository. The plugin generates interactive, try-it-out endpoint pages from the spec automatically, keeping API docs in sync with the actual API without manual updates by writers.
  
### Algolia search to replace local search

The current implementation builds the index at compile time which works well for smaller sites. Algolia indexes continuously, scales better for large developer portals, and provides analytics on what developers are searching for — helping prioritise which docs need improvement.
  
### PR comments showing exact lint violations

Currently lint errors are posted as a **summary comment linking to the Actions log**. A follow-up improvement would show the **exact file, line, and rule that failed directly in the PR comment**, so writers can fix issues without opening the Actions log at all.
  
### Vale prose linter

Enforces a style guide automatically across all content, so review comments can focus on substance rather than formatting.

### Gated internal docs

Aseparate instance or conditional build flag to serve internal-only content without exposing it publicly.

## Assumptions

- The primary audience is **external developers** integrating Netomi via API or SDK, not end users or internal teams.
- Writers contribute content via pull requests, so CI feedback needs to be actionable for people who are not comfortable with terminal output.
- API versioning follows a semantic pattern (`v1.0.0`, `v2.0.0`) rather than date-based versioning.
- The Help Center and Changelog are maintained separately from the core API docs and do not need to be versioned alongside them.
- Search is scoped to docs, API reference, and SDK content. Blog/changelog posts are excluded as they are time-based updates, not reference material developers would search for.
