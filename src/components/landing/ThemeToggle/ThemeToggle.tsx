'use client';

import { useSyncExternalStore } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { cn } from '@/lib/utils/cn';

type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', onChange);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener('change', onChange);
  };
};

const getSnapshot = (): Theme => {
  const explicit = document.documentElement.getAttribute('data-pp-theme');
  if (explicit === 'light' || explicit === 'dark') return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// The server cannot know the visitor's preference — the icon resolves after hydration.
const getServerSnapshot = (): Theme | null => null;

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-pp-theme', next);
    try {
      localStorage.setItem('pp-theme', next);
    } catch {
      // localStorage unavailable — the choice just won't persist
    }
    listeners.forEach((notify) => notify());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={styles.button}>
      {theme === 'dark' && <LuSun className={styles.icon} aria-hidden="true" />}
      {theme === 'light' && <LuMoon className={styles.icon} aria-hidden="true" />}
    </button>
  );
}

const styles = {
  button: cn(
    'fixed top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full',
    'border-pp-rule bg-pp-paper text-pp-muted border',
    'transition-colors duration-[var(--pp-dur-micro)] ease-[var(--pp-ease-out)]',
    'hover:border-pp-muted hover:text-pp-ink',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
    'active:translate-y-px',
  ),
  icon: cn('h-[18px] w-[18px]'),
};

export default ThemeToggle;
