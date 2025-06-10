// src/scripts/mainAnimations.js
import { gsap, ScrollTrigger } from './gsap-config.js';

export function initMainAnimations() {
  // Animación de entrada
  gsap.from('h1', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
  });

  // Animación con ScrollTrigger
  gsap.to('h2', {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: 'h2',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  // Timeline ejemplo
  const tl = gsap.timeline();
  tl.from('p', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2
  });
}

// Función para limpiar animaciones al cambiar de página
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
}