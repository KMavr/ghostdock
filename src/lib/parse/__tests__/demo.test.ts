import { parseDemoUrl } from '../demo';

describe('parseDemoUrl', () => {
  it('returns the homepage when one is set', () => {
    expect(parseDemoUrl({ homepage: 'https://homepage.com', readmeRaw: null })).toBe(
      'https://homepage.com',
    );
  });

  it('prefers the homepage over a demo link in the readme', () => {
    expect(
      parseDemoUrl({
        homepage: 'https://homepage.com',
        readmeRaw: '[Demo](https://from-readme.com)',
      }),
    ).toBe('https://homepage.com');
  });

  it('falls back to the readme when the homepage is an empty string', () => {
    expect(parseDemoUrl({ homepage: '', readmeRaw: '[Demo](https://from-readme.com)' })).toBe(
      'https://from-readme.com',
    );
  });

  it.each(['demo', 'live', 'try', 'playground', 'preview'])(
    'matches a readme link whose label contains "%s"',
    (keyword) => {
      expect(parseDemoUrl({ homepage: null, readmeRaw: `[${keyword}](https://example.com)` })).toBe(
        'https://example.com',
      );
    },
  );

  it('matches the label keyword case-insensitively', () => {
    expect(parseDemoUrl({ homepage: null, readmeRaw: '[DEMO](https://example.com)' })).toBe(
      'https://example.com',
    );
  });

  it('returns the url, not the label text', () => {
    expect(
      parseDemoUrl({ homepage: null, readmeRaw: '[Live demo](https://example.com/app)' }),
    ).toBe('https://example.com/app');
  });

  it('matches the "live at" pattern when the label has no keyword', () => {
    expect(
      parseDemoUrl({
        homepage: null,
        readmeRaw: 'Live at [the project site](https://example.com)',
      }),
    ).toBe('https://example.com');
  });

  it('matches the "live at" pattern with bold markdown around the link', () => {
    expect(
      parseDemoUrl({
        homepage: null,
        readmeRaw: 'Live at **[the project site](https://example.com)**',
      }),
    ).toBe('https://example.com');
  });

  it('ignores links that are not http(s)', () => {
    expect(parseDemoUrl({ homepage: null, readmeRaw: '[Demo](/relative/path)' })).toBeNull();
  });

  it('returns null when the readme has no demo link', () => {
    expect(
      parseDemoUrl({ homepage: null, readmeRaw: '# My Project\n\nA cool project.' }),
    ).toBeNull();
  });

  it('returns null when both inputs are null', () => {
    expect(parseDemoUrl({ homepage: null, readmeRaw: null })).toBeNull();
  });
});
