import { SLUG_REGEX, SLUG_STATUS, formatSlug, trimSlug } from '../slug';

describe('slug util', () => {
  describe('formatSlug', () => {
    it('lowercases the value', () => {
      expect(formatSlug('HelloWorld')).toBe('helloworld');
    });

    it('replaces spaces with a hyphen', () => {
      expect(formatSlug('hello world')).toBe('hello-world');
    });

    it('collapses a run of invalid characters into a single hyphen', () => {
      expect(formatSlug('hello   world')).toBe('hello-world');
    });

    it('replaces underscores and symbols with a hyphen', () => {
      expect(formatSlug('hello_world!')).toBe('hello-world-');
    });

    it('keeps existing hyphens, digits and lowercase letters', () => {
      expect(formatSlug('my-app-2')).toBe('my-app-2');
    });

    it('does not trim leading or trailing hyphens it produces', () => {
      expect(formatSlug(' hello ')).toBe('-hello-');
    });
  });

  describe('trimSlug', () => {
    it('strips leading and trailing hyphens', () => {
      expect(trimSlug('-hello-world-')).toBe('hello-world');
    });

    it('preserves interior hyphens', () => {
      expect(trimSlug('a--b')).toBe('a--b');
    });

    it('returns an empty string when the value is only hyphens', () => {
      expect(trimSlug('---')).toBe('');
    });

    it('leaves a clean slug unchanged', () => {
      expect(trimSlug('hello')).toBe('hello');
    });
  });

  describe('formatSlug + trimSlug', () => {
    it('produces a value that satisfies SLUG_REGEX', () => {
      expect(SLUG_REGEX.test(trimSlug(formatSlug('My Awesome App!')))).toBe(true);
    });
  });

  describe('SLUG_REGEX', () => {
    it.each(['a', 'a-b-c', '123', 'my-app-2', '-leading-or-trailing-'])(
      'accepts the valid slug "%s"',
      (slug) => {
        expect(SLUG_REGEX.test(slug)).toBe(true);
      },
    );

    it.each(['', 'Uppercase', 'has_underscore', 'has space', 'café'])(
      'rejects the invalid slug "%s"',
      (slug) => {
        expect(SLUG_REGEX.test(slug)).toBe(false);
      },
    );
  });

  describe('SLUG_STATUS', () => {
    it('exposes the available, taken and invalid statuses', () => {
      expect(SLUG_STATUS).toStrictEqual({
        available: 'available',
        taken: 'taken',
        invalid: 'invalid',
      });
    });
  });
});
