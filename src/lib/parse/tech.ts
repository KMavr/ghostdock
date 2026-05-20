import { KNOWN_PACKAGES, KNOWN_TOPICS, PRIORITY_PACKAGES } from '@/lib/parse/known-packages';

type TechInput = {
  packageJson: Record<string, unknown> | null;
  topics: string[];
  language: string | null;
};

export const parseTechStack = (input: TechInput): string[] => {
  const { packageJson, topics, language } = input;

  const deps = packageJson
    ? [
        ...Object.keys((packageJson.dependencies as Record<string, string>) ?? {}),
        ...Object.keys((packageJson.devDependencies as Record<string, string>) ?? {}),
      ]
    : [];

  const known = deps.filter((dep) => dep in KNOWN_PACKAGES);
  const sorted = [
    ...known.filter((dep) => PRIORITY_PACKAGES.has(dep)),
    ...known.filter((dep) => !PRIORITY_PACKAGES.has(dep)),
  ];
  const fromPackages = sorted.map((dep) => KNOWN_PACKAGES[dep]);

  const fromTopics = topics.filter((t) => t in KNOWN_TOPICS).map((t) => KNOWN_TOPICS[t]);

  const combined = [...fromPackages, ...fromTopics];

  if (combined.length === 0 && language) {
    combined.push(language);
  }

  return [...new Set(combined)].slice(0, 12);
};
