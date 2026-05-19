import { KNOWN_PACKAGES, PRIORITY_PACKAGES } from '@/lib/parse/known-packages';

type TechInput = {
  packageJson: Record<string, unknown> | null;
  topics: string[];
  language: string | null;
};

export const parseTechStack = (input: TechInput): string[] => {
  const { packageJson } = input;

  if (!packageJson) return [];

  const deps = [
    ...Object.keys((packageJson.dependencies as Record<string, string>) ?? {}),
    ...Object.keys((packageJson.devDependencies as Record<string, string>) ?? {}),
  ];

  const known = deps.filter((dep) => dep in KNOWN_PACKAGES);
  const sorted = [
    ...known.filter((dep) => PRIORITY_PACKAGES.has(dep)),
    ...known.filter((dep) => !PRIORITY_PACKAGES.has(dep)),
  ];
  const result = sorted.map((dep) => KNOWN_PACKAGES[dep]);

  const withFallback = result.length === 0 && input.language ? [input.language] : result;

  return [...new Set(withFallback)].slice(0, 8);
};
