import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ServiceCard from './ServiceCard/ServiceCard';

import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: '1',
    title: 'AUTOMAÇÕES',
    subtitle: 'SISTEMAS INTELIGENTES QUE TRABALHAM POR VOCÊ 24/7',
    deliverables: ['PYTHON & AI', 'INTEGRAÇÕES API', 'FLUXOS DE TRABALHO'],
    cta: 'AUTOMATIZAR AGORA'
  },
  {
    id: '2',
    title: 'IDENTIDADE',
    subtitle: 'DESIGN QUE CONSTRÓI AUTORIDADE E PRESENÇA',
    deliverables: ['BRANDING CORE', 'UI/UX DESIGN', 'SISTEMAS VISUAIS'],
    cta: 'CONSTRUIR MARCA'
  },
  {
    id: '3',
    title: 'DESENVOLVIMENTO',
    subtitle: 'ENGENHARIA DE SOFTWARE DE ALTA PERFORMANCE',
    deliverables: ['NEXT.JS / REACT', 'WEBGL / GSAP', 'ARCHITECTURE FIRST'],
    cta: 'INICIAR PROJETO'
  }
];

interface ServicesProps {
  scrollTo: (id: string) => void;
}

const Services: React.FC<ServicesProps> = () => {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: `+=${cards.length * 150}%`,
        pin: true,
        scrub: 0.5,
      }
    });

    // Initial State
    gsap.set(cards, { yPercent: -105, opacity: 0, zIndex: 10 });
    gsap.set(cards[0], { yPercent: 0, opacity: 1, zIndex: 20 });

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // No next card to animate in after the last one

      const currentCard = card;
      const nextCard = cards[i + 1];

      // The Transition Phase
      const startTime = i;

      // Current Card EXITS to Bottom
      tl.to(currentCard, {
        yPercent: 105,
        opacity: 0,
        duration: 1,
        ease: 'expo.inOut'
      }, startTime);

      // Next Card ENTERS from Top
      tl.fromTo(nextCard, 
        { 
          yPercent: -105,
          opacity: 1,
          zIndex: 30 + i
        },
        { 
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.inOut'
        }, 
        startTime
      );

      // Staggered internal content for the NEXT card
      const title = nextCard.querySelector('h3');
      const listItems = nextCard.querySelectorAll('li');
      const cta = nextCard.querySelector('button');

      if (title) {
        tl.fromTo(title, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          startTime + 0.4
        );
      }

      if (listItems.length > 0) {
        tl.fromTo(listItems, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
          startTime + 0.5
        );
      }

      if (cta) {
        tl.fromTo(cta, 
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
          startTime + 0.7
        );
      }
    });
  }, { scope: container });

  return (
    <section 
      id="services" 
      ref={container} 
      className={styles.section}
    >
      <div className={styles.grid}>
        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleLine1}>WHAT</span>
            <span className={styles.titleLine2}>WE DO</span>
          </h2>
        </header>

        <div className={styles.cardsContainer}>
          {SERVICES_DATA.map((service, i) => (
            <div 
              key={service.id} 
              ref={(el) => (cardsRef.current[i] = el)}
              className={styles.stackCard}
            >
              <ServiceCard 
                service={service} 
                index={i + 1}
                onCtaClick={() => console.log(`Clicked ${service.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
