import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges classes ignoring falsy values', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });
});
