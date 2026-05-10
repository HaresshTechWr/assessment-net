import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const quickLinks = [
  {
    label: 'Getting Started',
    description: 'Set up your environment and make your first API call in minutes.',
    to: '/docs/introduction',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'API Reference',
    description: 'Full REST API docs with live examples and authentication guides.',
    to: '/api-reference/overview',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'SDKs',
    description: 'Native libraries for Python, Node.js, and more.',
    to: '/sdks/overview',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Help Center',
    description: 'FAQs, troubleshooting guides, and support resources.',
    to: '/help-center/faq',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Developer Platform</span>
          <Heading as="h1" className={styles.heroTitle}>
            Build Intelligent<br />Customer Experiences
          </Heading>
          <p className={styles.heroSubtitle}>
            The Netomi Agentic AI Platform — APIs, SDKs, and comprehensive docs
            to integrate AI-powered customer service into any product.
          </p>
          <div className={styles.buttons}>
            <Link className={clsx('button button--lg', styles.primaryButton)} to="/docs/introduction">
              Get Started
            </Link>
            <Link className={clsx('button button--lg', styles.secondaryButton)} to="/api-reference/overview">
              API Reference
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className={styles.quickLinksGrid}>
          {quickLinks.map(({label, description, to, icon}) => (
            <Link key={label} to={to} className={styles.quickLinkCard}>
              <span className={styles.quickLinkIcon}>{icon}</span>
              <span className={styles.quickLinkLabel}>{label}</span>
              <span className={styles.quickLinkDesc}>{description}</span>
              <span className={styles.quickLinkArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Build with the Netomi Agentic AI Platform — APIs, SDKs, and docs for AI-powered customer service.">
      <Head>
        <style>{`.netomi-version-dropdown { display: none !important; }`}</style>
      </Head>
      <HomepageHeader />
      <main>
        <QuickLinks />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
