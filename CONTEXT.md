# Vexyn Project Context

## Glossary

### Results Section
The architectural module responsible for delivering social proof. It sequences the visual arrival of `ResultCard` objects using a pinned scroll-driven timeline.

### ResultCard
A **Deep Module** representing a single testimonial.
- **Interface**: Consumes a `Review` data object and exposes an animation contract via data-attributes.
- **Invariants**: Must maintain its own hover state and visual integrity regardless of its position in the parent stack.
- **Depth**: Hides the internal complexity of its layout (quotes, metrics, author) from the parent orchestrator.

### Animation Contract
The agreed-upon set of selectors/attributes that a parent component uses to animate a child module. In the Results section, the `ResultCard` exposes its root container for the "Fan-out" movement.
