import { parseTechStack } from '../tech';

describe('parseTechStack', () => {
  it('maps known dependencies to their display names', () => {
    expect(
      parseTechStack({
        packageJson: { dependencies: { react: '^19.0.0' } },
        topics: [],
        language: null,
      }),
    ).toStrictEqual(['React']);
  });

  it('includes devDependencies alongside dependencies', () => {
    expect(
      parseTechStack({
        packageJson: {
          dependencies: { react: '^19.0.0' },
          devDependencies: { typescript: '^5.0.0' },
        },
        topics: [],
        language: null,
      }),
    ).toStrictEqual(['React', 'TypeScript']);
  });

  it('filters out unknown dependencies', () => {
    expect(
      parseTechStack({
        packageJson: { dependencies: { 'some-unknown-lib': '^1.0.0', react: '^19.0.0' } },
        topics: [],
        language: null,
      }),
    ).toStrictEqual(['React']);
  });

  it('sorts priority packages before non-priority ones', () => {
    expect(
      parseTechStack({
        packageJson: { dependencies: { express: '^4.0.0', tailwindcss: '^4.0.0' } },
        topics: [],
        language: null,
      }),
    ).toStrictEqual(['Tailwind CSS', 'Express']);
  });

  it('appends known topics after packages', () => {
    expect(
      parseTechStack({
        packageJson: { dependencies: { react: '^19.0.0' } },
        topics: ['docker'],
        language: null,
      }),
    ).toStrictEqual(['React', 'Docker']);
  });

  it('filters out unknown topics', () => {
    expect(
      parseTechStack({
        packageJson: null,
        topics: ['docker', 'some-unknown-topic'],
        language: null,
      }),
    ).toStrictEqual(['Docker']);
  });

  it('de-duplicates names shared by a package and a topic', () => {
    expect(
      parseTechStack({
        packageJson: { dependencies: { next: '^16.0.0' } },
        topics: ['nextjs'],
        language: null,
      }),
    ).toStrictEqual(['Next.js']);
  });

  it('falls back to the language when nothing else is found', () => {
    expect(parseTechStack({ packageJson: null, topics: [], language: 'Python' })).toStrictEqual([
      'Python',
    ]);
  });

  it('ignores the language when packages or topics are present', () => {
    expect(
      parseTechStack({
        packageJson: { dependencies: { react: '^19.0.0' } },
        topics: [],
        language: 'JavaScript',
      }),
    ).toStrictEqual(['React']);
  });

  it('returns an empty array when there is nothing to parse', () => {
    expect(parseTechStack({ packageJson: null, topics: [], language: null })).toStrictEqual([]);
  });

  it('handles a packageJson without dependency fields', () => {
    expect(
      parseTechStack({ packageJson: { name: 'my-app' }, topics: [], language: null }),
    ).toStrictEqual([]);
  });
});
