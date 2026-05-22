import { parseSections, type ParsedSections } from '../sections';

describe('parseSections', () => {
  it('extracts a section under a matching heading', () => {
    const result = parseSections('## Features\n\nSome feature text.');
    expect(result.features).toContain('Some feature text.');
    expect(result.installation).toBeUndefined();
  });

  it.each([
    ['## Install', 'installation'],
    ['## Getting Started', 'installation'],
    ['## Examples', 'usage'],
    ['## How To Use', 'usage'],
    ['## Contributing', 'contributing'],
    ['## Highlights', 'features'],
  ])('maps the heading "%s" to the %s section', (heading, key) => {
    const result = parseSections(`${heading}\n\nSection body.`);
    expect(result[key as keyof ParsedSections]).toContain('Section body.');
  });

  it('strips emoji from headings before matching', () => {
    const result = parseSections('## ✨ Features\n\nFeature text.');
    expect(result.features).toContain('Feature text.');
  });

  it('matches headings case-insensitively', () => {
    const result = parseSections('## FEATURES\n\nFeature text.');
    expect(result.features).toContain('Feature text.');
  });

  it('drops content that appears before the first heading', () => {
    const result = parseSections('Intro paragraph.\n\n## Features\n\nFeature text.');
    expect(result.features).toContain('Feature text.');
    expect(result.features).not.toContain('Intro paragraph.');
  });

  it('drops content under an unmatched heading and resumes on the next match', () => {
    const result = parseSections(
      '## Random Heading\n\nIgnored content.\n\n## Usage\n\nUsage text.',
    );
    expect(Object.keys(result)).toStrictEqual(['usage']);
    expect(result.usage).toContain('Usage text.');
  });

  it('accumulates content from multiple headings that map to the same section', () => {
    const result = parseSections('## Features\n\nFirst block.\n\n## Highlights\n\nSecond block.');
    expect(result.features).toContain('First block.');
    expect(result.features).toContain('Second block.');
  });

  it('omits a matched heading that has no body content', () => {
    const result = parseSections('## Features\n\n## Usage\n\nUsage text.');
    expect(result.features).toBeUndefined();
    expect(result.usage).toContain('Usage text.');
  });

  it('matches by heading text only, ignoring heading depth', () => {
    const result = parseSections(
      '## Usage\n\nUsage intro.\n\n### Installation\n\nNested install steps.',
    );
    expect(result.usage).toContain('Usage intro.');
    expect(result.installation).toContain('Nested install steps.');
  });

  it('returns an empty object for an empty string', () => {
    expect(parseSections('')).toStrictEqual({});
  });

  it('returns an empty object when no headings match', () => {
    expect(parseSections('# My Project\n\nA description.\n\n## Random\n\nStuff.')).toStrictEqual(
      {},
    );
  });
});
