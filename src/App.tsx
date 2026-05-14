import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services/Services';
import Results from './components/sections/Results';
import Partners from './components/sections/Partners/Partners';
import Contact from './components/sections/Contact/Contact';
import './App.css';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { orchestrator } from './lib/orchestrator';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useGSAP(() => {
    // Initialize Orchestrator Authority
    orchestrator.init();

    // Monitoring: Update Sidebar based on position
    const sections = gsap.utils.toArray('section') as HTMLElement[];
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setActiveSection(section.id);
          orchestrator.syncIndex(section.id);
        },
        onEnterBack: () => {
          setActiveSection(section.id);
          orchestrator.syncIndex(section.id);
        },
      });

      // Standard Registration for Static Sections
      // Note: 'services' section self-registers via the Services component to handle internal card state
      if (section.id !== 'services') {
        orchestrator.registerSection({
          id: section.id,
          element: section,
          canNavigate: () => true, // Static sections always allow jumping
          onIntent: () => {}, // Nothing to do internally
          getLandingScroll: () => section.offsetTop
        });
      }
    });

    return () => orchestrator.destroy();
  }, []);

  const scrollTo = (id: string) => {
    orchestrator.jumpTo(id);
  };

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} scrollTo={scrollTo} />
      <main className="content">
        <Hero scrollTo={scrollTo} />
        <Services />
        <Results scrollTo={scrollTo} />
        <Partners />
        <Contact />
      </main>
    </div>
  );
}

export default App;
