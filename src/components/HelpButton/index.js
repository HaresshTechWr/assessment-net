import React, { useState } from 'react';
import styles from './styles.module.css';

// TODO: Replace with your actual support URL (e.g. Intercom, Crisp, mailto:support@netomi.com)
const SUPPORT_URL = '#';

export default function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.menu}>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.menuItem}
            onClick={() => setOpen(false)}
          >
            💬 Contact Support
          </a>
          <a
            href="/help-center/faq"
            className={styles.menuItem}
            onClick={() => setOpen(false)}
          >
            📖 Help Center
          </a>
        </div>
      )}
      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Help and feedback"
        aria-expanded={open}
      >
        {open ? '✕' : '?'}
      </button>
    </div>
  );
}
