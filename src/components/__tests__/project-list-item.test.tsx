import { render, screen } from '@testing-library/react';
import { ProjectListItem } from '../project-list-item';
import { describe, it, expect } from 'vitest';

describe('ProjectListItem', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'This is a test project description',
    href: 'https://example.com',
  };

  it('renders the project title', () => {
    render(<ProjectListItem {...mockProps} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Project');
  });

  it('renders the project description', () => {
    render(<ProjectListItem {...mockProps} />);

    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders a link with correct href', () => {
    render(<ProjectListItem {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders with different props', () => {
    const differentProps = {
      title: 'Another Project',
      description: 'Different description',
      href: 'https://different.com',
    };

    render(<ProjectListItem {...differentProps} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Another Project');
    expect(screen.getByText('Different description')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://different.com');
  });
});
