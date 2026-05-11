import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const features = [
  {
    title: 'Agentic AI Platform',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
    description:
      'Deploy autonomous AI agents that handle complex customer interactions end-to-end. Resolve tickets, answer questions, and take actions across every channel — without human intervention.',
    link: '/docs/1.0.0/introduction',
    linkLabel: 'Read the docs',
  },
  {
    title: 'Native SDKs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description:
      'Integrate Netomi into your product in minutes with official SDKs for Python, Node.js, and more. Typed, well-documented, and built for production workloads from day one.',
    link: '/sdks/overview',
    linkLabel: 'Browse SDKs',
  },
  {
    title: 'Full API Access',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description:
      'RESTful APIs with comprehensive reference docs, authentication guides, and live sandbox testing. Everything you need to build fast and ship with confidence.',
    link: '/api-reference/overview',
    linkLabel: 'Explore the API',
  },
];

function Feature({icon, title, description, link, linkLabel}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <span className={styles.featureIconWrapper}>{icon}</span>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
        <Link to={link} className={styles.featureLink}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">Everything you need to build with Netomi</Heading>
          <p>A complete developer platform — from quick-start guides to deep API references.</p>
        </div>
        <div className="row">
          {features.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
