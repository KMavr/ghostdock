import emojiRegex from 'emoji-regex';
import type { RootContent } from 'mdast';
import { toString } from 'mdast-util-to-string';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { parseMarkdown } from '@/lib/parse/markdown';

const SECTION_MATCHERS: Record<string, string[]> = {
  features: ['features', 'key features', 'what it does', 'why', 'highlights'],
  installation: ['installation', 'install', 'getting started', 'setup', 'quick start'],
  usage: ['usage', 'example', 'examples', 'how to use', 'quickstart'],
  contributing: ['contributing', 'contribute', 'development'],
};

export type ParsedSections = {
  features?: string;
  installation?: string;
  usage?: string;
  contributing?: string;
};

const regexEmoji = emojiRegex();

const normalizeHeading = (text: string): string =>
  text.replace(regexEmoji, '').replace(/\s+/g, ' ').trim().toLowerCase();

const matchSection = (text: string): string | null => {
  const normalized = normalizeHeading(text);
  for (const [key, matchers] of Object.entries(SECTION_MATCHERS)) {
    if (matchers.some((m) => normalized.includes(m))) {
      return key;
    }
  }
  return null;
};

const nodesToMarkdown = (nodes: RootContent[]): string =>
  unified().use(remarkStringify).stringify({ type: 'root', children: nodes });

export const parseSections = (raw: string): ParsedSections => {
  const tree = parseMarkdown(raw);
  const sections: Record<string, RootContent[]> = {};
  let currentSection: string | null = null;

  tree.children.forEach((node) => {
    if (node.type === 'heading') {
      currentSection = matchSection(toString(node));
    } else if (currentSection) {
      sections[currentSection] = [...(sections[currentSection] ?? []), node];
    }
  });

  return Object.fromEntries(
    Object.entries(sections).map(([key, nodes]) => [key, nodesToMarkdown(nodes)]),
  ) as ParsedSections;
};
