import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

// ─── llms-full.txt parser ────────────────────────────────────────────────────

function parseSections(text) {
  const sections = [];
  // Each page block is delimited by \n---\n
  for (const chunk of text.split('\n---\n')) {
    const titleMatch = chunk.match(/^###\s+(.+)$/m);
    const sourceMatch = chunk.match(/^Source:\s+(\S+)$/m);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const url = sourceMatch ? sourceMatch[1].trim() : '';
    const content = chunk
      .replace(/^###\s+.+$/m, '')
      .replace(/^Source:\s+\S+$/m, '')
      .replace(/^##.+$/gm, '') // strip section headers
      .trim();

    if (title && content.length > 20) {
      sections.push({ title, url, content });
    }
  }
  return sections;
}

// ─── Search ──────────────────────────────────────────────────────────────────

function search(query, sections) {
  const words = query
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 2);

  if (words.length === 0) return [];

  const scored = sections.map(sec => {
    const titleLower = sec.title.toLowerCase();
    const contentLower = sec.content.toLowerCase();
    let score = 0;
    for (const w of words) {
      // Title hits are worth 5×, content hits 1×
      const re = new RegExp(w, 'g');
      score += (titleLower.match(re) || []).length * 5;
      score += (contentLower.match(re) || []).length;
    }
    return { ...sec, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function snippet(content, query, maxLen = 160) {
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ─── Message types ────────────────────────────────────────────────────────────

function WelcomeMessage() {
  return (
    <div className={styles.botBubble}>
      <p>Hi! Search the Netomi developer docs by asking a question.</p>
      <p className={styles.suggestions}>Try: <em>"How do I authenticate?"</em> or <em>"What are webhooks?"</em></p>
    </div>
  );
}

function ResultMessage({ results, query }) {
  if (results.length === 0) {
    return (
      <div className={styles.botBubble}>
        No matching docs found for <strong>"{query}"</strong>. Try different keywords or{' '}
        <a href="/docs/1.0.0/introduction">browse the docs</a>.
      </div>
    );
  }

  return (
    <div className={styles.botBubble}>
      <p className={styles.resultCount}>{results.length} result{results.length > 1 ? 's' : ''} for <strong>"{query}"</strong></p>
      {results.map((r, i) => (
        <div key={i} className={styles.resultCard}>
          <a href={r.url} className={styles.resultTitle} target="_blank" rel="noreferrer">{r.title}</a>
          <p className={styles.resultSnippet}>{snippet(r.content, query)}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Chatbot widget ───────────────────────────────────────────────────────────

let sectionsCache = null;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'welcome' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const loadSections = useCallback(async () => {
    if (sectionsCache) return sectionsCache;
    const res = await fetch('/llms-full.txt');
    const text = await res.text();
    sectionsCache = parseSections(text);
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
      const results = search(query, sections);
      setMessages(prev => [...prev, { type: 'results', results, query }]);
    } catch {
      setMessages(prev => [...prev, { type: 'results', results: [], query }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, loadSections]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Docs search assistant">
          <div className={styles.header}>
            <span>Docs Assistant</span>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => {
              if (m.type === 'welcome') return <WelcomeMessage key={i} />;
              if (m.type === 'user') return <div key={i} className={styles.userBubble}>{m.content}</div>;
              if (m.type === 'results') return <ResultMessage key={i} results={m.results} query={m.query} />;
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
            <button className={styles.sendBtn} onClick={handleSend} disabled={loading || !input.trim()} aria-label="Send">
              <SendIcon />
            </button>
          </div>

          <div className={styles.footer}>
            Powered by <a href="/llms-full.txt" target="_blank" rel="noreferrer">llms-full.txt</a>
          </div>
        </div>
      )}

      <button className={styles.trigger} onClick={() => setOpen(o => !o)} aria-label="Toggle docs assistant">
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  );
}
