import { cn } from '@/lib/utils/cn';

interface HeroSectionProps {
  name: string;
  description: string;
  demoUrl?: string | null;
  techStack: string[];
}

function HeroSection({ name, description, demoUrl, techStack }: HeroSectionProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.description}>{description}</p>
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.demoLink}>
          Live Demo →
        </a>
      )}
      {techStack.length > 0 && (
        <div className={styles.badges}>
          {techStack.map((tech) => (
            <span key={tech} className={styles.badge}>
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: cn('space-y-6'),
  name: cn('text-gd-text text-4xl font-bold tracking-tight'),
  description: cn('text-gd-muted text-lg leading-relaxed'),
  demoLink: cn(
    'inline-flex items-center gap-2 rounded-md px-4 py-2',
    'bg-gd-accent text-gd-bg text-sm font-semibold',
    'hover:bg-gd-accent-glow transition-colors',
  ),
  badges: cn('flex flex-wrap gap-2'),
  badge: cn('bg-gd-surface-2 text-gd-muted rounded-full px-2.5 py-1 text-xs font-medium'),
};

export default HeroSection;
