import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils/cn';

interface UsageSectionProps {
  content: string;
}

function UsageSection({ content }: UsageSectionProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Usage</h2>
      <div className={styles.body}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  );
}

const styles = {
  container: cn('space-y-4'),
  heading: cn('text-gd-text text-2xl font-semibold'),
  body: cn('prose prose-invert prose-sm text-gd-muted max-w-none'),
};

export default UsageSection;
