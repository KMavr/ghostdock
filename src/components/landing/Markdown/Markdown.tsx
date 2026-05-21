import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils/cn';
import { Anchor, InlineCode, Pre } from './components';

interface MarkdownProps {
  content: string;
}

function Markdown({ content }: MarkdownProps) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ pre: Pre, code: InlineCode, a: Anchor }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

const styles = {
  prose: cn(
    'prose prose-sm max-w-none',
    '[--tw-prose-body:var(--pp-ink)]',
    '[--tw-prose-headings:var(--pp-ink-strong)]',
    '[--tw-prose-bold:var(--pp-ink-strong)]',
    '[--tw-prose-counters:var(--pp-muted)]',
    '[--tw-prose-bullets:var(--pp-rule)]',
    '[--tw-prose-hr:var(--pp-rule)]',
    '[--tw-prose-quotes:var(--pp-muted)]',
    '[--tw-prose-quote-borders:var(--pp-rule)]',
    '[--tw-prose-captions:var(--pp-muted)]',
    '[--tw-prose-code:var(--pp-ink)]',
    '[--tw-prose-th-borders:var(--pp-rule)]',
    '[--tw-prose-td-borders:var(--pp-rule)]',
    'prose-li:my-1',
  ),
};

export default Markdown;
