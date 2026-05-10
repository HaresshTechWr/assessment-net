import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Heading from '@theme/Heading';
import styles from './playground.module.css';

export default function Playground() {
  return (
    <Layout
      title="Python Playground"
      description="Run Python code directly in your browser — no install needed.">
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <Heading as="h1">Python Playground</Heading>
            <p>
              Edit and run Python 3 code directly in your browser — powered by{' '}
              <a href="https://pyodide.org" target="_blank" rel="noreferrer">
                Pyodide
              </a>
              . No install, no server.
            </p>
          </div>

          <BrowserOnly fallback={<div className={styles.loading}>Loading Python runtime…</div>}>
            {() => {
              const PythonRunner = require('../components/PythonRunner').default;
              return <PythonRunner />;
            }}
          </BrowserOnly>

          <div className={styles.tips}>
            <Heading as="h3">Tips</Heading>
            <ul>
              <li>Standard library modules like <code>math</code>, <code>json</code>, <code>re</code>, and <code>datetime</code> work out of the box.</li>
              <li>The runtime loads once on first visit (a few seconds), then stays cached.</li>
              <li>Use <code>print()</code> to see output — the result of the last expression is not auto-displayed.</li>
              <li>Click <strong>Stop</strong> to interrupt a long-running loop.</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
