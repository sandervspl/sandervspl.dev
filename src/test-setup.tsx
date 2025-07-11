import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock SVG imports
vi.mock('jsx:../icons/github.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="github-icon" {...props} />,
}));

vi.mock('jsx:../icons/instagram.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="instagram-icon" {...props} />
  ),
}));

vi.mock('jsx:../icons/twitter.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="twitter-icon" {...props} />,
}));

// Mock direct SVG imports from icons folder
vi.mock('../icons/github.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="github-icon" {...props} />,
}));

vi.mock('../icons/instagram.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="instagram-icon" {...props} />
  ),
}));

vi.mock('../icons/twitter.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="twitter-icon" {...props} />,
}));

// Mock CSS imports
vi.mock('../globals.css', () => ({}));
