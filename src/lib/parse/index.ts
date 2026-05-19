import type { RawRepoData } from '@/lib/github/fetch';
import { parseDemoUrl } from './demo';
import { parseSections, type ParsedSections } from './sections';
import { parseTechStack } from './tech';

export type ParsedRepoData = {
  descriptionParsed: string | null;
  demoUrlParsed: string | null;
  techStackParsed: string[];
  sectionsParsed: ParsedSections;
};

export const parseRepoData = (raw: RawRepoData): ParsedRepoData => ({
  descriptionParsed: raw.description,
  demoUrlParsed: parseDemoUrl({ homepage: raw.homepage, readmeRaw: raw.readmeRaw }),
  techStackParsed: parseTechStack({
    packageJson: raw.packageJson,
    topics: raw.topics,
    language: raw.language,
  }),
  sectionsParsed: raw.readmeRaw ? parseSections(raw.readmeRaw) : {},
});
