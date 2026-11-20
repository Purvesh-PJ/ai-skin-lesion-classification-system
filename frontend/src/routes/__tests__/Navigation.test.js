import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../index';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Navigation & Routing Integration Tests', () => {
  test('renders Landing page on root route /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Landing hero heading
    expect(
      screen.getByText(/Skin Disease Classification via/i)
    ).toBeInTheDocument();

    // Call to action buttons to launch studio
    const ctaLinks = screen.getAllByRole('link', { name: /try image detection/i });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    expect(ctaLinks[0]).toBeInTheDocument();
  });

  test('renders Dashboard page on /dashboard route', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Demo Samples:/i)).toBeInTheDocument();
  });

  test('renders NotFound page on non-existent route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
