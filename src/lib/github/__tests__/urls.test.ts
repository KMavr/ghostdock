import { isValidGithubUrl, parseGithubUrl } from '../urls';

describe('Urls util', () => {
  describe('isValidGithubUrl', () => {
    it.each([
      'https://github.com/owner/repo',
      'http://github.com/owner/repo',
      'github.com/owner/repo',
      'https://github.com/owner/repo/',
      'https://github.com/owner/repo.git',
      'HTTPS://GITHUB.COM/owner/repo',
    ])('returns true for the valid github url: %s', (url) => {
      expect(isValidGithubUrl(url)).toBe(true);
    });

    it.each([
      'https://www.google.com',
      'https://github.com',
      'https://github.com/owner',
      'https://github.com/owner/repo/tree/main',
      '',
    ])('returns false for the invalid github url: %s', (url) => {
      expect(isValidGithubUrl(url)).toBe(false);
    });
  });

  describe('parseGithubUrl', () => {
    it('returns the owner and repo for a valid github url', () => {
      expect(parseGithubUrl('https://github.com/testOwner/TestRepo')).toStrictEqual({
        owner: 'testOwner',
        repo: 'TestRepo',
      });
    });

    it('parses a url without a protocol', () => {
      expect(parseGithubUrl('github.com/owner/repo')).toStrictEqual({
        owner: 'owner',
        repo: 'repo',
      });
    });

    it('strips the .git suffix from the repo name', () => {
      expect(parseGithubUrl('https://github.com/owner/repo.git')).toStrictEqual({
        owner: 'owner',
        repo: 'repo',
      });
    });

    it.each(['https://github.com', 'https://github.com/owner/repo/tree/main', ''])(
      'returns null for the invalid url: %s',
      (url) => {
        expect(parseGithubUrl(url)).toBeNull();
      },
    );
  });
});
