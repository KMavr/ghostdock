import type { RawRepoData } from '@/lib/github/fetch';
import { parseRepoData } from '../index';

const makeRaw = (overrides: Partial<RawRepoData> = {}): RawRepoData => ({
  owner: 'octocat',
  repo: 'hello-world',
  description: 'A sample project',
  homepage: null,
  language: 'TypeScript',
  topics: [],
  readmeRaw: null,
  packageJson: null,
  ...overrides,
});

describe('parseRepoData', () => {
  it('passes the description through unchanged', () => {
    expect(parseRepoData(makeRaw({ description: 'A sample project' })).descriptionParsed).toBe(
      'A sample project',
    );
  });

  it('passes a null description through as null', () => {
    expect(parseRepoData(makeRaw({ description: null })).descriptionParsed).toBeNull();
  });

  it('returns empty sections when readmeRaw is null', () => {
    expect(parseRepoData(makeRaw({ readmeRaw: null })).sectionsParsed).toStrictEqual({});
  });

  it('returns empty sections when readmeRaw is an empty string', () => {
    expect(parseRepoData(makeRaw({ readmeRaw: '' })).sectionsParsed).toStrictEqual({});
  });

  it('delegates demo, tech stack and sections parsing for a full repo', () => {
    const result = parseRepoData(
      makeRaw({
        description: 'A cool app',
        homepage: 'https://cool-app.com',
        language: 'TypeScript',
        topics: ['docker'],
        packageJson: { dependencies: { react: '^19.0.0' } },
        readmeRaw: '## Features\n\nDoes cool things.',
      }),
    );

    expect(result.descriptionParsed).toBe('A cool app');
    expect(result.demoUrlParsed).toBe('https://cool-app.com');
    expect(result.techStackParsed).toStrictEqual(['React', 'Docker']);
    expect(result.sectionsParsed.features).toContain('Does cool things.');
  });
});
