import { LuArrowRight } from 'react-icons/lu';
import { cn } from '@/lib/utils/cn';

interface HeroSectionProps {
  name: string;
  description: string;
  demoUrl?: string | null;
  techStack: string[];
}

function HeroSection({ name, description, demoUrl, techStack }: HeroSectionProps) {
  return (
    <header className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {techStack.length > 0 && <p className={styles.tech}>{techStack.join('  ·  ')}</p>}
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.demo}>
          Live demo
          <LuArrowRight className={styles.demoIcon} aria-hidden="true" />
        </a>
      )}
    </header>
  );
}

const styles = {
  container: cn('flex flex-col items-start gap-6 pt-6'),
  name: cn(
    'text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]',
    'text-pp-ink-strong [overflow-wrap:anywhere]',
  ),
  description: cn('text-pp-muted max-w-[60ch] text-lg leading-relaxed'),
  tech: cn('text-pp-muted font-mono text-sm'),
  demo: cn(
    'group bg-pp-ink-strong mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5',
    'text-pp-paper text-sm font-medium whitespace-nowrap',
    'transition-[opacity,transform] duration-[var(--pp-dur-micro)] ease-[var(--pp-ease-out)]',
    'hover:opacity-90 active:translate-y-px',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
  demoIcon: cn(
    'h-4 w-4 transition-transform duration-[var(--pp-dur-micro)] ease-[var(--pp-ease-out)]',
    'group-hover:translate-x-0.5',
  ),
};

export default HeroSection;
