import type { ReactElement, ReactNode } from 'react';
import CodeBlock from '@/components/landing/CodeBlock/CodeBlock';

function Pre({ children }: { children?: ReactNode }) {
  const codeEl = children as ReactElement<{ children?: ReactNode }> | undefined;
  const raw = String(codeEl?.props?.children ?? '').replace(/\n$/, '');

  return <CodeBlock code={raw} />;
}

export default Pre;
