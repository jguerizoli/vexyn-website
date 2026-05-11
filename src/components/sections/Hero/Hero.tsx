import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VexynSymbol3D from '../../common/VexynSymbol/VexynSymbol3D';
import Button from '../../common/Button/Button';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

    // Entrance Sequence: High-impact cuts
    tl.from(`.${styles.heroTitle}`, { 
      x: -100, 
      opacity: 0, 
      delay: 0.2
    })
    .from(`.${styles.heroSubtitle}`, { 
      y: 20, 
      opacity: 0, 
      duration: 0.5 
    }, '-=0.5')
    .from(`.${styles.heroActions}`, { 
      y: 20, 
      opacity: 0, 
      duration: 0.5 
    }, '-=0.3')
    .from(`.${styles.heroSymbolWrapper}`, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=1');

    // Parallax Effect
    gsap.to(`.${styles.heroSymbolWrapper}`, {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section id="hero" ref={container} className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContainer}>
        <div className="max-w-4xl">
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>design + code</span>
            <span className={styles.accent}>change the future</span>
          </h1>
          
          <div className="flex items-center gap-8 mb-8" style={{ paddingLeft: '24px' }}>
            <div className="w-12 h-[2px] bg-vx-orange opacity-40" />
            <p className={styles.heroSubtitle}>
              We do both. Every day.
            </p>
          </div>
          
          <div className={styles.heroActions}>
            <Button 
              onClick={() => scrollTo('services')} 
              variant="primary"
              size="lg"
            >
              Explore Services
            </Button>
            <Button 
              onClick={() => scrollTo('contact-form')} 
              variant="ghost"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Symbol: Anchored Right (3D Shader Version) */}
      <div className={styles.heroSymbolWrapper}>
        <VexynSymbol3D 
          size="600px" 
          className={styles.heroSymbol} 
        />
      </div>
    </section>
  );
};

export default Hero;
