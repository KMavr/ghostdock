import type { Root } from 'mdast';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export const parseMarkdown = (raw: string): Root =>
  unified.use(remarkParse).use(remarkGfm).parse(raw);
