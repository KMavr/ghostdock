import type { ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/landing/CodeBlock/CodeBlock';
import { cn } from '@/lib/utils/cn';

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

function Pre({ children }: { children?: ReactNode }) {
  const codeEl = children as ReactElement<{ children?: ReactNode }> | undefined;
  const raw = String(codeEl?.props?.children ?? '').replace(/\n$/, '');
  return <CodeBlock code={raw} />;
}

function InlineCode({ children }: { children?: ReactNode }) {
  return <code className={styles.inlineCode}>{children}</code>;
}

function Anchor({ href, children }: { href?: string; children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {children}
    </a>
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
  inlineCode: cn('bg-pp-paper-2 text-pp-ink rounded px-1.5 py-0.5 font-mono text-[0.85em]'),
  link: cn(
    'text-pp-ink-strong decoration-pp-rule font-medium underline underline-offset-2',
    'hover:decoration-pp-ink transition-colors duration-[var(--pp-dur-micro)] ease-[var(--pp-ease-out)]',
  ),
};

export default Markdown;
