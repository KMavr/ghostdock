import { cn } from '@/lib/utils/cn';

function Attribution() {
  return (
    <a
      href="https://ghostdock.com"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}>
      Hoisted by GhostDock <span aria-hidden="true">⚓</span>
    </a>
  );
}

const styles = {
  link: cn(
    'inline-flex w-fit items-center gap-1.5 transition-colors duration-[var(--pp-dur-micro)]',
    'hover:text-pp-ink ease-[var(--pp-ease-out)]',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
};

export default Attribution;
