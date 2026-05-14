import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin, Observer);

export type Direction = 'next' | 'prev';

export interface SectionAdapter {
  id: string;
  element: HTMLElement;
  canNavigate: (direction: Direction) => boolean;
  onIntent: (direction: Direction) => void;
  getLandingScroll: (direction: Direction) => number;
}

class IntentOrchestrator {
  private sections: SectionAdapter[] = [];
  private currentIndex = 0;
  private isBusy = false;
  private observer: Observer | null = null;
  private watchdog: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Lazy init via init()
  }

  public init() {
    if (this.observer) return;
    this.observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onDown: () => this.handleIntent('next'),
      onUp: () => this.handleIntent('prev'),
      tolerance: 15,
      wheelSpeed: 1,
      preventDefault: true
    });
  }

  public registerSection(adapter: SectionAdapter) {
    // Check if already registered
    if (this.sections.find(s => s.id === adapter.id)) return;
    
    this.sections.push(adapter);
    // Robust DOM-based sorting
    this.sections.sort((a, b) => {
      return a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }

  private handleIntent(direction: Direction) {
    if (this.isBusy || this.sections.length === 0) return;

    const currentSection = this.sections[this.currentIndex];
    console.log(`[DEBUG-SCROLL] Intent: ${direction} | Current: ${currentSection?.id} (Index: ${this.currentIndex})`);
    
    if (currentSection && currentSection.canNavigate(direction)) {
      this.navigate(direction);
    } else if (currentSection) {
      console.log(`[DEBUG-SCROLL] Internal move for: ${currentSection.id}`);
      currentSection.onIntent(direction);
    }
  }

  private navigate(direction: Direction) {
    const nextIndex = direction === 'next' ? this.currentIndex + 1 : this.currentIndex - 1;
    
    if (nextIndex < 0 || nextIndex >= this.sections.length) {
      console.log(`[DEBUG-SCROLL] Out of bounds: ${nextIndex}`);
      return;
    }

    const target = this.sections[nextIndex];
    // Ask the section where we should land based on where we are coming from
    const targetScroll = target.getLandingScroll(direction);
    console.log(`[DEBUG-SCROLL] Navigating to: ${target.id} (Index: ${nextIndex})`);
    this.lock();

    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: false },
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        this.currentIndex = nextIndex;
        this.unlock();
      },
      onInterrupt: () => this.unlock(),
      onOverwrite: () => this.unlock(),
      overwrite: true
    });
  }

  public syncIndex(id: string) {
    const index = this.sections.findIndex(s => s.id === id);
    if (index !== -1 && index !== this.currentIndex) {
      console.log(`[DEBUG-SCROLL] Syncing Index: ${this.currentIndex} -> ${index} (Target: ${id})`);
      this.currentIndex = index;
    }
  }

  private lock() {
    this.isBusy = true;
    if (this.watchdog) clearTimeout(this.watchdog);
    // Safety Watchdog: 1.2s to match the 0.8s animation
    this.watchdog = setTimeout(() => this.unlock(), 1200);
  }

  private unlock() {
    this.isBusy = false;
    if (this.watchdog) clearTimeout(this.watchdog);
  }

  public jumpTo(id: string) {
    const index = this.sections.findIndex(s => s.id === id);
    if (index !== -1) {
      this.currentIndex = index;
      const target = this.sections[index];
      this.lock();
      gsap.to(window, {
        scrollTo: { y: target.element, autoKill: false },
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => this.unlock()
      });
    }
  }

  public destroy() {
    this.observer?.kill();
    this.observer = null;
    if (this.watchdog) clearTimeout(this.watchdog);
  }
}

export const orchestrator = new IntentOrchestrator();
