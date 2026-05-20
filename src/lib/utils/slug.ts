export const SLUG_REGEX = /^[a-z0-9-]+$/;

export const SLUG_STATUS = {
  available: 'available',
  taken: 'taken',
  invalid: 'invalid',
} as const;

export type SlugStatus = (typeof SLUG_STATUS)[keyof typeof SLUG_STATUS];

export const formatSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');

export const trimSlug = (value: string) => value.replace(/^-+|-+$/g, '');
