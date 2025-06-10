// src/scripts/mainAnimations.js
import { gsap, ScrollTrigger } from './gsap-config.js';

function typeWriterEffect(element, speed = 0.05) {
  // Verificar que el elemento existe
  if (!element) {
    console.warn('Elemento no encontrado para typeWriterEffect');
    return 0;
  }

  const text = element.textContent;
  element.textContent = ''; // Limpiamos el texto original
  
  // Creamos un span para cada letra
  const chars = text.split('');
  chars.forEach((char, i) => {
    const charSpan = document.createElement('span');
    charSpan.textContent = char === ' ' ? '\u00A0' : char; // Manejar espacios
    charSpan.style.opacity = '0';
    element.appendChild(charSpan);
    
    // Animamos cada letra
    gsap.to(charSpan, {
      opacity: 1,
      duration: 0.1,
      delay: i * speed,
      ease: 'none'
    });
  });
  
  // Retornamos la duración total de la animación
  return chars.length * speed;
}

export function initMainAnimations() {
  // Esperar a que el DOM esté completamente cargado
  gsap.set('h2', { opacity: 0, y: 50 }); // Estado inicial para h2
  
  // Animación de entrada del h1
  gsap.from('h1', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3,
    onComplete: () => {
      // Buscar el párrafo después de que termine la animación del título
      const paragraph = document.querySelector('p');
      if (paragraph) {
        typeWriterEffect(paragraph, 0.05);
      } else {
        console.warn('Párrafo no encontrado para el efecto typewriter');
      }
    }
  });

  // Animación con ScrollTrigger para el subtítulo
  gsap.to('h2', {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: 'h2',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      markers: false // Cambia a true para debugging
    }
  });
}

// Versión alternativa más robusta para Astro
export function initMainAnimationsRobust() {
  // Función que se ejecuta cuando todos los elementos están disponibles
  function runAnimations() {
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const paragraph = document.querySelector('p');

    if (!h1) {
      console.warn('H1 no encontrado');
      return;
    }

    // Estado inicial para h2
    if (h2) {
      gsap.set(h2, { opacity: 0, y: 50 });
    }

    // Animación de entrada del h1
    gsap.from(h1, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.3,
      onComplete: () => {
        if (paragraph) {
          typeWriterEffect(paragraph, 0.05);
        }
      }
    });

    // Animación con ScrollTrigger para el subtítulo
    if (h2) {
      gsap.to(h2, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: h2,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }

  // Ejecutar inmediatamente si el DOM ya está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAnimations);
  } else {
    // El DOM ya está listo, ejecutar con un pequeño delay para asegurar hidratación
    setTimeout(runAnimations, 100);
  }
}

// Función para limpiar animaciones al cambiar de página
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
}