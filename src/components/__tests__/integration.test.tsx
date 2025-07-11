import { render, screen } from '@testing-library/react';
import { ProjectListItem } from '../project-list-item';
import { SocialLink } from '../social-link';
import { describe, it, expect } from 'vitest';

describe('Component Integration', () => {
  it('renders multiple ProjectListItem components together', () => {
    render(
      <ul>
        <ProjectListItem
          title="Project 1"
          description="First project description"
          href="https://example1.com"
        />
        <ProjectListItem
          title="Project 2"
          description="Second project description"
          href="https://example2.com"
        />
      </ul>,
    );

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('First project description')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Second project description')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example1.com');
    expect(links[1]).toHaveAttribute('href', 'https://example2.com');
  });

  it('renders multiple SocialLink components together', () => {
    render(
      <ul>
        <SocialLink
          href="https://github.com/user"
          icon={<svg data-testid="github-icon" />}
          label="GitHub"
        />
        <SocialLink
          href="https://twitter.com/user"
          icon={<svg data-testid="twitter-icon" />}
          label="Twitter"
        />
      </ul>,
    );

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://github.com/user');
    expect(links[1]).toHaveAttribute('href', 'https://twitter.com/user');
  });

  it('components work together in a layout', () => {
    render(
      <div>
        <h1>Test Page</h1>
        <section>
          <h2>Projects</h2>
          <ul>
            <ProjectListItem
              title="Cool Project"
              description="A really cool project"
              href="https://coolproject.com"
            />
          </ul>
        </section>
        <footer>
          <ul>
            <SocialLink href="https://github.com/user" icon={<span>📧</span>} label="Contact" />
          </ul>
        </footer>
      </div>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Page');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Projects');
    expect(screen.getByText('Cool Project')).toBeInTheDocument();
    expect(screen.getByText('A really cool project')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
