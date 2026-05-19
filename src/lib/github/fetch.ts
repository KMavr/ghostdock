import { Octokit } from '@octokit/rest';

export type RawRepoData = {
  owner: string;
  repo: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  readmeRaw: string | null;
  packageJson: Record<string, unknown> | null;
};

export class GithubFetchError extends Error {
  constructor(
    public readonly code: 'not_found' | 'private' | 'rate_limited' | 'unknown',
    message: string,
  ) {
    super(message);
    this.name = 'GithubFetchError';
  }
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const parsePackageJson = (
  response: PromiseSettledResult<Awaited<ReturnType<typeof octokit.rest.repos.getContent>>>,
): Record<string, unknown> | null => {
  if (response.status === 'rejected') return null;
  if (!('content' in response.value.data)) return null;

  try {
    return JSON.parse(
      Buffer.from(response.value.data.content as string, 'base64').toString('utf-8'),
    );
  } catch {
    return null;
  }
};

export const fetchRepoData = async (owner: string, repo: string): Promise<RawRepoData> => {
  const [repoRes, readmeRes, packageRes] = await Promise.allSettled([
    octokit.rest.repos.get({ owner, repo }),
    octokit.rest.repos.getReadme({ owner, repo }),
    octokit.rest.repos.getContent({ owner, repo, path: 'package.json' }),
  ]);

  if (repoRes.status === 'rejected') {
    const err = repoRes.reason as {
      status?: number;
      response?: { headers: Record<string, string> };
    };
    if (err.status === 404) {
      throw new GithubFetchError('not_found', 'Repository not found or private');
    }
    if (err.status === 403) {
      const isRateLimited = err.response?.headers?.['x-ratelimit-remaining'] === '0';
      const code = isRateLimited ? 'rate_limited' : 'private';
      const message = isRateLimited ? 'GitHub rate limit exceeded' : 'Repository is private';
      throw new GithubFetchError(code, message);
    }
    throw new GithubFetchError('unknown', String(repoRes.reason));
  }

  const repoData = repoRes.value.data;

  const readmeRaw =
    readmeRes.status === 'fulfilled'
      ? Buffer.from(readmeRes.value.data.content, 'base64').toString('utf-8')
      : null;

  const packageJson = parsePackageJson(packageRes);

  return {
    owner,
    repo,
    description: repoData.description ?? null,
    homepage: repoData.homepage ?? null,
    language: repoData.language ?? null,
    topics: repoData.topics ?? [],
    readmeRaw,
    packageJson,
  };
};
