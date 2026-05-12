import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

// ─── llms-full.txt parser ────────────────────────────────────────────────────

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')           // fenced code blocks
    .replace(/`[^`\n]+`/g, '')                // inline code
    .replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, '') // JSX/HTML element pairs
    .replace(/<[^>]+\/>/g, '')                // self-closing JSX/HTML tags
    .replace(/<[^>]+>/g, '')                  // remaining open/close tags
    .replace(/\{[^}]*\}/g, '')               // JSX expressions {…}
    .replace(/^#{1,6}\s+/gm, '')              // headings
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')      // bold
    .replace(/\*([^*\n]+)\*/g, '$1')          // italic
    .replace(/__([^_\n]+)__/g, '$1')          // bold underscore
    .replace(/_([^_\n]+)_/g, '$1')            // italic underscore
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')     // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → label only
    .replace(/^[-*+]\s+/gm, '')               // unordered list markers
    .replace(/^\d+\.\s+/gm, '')               // ordered list markers
    .replace(/^>\s*/gm, '')                   // blockquotes
    .replace(/^-{3,}$/gm, '')                 // horizontal rules
    .replace(/\|[^\n]+/g, '')                 // table rows
    .replace(/^import\s+.*from\s+['"][^'"]+['"]\s*;?$/gm, '') // JS/MDX imports
    .replace(/^export\s+.+$/gm, '')           // JS exports
    .replace(/\n{3,}/g, '\n\n')               // collapse excess blank lines
    .trim();
}

function parseSections(text) {
  const sections = [];
  for (const chunk of text.split('\n---\n')) {
    const titleMatch = chunk.match(/^###\s+(.+)$/m);
    const sourceMatch = chunk.match(/^Source:\s+(\S+)$/m);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const url = sourceMatch ? sourceMatch[1].trim().replace(/^https?:\/\/[^/]+/, '') : '';
    const raw = chunk
      .replace(/^###\s+.+$/m, '')
      .replace(/^Source:\s+\S+$/m, '')
      .replace(/^##.+$/gm, '')
      .trim();
    const content = stripMarkdown(raw);

    if (title && content.length > 30) {
      sections.push({ title, url, content, badge: badgeFromUrl(url) });
    }
  }
  return sections;
}

function badgeFromUrl(url) {
  if (url.includes('/api-reference/')) return 'API';
  if (url.includes('/sdks/'))         return 'SDK';
  if (url.includes('/help-center/'))  return 'Help';
  if (url.includes('/changelog/'))    return 'Changelog';
  return 'Docs';
}

// ─── Search ──────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'how', 'what', 'where', 'when', 'why', 'which', 'who', 'the', 'and', 'for',
  'are', 'but', 'not', 'you', 'all', 'can', 'was', 'one', 'our', 'had', 'has',
  'its', 'may', 'new', 'now', 'see', 'use', 'way', 'any', 'get', 'does', 'did',
  'will', 'with', 'this', 'that', 'from', 'they', 'been', 'have', 'into', 'more',
]);

// Truncate long words by 2 chars so "authenticate" → "authentica",
// matching "authentication", "authenticated", etc. in the content.
function toPattern(word) {
  return word.length > 7 ? word.slice(0, word.length - 2) : word;
}

function search(query, sections) {
  const words = query
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
  if (words.length === 0) return [];

  return sections
    .map(sec => {
      const tl = sec.title.toLowerCase();
      const cl = sec.content.toLowerCase();
      let score = 0;
      for (const w of words) {
        const re = new RegExp(toPattern(w), 'g');
        score += (tl.match(re) || []).length * 5;
        score += (cl.match(re) || []).length;
      }
      return { ...sec, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function snippet(content, query, maxLen = 150) {
  const words = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const lower = content.toLowerCase();
  let start = 0;
  for (const w of words) {
    const idx = lower.indexOf(w);
    if (idx !== -1) { start = Math.max(0, idx - 40); break; }
  }
  const raw = content.slice(start, start + maxLen).replace(/\n+/g, ' ').trim();
  return (start > 0 ? '…' : '') + raw + (raw.length >= maxLen ? '…' : '');
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginLeft: '3px', verticalAlign: 'middle', opacity: 0.6 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WelcomeMessage() {
  return (
    <div className={styles.botBubble}>
      <p>Hi! Ask me anything about the Netomi developer platform.</p>
      <p className={styles.suggestions}>
        Try: <em>"How do I authenticate?"</em> or <em>"What are webhooks?"</em>
      </p>
    </div>
  );
}

function ResultMessage({ results, query }) {
  if (results.length === 0) {
    return (
      <div className={styles.botBubble}>
        No results found for <strong>"{query}"</strong>. Try different keywords or{' '}
        <a href="/docs/1.0.0/introduction">browse the docs →</a>
      </div>
    );
  }
  return (
    <div className={styles.botBubble}>
      <p className={styles.resultCount}>{results.length} result{results.length > 1 ? 's' : ''} for "{query}"</p>
      {results.map((r, i) => (
        <div key={i} className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <a href={r.url} className={styles.resultTitle} target="_blank" rel="noreferrer">
              {r.title}<ExternalIcon />
            </a>
            <span className={styles.resultBadge}>{r.badge}</span>
          </div>
          <p className={styles.resultSnippet}>{snippet(r.content, query)}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

let sectionsCache = null;

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([{ type: 'welcome' }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const loadSections = useCallback(async () => {
    if (sectionsCache) return sectionsCache;
    const res = await fetch('/llms-full.txt');
    sectionsCache = parseSections(await res.text());
    return sectionsCache;
  }, []);

  const handleSend = useCallback(async () => {
    const query = input.trim();
    if (!query || loading) return;

    setMessages(prev => [...prev, { type: 'user', content: query }]);
    setInput('');
    setLoading(true);

    try {
      const sections = await loadSections();
      const results  = search(query, sections);
      setMessages(prev => [...prev, { type: 'results', results, query }]);
    } catch {
      setMessages(prev => [...prev, { type: 'results', results: [], query }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, loadSections]);

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Docs search assistant">

          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.botAvatar}>✦</div>
              <div className={styles.headerMeta}>
                <span className={styles.headerTitle}>Docs Assistant</span>
                <span className={styles.headerSub}>Search the Netomi docs</span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => {
              if (m.type === 'welcome')  return <WelcomeMessage key={i} />;
              if (m.type === 'user')     return <div key={i} className={styles.userBubble}>{m.content}</div>;
              if (m.type === 'results')  return <ResultMessage key={i} results={m.results} query={m.query} />;
              return null;
            })}
            {loading && (
              <div className={styles.botBubble}>
                <span className={styles.dots}><span /><span /><span /></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about the Netomi API…"
              disabled={loading}
              aria-label="Search query"
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <SendIcon />
            </button>
          </div>

          <div className={styles.footer}>
            Powered by{' '}
            <a href="/llms-full.txt" target="_blank" rel="noreferrer">llms-full.txt</a>
          </div>

        </div>
      )}

      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle docs assistant"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  );
}
