const GITHUB_URL_REGEX =
  /^(?:https?:\/\/)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?\/?$/i;

export const isValidGithubUrl = (url: string): boolean => {
  return GITHUB_URL_REGEX.test(url);
};

export const parseGithubUrl = (url: string): { owner: string; repo: string } | null => {
  const match = url.match(GITHUB_URL_REGEX);

  return match ? { owner: match[1], repo: match[2] } : null;
};
