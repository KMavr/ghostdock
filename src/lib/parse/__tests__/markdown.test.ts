import { parseMarkdown } from '../markdown';

describe('parseMarkdown', () => {
  it('returns an mdast root node', () => {
    const tree = parseMarkdown('# Hello');
    expect(tree.type).toBe('root');
    expect(Array.isArray(tree.children)).toBe(true);
  });

  it('parses a heading into a heading node', () => {
    const tree = parseMarkdown('# Hello');
    expect(tree.children[0]).toMatchObject({ type: 'heading', depth: 1 });
  });

  it('parses GFM tables (remark-gfm)', () => {
    const tree = parseMarkdown('| a | b |\n| - | - |\n| 1 | 2 |');
    expect(tree.children[0].type).toBe('table');
  });

  it('parses GFM strikethrough (remark-gfm)', () => {
    const tree = parseMarkdown('~~removed~~');
    const paragraph = tree.children[0];
    expect(paragraph.type).toBe('paragraph');
    if (paragraph.type !== 'paragraph') throw new Error('expected a paragraph node');
    expect(paragraph.children[0].type).toBe('delete');
  });

  it('returns a root with no children for an empty string', () => {
    const tree = parseMarkdown('');
    expect(tree.children).toStrictEqual([]);
  });
});
