import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

const STEPS = [
  { num: '01', text: 'Paste a public GitHub repo URL.' },
  { num: '02', text: 'GhostDock reads the README, tech stack, and metadata.' },
  { num: '03', text: 'Publish your page and share the link.' },
];

function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <span className={styles.wordmark}>
          GhostDock{' '}
          <span className={styles.anchor} aria-hidden="true">
            ⚓
          </span>
        </span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.headline}>Turn any repo into a landing page.</h1>
          <p className={styles.subcopy}>
            Paste a public GitHub repo URL — GhostDock reads the README and builds a clean,
            shareable product page. No config.
          </p>
          <div className={styles.actions}>
            <Link href="/sign-up" className={styles.primary}>
              Get started free
            </Link>
            <Link href="/sign-in" className={styles.secondary}>
              Sign in
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.steps}>
          <h2 className={styles.stepsHeading}>How it works</h2>
          <ol className={styles.stepList}>
            {STEPS.map((step) => (
              <li key={step.num} className={styles.step}>
                <span className={styles.stepNum}>{step.num}</span>
                <span className={styles.stepText}>{step.text}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.wordmark}>
          GhostDock{' '}
          <span className={styles.anchor} aria-hidden="true">
            ⚓
          </span>
        </span>
        <span>A presentation layer for GitHub projects.</span>
      </footer>
    </div>
  );
}

const styles = {
  page: cn('bg-gd-bg text-gd-text flex min-h-screen flex-col'),
  topbar: cn('mx-auto w-full max-w-5xl px-6 py-6'),
  wordmark: cn('text-base font-semibold tracking-tight'),
  anchor: cn('text-gd-accent'),
  main: cn('mx-auto w-full max-w-5xl flex-1 px-6'),
  hero: cn('flex flex-col items-start gap-6 pt-16 pb-20 sm:pt-24'),
  headline: cn(
    'max-w-[18ch] text-[clamp(2.75rem,5vw+1rem,4.5rem)] leading-[1.05] font-semibold',
    'tracking-[-0.03em] [overflow-wrap:anywhere]',
  ),
  subcopy: cn('text-gd-muted max-w-[52ch] text-lg leading-relaxed'),
  actions: cn('mt-2 flex flex-wrap items-center gap-6'),
  primary: cn(
    'bg-gd-accent text-gd-bg rounded-lg px-6 py-3 text-sm font-semibold transition-colors',
    'hover:bg-gd-accent-glow',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
  secondary: cn(
    'group text-gd-muted inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
    'hover:text-gd-text',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
  arrow: cn('transition-transform group-hover:translate-x-0.5'),
  steps: cn('border-gd-surface-2 border-t py-16'),
  stepsHeading: cn('text-xl font-semibold tracking-tight'),
  stepList: cn('mt-8 grid gap-8 sm:grid-cols-3'),
  step: cn('border-gd-surface-2 flex flex-col gap-3 border-t pt-4'),
  stepNum: cn('text-gd-accent font-mono text-sm'),
  stepText: cn('text-gd-muted leading-relaxed'),
  footer: cn(
    'border-gd-surface-2 text-gd-muted mx-auto flex w-full max-w-5xl flex-col gap-2 border-t',
    'px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between',
  ),
};

export default HomePage;
