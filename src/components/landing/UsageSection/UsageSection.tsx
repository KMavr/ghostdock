import Markdown from '@/components/landing/Markdown/Markdown';
import { cn } from '@/lib/utils/cn';

interface UsageSectionProps {
  content: string;
}

function UsageSection({ content }: UsageSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Usage</h2>
      <Markdown content={content} />
    </section>
  );
}

const styles = {
  section: cn('flex flex-col gap-5'),
  heading: cn('text-pp-ink-strong text-2xl font-semibold tracking-[-0.02em]'),
};

export default UsageSection;
