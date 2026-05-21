import Markdown from '@/components/landing/Markdown/Markdown';
import { cn } from '@/lib/utils/cn';

interface FeaturesSectionProps {
  content: string;
}

function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Features</h2>
      <Markdown content={content} />
    </section>
  );
}

const styles = {
  section: cn('flex flex-col gap-5'),
  heading: cn('text-pp-ink-strong text-2xl font-semibold tracking-[-0.02em]'),
};

export default FeaturesSection;
