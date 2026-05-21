import Markdown from '@/components/landing/Markdown/Markdown';
import { cn } from '@/lib/utils/cn';

interface InstallSectionProps {
  content: string;
}

function InstallSection({ content }: InstallSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Installation</h2>
      <Markdown content={content} />
    </section>
  );
}

const styles = {
  section: cn('flex flex-col gap-4'),
  heading: cn('text-pp-ink-strong text-2xl font-semibold tracking-[-0.02em]'),
};

export default InstallSection;
