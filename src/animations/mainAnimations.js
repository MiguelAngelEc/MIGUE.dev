// src/scripts/mainAnimations.js
import { gsap, ScrollTrigger, SplitText } from './gsap-config.js';

export function initMainAnimations() {

  const h1Element = document.querySelector('h1')
  const h2Element = document.querySelector('h2')
  const pElement = document.querySelector('p')
  const spanElement = document.querySelector('.char')
  const mainElement = document.querySelector('main');
  const split1 = new SplitText(spanElement, { type: "chars" });
  const split2 = new SplitText(h2Element, { type: "chars" });

  gsap.from(split1.chars, {
    duration: 0.8,
    x: -100,
    opacity: 0,
    stagger: 0.05,
    ease: 'power3.out',
  });

  gsap.from(split2.chars, {
    duration: 0.5,
    x: 100,
    opacity: 0,
    stagger: 0.05,
    ease: 'power2.out',
  });

  gsap.to([h1Element, h2Element, pElement], {
    opacity: 0,
    y: -50,
    duration: 1,
    scrollTrigger: {
      trigger: mainElement,
      start: "top top",
      end: "+=400",
      scrub: true,
    }
  });
}



// Limpieza
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  SplitText.revert();
}