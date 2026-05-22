import { cn } from '../cn';

describe('cn', () => {
  it('merges multiple class strings', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('drops falsy and conditional values', () => {
    expect(cn('flex', false, null, undefined, '', 'gap-2')).toBe('flex gap-2');
  });

  it('supports array inputs', () => {
    expect(cn(['flex', 'gap-2'])).toBe('flex gap-2');
  });

  it('supports object inputs with conditional keys', () => {
    expect(cn({ flex: true, hidden: false })).toBe('flex');
  });

  it('resolves conflicting tailwind classes so the last one wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('returns an empty string when given no arguments', () => {
    expect(cn()).toBe('');
  });
});
