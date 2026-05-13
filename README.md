 # Netomi Developer Docs — Technical Assessment

  **Live site:** https://assessment-net.netlify.app/
  **Repository:** [https://github.com/HaresshTechWr/assessment-net](https://github.com/HaresshTechWr/assessment-net)

  ## What I built

  A developer-facing documentation site using Docusaurus, organised into four sections: **Documentation**, **API Reference**, **SDKs**, and a **Help Center**. The site includes **local search, versioning 
  scoped to the main docs instance**, **interactive OpenAPI-powered API reference**, **an AI docs search chatbot**, **per-page feedback**, and **llms.txt generation**. It is deployed via Netlify with a GitHub Actions pipeline that runs quality checks on every pull request.
  
  ## Decisions and why

  ### Separate plugin instances for each content type

  Documentation, API Reference, SDKs, and Help Center are separate Docusaurus plugin instances, each with its own sidebar and URL path. This keeps versioning scoped to just the main docs, the API
  reference follows the API's own version, the SDK follows its package version, and the Help Center is always current (always updated!).

  ### Interactive API reference with docusaurus-plugin-openapi-docs                                                         

  The `openapi.yaml` spec is fed into `docusaurus-plugin-openapi-docs` + `docusaurus-theme-openapi-docs`, which auto-generate interactive, try-it-out endpoint pages grouped by tag. Writers never touch the API reference pages directly — they update the spec, run `docusaurus gen-api-docs`, and the pages regenerate. This keeps docs in sync with the actual API without manual updates.

  ### llms.txt generation built into the build pipeline

 A custom Docusaurus plugin (`plugins/llms-txt.js`) hooks into `postBuild` to emit two files: `llms.txt` (a structured index with titles and descriptions) and `llms-full.txt` (full page content). Both follow the emerging [llms.txt standard](https://llmstxt.org/). A commit-llms-txt CI job reuses the build artifact to commit the updated files back to the repo on every PR push and on merge to main, so they are always current without a second build. This makes the docs directly consumable by AI agents and LLM-based tooling.
  
  ### Docs search chatbot powered by llms-full.txt

  A floating chat widget (mounted globally via `src/theme/Root.jsx`) fetches `/llms-full.txt` on first open and parses it into per-page sections entirely on the client — no API key, no backend, no cost.  Queries are scored by keyword frequency with title hits weighted 5×, stop-word filtering, and morphological prefix matching. The top four matching sections are returned as result cards with a snippet and a direct link. Because it runs against the same `llms-full.txt` that AI agents use, the chatbot and the machine-readable index stay in sync automatically.
  
  ### Per-page feedback widget

  A `PageFeedback` component is injected into every doc page footer via a swizzled `DocItem/Footer`. Readers click thumbs-up or thumbs-down — this creates a low-friction signal for which pages need improvement. The `HelpButton` floating widget is mounted globally for quick access to support.

  ### Netlify over GitHub Pages                                                                                             

  Netlify deploys Docusaurus with zero configuration and provides preview deployments for every pull request. Reviewers see the rendered docs before merging, not just raw markdown. GitHub Pages requires additional configuration and a separate deploy workflow, adding friction without meaningful benefit for this use case.

  ### Three CI checks: build, markdown lint, broken links

  - The **build check** catches broken MDX syntax or misconfigured sidebars before they reach users. A broken build means nothing ships.
  - **Markdown lint** runs only on files changed in the PR, not the entire repository. This keeps feedback fast and relevant — writers see what they need to fix without noise from unrelated files.
  build. A source-level check would miss those entirely.
  
  Both lint and link violation checks do not block the pipeline — only a **broken build does**. Meaning, changes would not be deployed to the site.
  
  ### Accessibility check with pa11y
  
  Pa11y runs WCAG compliance checks on the rendered pages after every PR and saves the report as a downloadable artifact. It catches accessibility issues, contrast issues, missing ARIA labels, and
  keyboard navigation problems entirely — giving actionable inputs to make the site more accessible for everyone.
  
  ### Local search with @easyops-cn/docusaurus-search-local
  
  Search is enabled across all four content sections.
  
  ## What I would add with more time
  
  ### Separate versioning instances for each plugin
  
  Documentation, API Reference, SDKs, and Help Center are separate Docusaurus plugin instances. A single global version unnecessarily couples their release cycles together.
  
  The version dropdown sits in the global navbar, so it remains visible when browsing SDKs or API Reference, but it only controls the Documentation section. In production, the cleaner solution would be to
   move the version selector into the docs sidebar itself, keeping it contextual rather than global.
   
  ### Algolia search to replace local search
  
  The current implementation builds the search index at compile time, which works well for smaller sites. Algolia indexes continuously, scales better for large developer portals, and provides analytics on
   what developers are searching for — helping prioritise which docs need improvement. 
   
  ### Connect the feedback widget to a backend
  
  The current `PageFeedback` component captures clicks client-side but does not yet persist them. Wiring it to a lightweight endpoint (or a service like Segment) would turn the signal into actionable
  data, showing which pages have the highest dissatisfaction rate. 
  
  ### Upgrade the chatbot to a real LLM
  
  The current chatbot does keyword scoring against `llms-full.txt`. Swapping the scoring step for an API call to Claude or GPT with `llms-full.txt` as context would give natural-language answers instead of ranked snippets — the file is already there, only the query layer needs to change.
  
  ### PR comments showing exact lint violations
  
  Currently lint errors are posted as a **summary comment linking to the Actions log**. A follow-up improvement would show the **exact file, line, and rule that failed directly in the PR comment**, so
  writers can fix issues without opening the Actions log at all.
  
  ### Vale prose linter
  
  Enforces a style guide automatically across all content, so review comments can focus on substance rather than formatting.
  
  ### Gated internal docs
  
  A separate instance or conditional build flag to serve internal-only content without exposing it publicly.
  
  ## Assumptions
  
  - The primary audience is **external developers** integrating Netomi via API or SDK, not end users or internal teams.
  - Writers contribute content via pull requests, so CI feedback needs to be actionable for people who are not comfortable with terminal output.
  - API versioning follows a semantic pattern (`v1.0.0`, `v2.0.0`) rather than date-based versioning.
  - The Help Center and Changelog are maintained separately from the core API docs and do not need to be versioned alongside them.
  - Search is scoped to docs, API reference, and SDK content. Blog/changelog posts are excluded as they are time-based updates, not reference material developers would search for.

  ---
  Key changes from the old README:
  
  1. "What I built" — updated to mention interactive OpenAPI reference, the AI chatbot, per-page feedback, and llms.txt.
  2. "Interactive API reference" — moved from "What I would add" to "Decisions and why" since it's now implemented.
  3. Three new decision sections — llms.txt generation, Docs search chatbot, and Per-page feedback widget, each with the reasoning.
  4. "What I would add" — replaced the done items with forward-looking follow-ons: connecting feedback to a backend, upgrading the chatbot to a real LLM, and the remaining items from before.
