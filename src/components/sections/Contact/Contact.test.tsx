import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from './Contact';

describe('Contact Section (Vexyn Standards)', () => {
  it('should render the "START A PROJECT" title', () => {
    render(<Contact />);
    const title = screen.getByText((_, element) => {
      const hasText = (node: Element) => node.textContent === "START APROJECT" || node.textContent === "START A PROJECT";
      const nodeHasText = hasText(element as Element);
      return nodeHasText && element?.tagName.toLowerCase() === 'h2';
    });
    expect(title).toBeInTheDocument();
  });

  it('should use the standard primary button for submission', () => {
    render(<Contact />);
    const button = screen.getByRole('button', { name: /SEND MESSAGE/i });
    // O botão padrão tem a classe .button e .primary do Button.module.css
    // Como estamos usando CSS Modules, verificamos se contém a classe que termina com _button e _primary
    expect(button.className).toMatch(/button/);
    expect(button.className).toMatch(/primary/);
  });

  it('should show technical error labels [ERROR_NULL_INPUT] when submitting empty fields', () => {
    render(<Contact />);
    const submitBtn = screen.getByRole('button', { name: /SEND MESSAGE/i });
    
    fireEvent.click(submitBtn);
    
    const errorLabels = screen.getAllByText(/\[ERROR_NULL_INPUT\]/i);
    expect(errorLabels.length).toBeGreaterThan(0);
  });
});
