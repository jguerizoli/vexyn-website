import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  const mockService = {
    id: '1',
    title: 'AUTOMATIONS',
    subtitle: 'INTELLIGENT SYSTEMS',
    deliverables: ['PYTHON & AI', 'API INTEGRATIONS'],
    cta: 'EXPLORE'
  };

  it('renders the title and subtitle correctly', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('AUTOMATIONS')).toBeDefined();
    expect(screen.getByText('INTELLIGENT SYSTEMS')).toBeDefined();
  });

  it('renders all deliverables', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('PYTHON & AI')).toBeDefined();
    expect(screen.getByText('API INTEGRATIONS')).toBeDefined();
  });

  it('calls onCtaClick when button is clicked', () => {
    const onCtaClick = vi.fn();
    render(<ServiceCard service={mockService} onCtaClick={onCtaClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });
});
