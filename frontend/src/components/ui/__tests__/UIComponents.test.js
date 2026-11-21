import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FiCheck } from 'react-icons/fi';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { ThemeToggle } from '../ThemeToggle';
import { SectionHeading } from '../SectionHeading';
import { Container } from '../Container';
import { ThemeProvider } from '../../../context/ThemeContext';

describe('UI Components Unit Tests', () => {
  describe('Button Component', () => {
    test('renders with children text', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    test('handles onClick event', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Trigger</Button>);
      fireEvent.click(screen.getByRole('button', { name: /trigger/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('supports disabled state and prevents clicks', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      const btn = screen.getByRole('button', { name: /disabled/i });
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('applies brand variant styles', () => {
      render(<Button variant="brand">Brand Action</Button>);
      const btn = screen.getByRole('button', { name: /brand action/i });
      expect(btn.className).toContain('bg-emerald-600');
    });
  });

  describe('Alert Component', () => {
    test('renders alert role with message content', () => {
      render(<Alert>System notification</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('System notification');
    });

    test('applies error variant styling', () => {
      render(<Alert variant="error">Critical failure</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-red-50');
    });

    test('applies success variant styling', () => {
      render(<Alert variant="success">Operation succeeded</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-emerald-50');
    });
  });

  describe('SectionHeading Component', () => {
    test('renders badge, title and description', () => {
      render(
        <SectionHeading
          badge="Features"
          badgeIcon={FiCheck}
          title="Section Header"
          description="A helpful description"
        />
      );
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Section Header')).toBeInTheDocument();
      expect(screen.getByText('A helpful description')).toBeInTheDocument();
    });

    test('supports left alignment and custom classes', () => {
      render(
        <SectionHeading
          title="Left Heading"
          align="left"
          className="custom-heading"
          data-testid="left-heading"
        />
      );
      const headingBox = screen.getByTestId('left-heading');
      expect(headingBox.className).toContain('text-left');
      expect(headingBox.className).toContain('custom-heading');
    });
  });

  describe('Container Component', () => {
    test('renders children within container bounds', () => {
      render(
        <Container size="default">
          <span>Container content</span>
        </Container>
      );
      expect(screen.getByText('Container content')).toBeInTheDocument();
    });

    test('supports custom polymorphic tag', () => {
      render(
        <Container as="section" size="lg" data-testid="custom-section">
          <p>Section wrapped</p>
        </Container>
      );
      const section = screen.getByTestId('custom-section');
      expect(section.tagName.toLowerCase()).toBe('section');
      expect(section.className).toContain('max-w-[1240px]');
    });
  });

  describe('ThemeToggle Component', () => {
    test('toggles theme when clicked', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
      expect(toggleBtn).toBeInTheDocument();

      fireEvent.click(toggleBtn);
      // LocalStorage should reflect new theme
      expect(localStorage.getItem('theme')).toBeDefined();
    });
  });
});
