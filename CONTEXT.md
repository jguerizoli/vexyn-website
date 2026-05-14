# Vexyn Project Context

## Glossary

### Results Section
The architectural module responsible for delivering social proof. It sequences the visual arrival of `ResultCard` objects using a pinned scroll-driven timeline.

### ResultCard
A **Deep Module** representing a single testimonial.
- **Interface**: Consumes a `Review` data object and exposes an animation contract via data-attributes.
- **Invariants**: Must maintain its own hover state and visual integrity regardless of its position in the parent stack.
- **Depth**: Hides the internal complexity of its layout (quotes, metrics, author) from the parent orchestrator.

### Formulário de Contato
A **Surgical Input Module** designed for high-conversion intent capture.
- **Visuals**: Zero border-radius, high-contrast inputs.
- **Behaviors**: Uses "Shutter Cut" for all state changes.
- **Validation**: Binary status (Arancio/White) using technical labels in `Geist Mono`.

### Shutter Cut
A core kinetic principle of the Vexyn design system. 
- **Definition**: Transitions that occur instantaneously (`steps(1)` or `0s` duration), mimicking a mechanical camera shutter.
- **Usage**: Mandatory for UI states (hover, focus, active) to project precision and eliminate "decorative" softness.

## Typographic Standards (Swiss Grid)
All textual elements must adhere to the mathematical ratios of the Swiss Style to ensure architectural hierarchy.
- **Headlines**: `Outfit` (Black 900).
- **Body**: `Geist Sans` (Light 300).
- **Mono/Technical**: `Geist Mono` (Medium 500 / Bold 700).
- **Hero/Section Titles**: `clamp(3.5rem, 8vw, 6rem)` (~42pt to 72pt).
- **Body Text**: `1rem` (12pt).
- **Secondary/Metadata**: `0.8rem` (~9.6pt).
- **Card Titles**: `clamp(2.5rem, 5.5vw, 4.5rem)` (~30pt to 54pt).
- **Constraint**: Avoid "middle-ground" font sizes. Stick to the 12pt base or the large display sizes to maintain "Brutalismo Chic" tension.
