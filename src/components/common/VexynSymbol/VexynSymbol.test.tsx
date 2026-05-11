import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VexynSymbol from './VexynSymbol';

describe('VexynSymbol Component', () => {
  it('renders the symbol SVG', () => {
    const { container } = render(<VexynSymbol />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
    expect(svg).toHaveAttribute('viewBox', '0 0 132 72');
  });

  it('renders with stroke and no fill for pulse mode by default', () => {
    const { container } = render(<VexynSymbol />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', 'none');
    expect(path).toHaveAttribute('stroke');
  });

  it('applies custom className', () => {
    const { container } = render(<VexynSymbol className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
