// src/animations/gsap-config.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Registrar plugins que vas a usar
gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

// Configuración global de GSAP
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// Configuración por defecto para animaciones
gsap.defaults({
  duration: 1,
  ease: "power2.out"
});

export { gsap, ScrollTrigger, SplitText };