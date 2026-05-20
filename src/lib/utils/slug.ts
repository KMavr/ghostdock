export const SLUG_REGEX = /^[a-z0-9-]+$/;

export const SLUG_STATUS = {
  available: 'available',
  taken: 'taken',
  invalid: 'invalid',
} as const;

export type SlugStatus = (typeof SLUG_STATUS)[keyof typeof SLUG_STATUS];
