import { describe, it, expect } from 'vitest';
import { Head } from '../head';

describe('Head', () => {
  it('accepts title prop', () => {
    // Test that the Head component accepts props without throwing
    expect(() => {
      Head({ title: 'Test Title' });
    }).not.toThrow();
  });

  it('accepts description prop', () => {
    // Test that the Head component accepts props without throwing
    expect(() => {
      Head({ description: 'Test Description' });
    }).not.toThrow();
  });

  it('accepts children prop', () => {
    // Test that the Head component accepts children without throwing
    expect(() => {
      Head({ children: 'Test Children' });
    }).not.toThrow();
  });
});
