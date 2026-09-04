const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const richCSS = `
    /* Advanced Rich Animations & Hover Effects */

    /* 1. Hero Background Ambient Pulse */
    @keyframes heroAmbient {
      0% { background-position: 0% 50%; opacity: 0.8; }
      50% { background-position: 100% 50%; opacity: 1; }
      100% { background-position: 0% 50%; opacity: 0.8; }
    }
    
    .hero-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, var(--accent-glow) 0%, transparent 60%);
      opacity: 0.5;
      animation: heroAmbient 8s ease-in-out infinite;
      z-index: -1;
      pointer-events: none;
    }

    /* 2. Marquee Pause on Hover */
    .marquee:hover .marquee-content {
      animation-play-state: paused;
    }
    .marquee-content {
      transition: opacity 0.3s ease;
    }
    .marquee:hover .marquee-content {
      opacity: 0.8;
    }

    /* 3. Popular Badge Pulsing Glow */
    @keyframes badgePulse {
      0% { box-shadow: 0 0 0 0 rgba(232, 114, 74, 0.4); transform: translateX(-50%) scale(1); }
      70% { box-shadow: 0 0 0 10px rgba(232, 114, 74, 0); transform: translateX(-50%) scale(1.05); }
      100% { box-shadow: 0 0 0 0 rgba(232, 114, 74, 0); transform: translateX(-50%) scale(1); }
    }
    .popular-badge {
      animation: badgePulse 2s infinite;
    }

    /* 4. Glossy Shine Sweep on Cards */
    .feature-block, .problem-card, .pricing-card, .testimonial-card {
      position: relative;
      overflow: hidden; /* Needed for the shine sweep to not bleed */
    }
    
    .feature-block::after, .problem-card::after, .pricing-card::after, .testimonial-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -150%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right, 
        transparent, 
        rgba(255, 255, 255, 0.05), 
        transparent
      );
      transform: skewX(-25deg);
      transition: left 0.7s cubic-bezier(0.19, 1, 0.22, 1);
      z-index: 1;
      pointer-events: none;
    }
    
    [data-theme='light'] .feature-block::after, 
    [data-theme='light'] .problem-card::after, 
    [data-theme='light'] .pricing-card::after, 
    [data-theme='light'] .testimonial-card::after {
      background: linear-gradient(
        to right, 
        transparent, 
        rgba(255, 255, 255, 0.4), 
        transparent
      );
    }

    .feature-block:hover::after, .problem-card:hover::after, .pricing-card:hover::after, .testimonial-card:hover::after {
      left: 150%;
    }

    /* Keep content above the shine */
    .feature-block > *, .problem-card > *, .pricing-card > *, .testimonial-card > * {
      position: relative;
      z-index: 2;
    }

    /* 5. Testimonial Avatar Bounce */
    .testimonial-avatar {
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    }
    .testimonial-card:hover .testimonial-avatar {
      transform: scale(1.2) rotate(5deg);
      box-shadow: 0 0 15px var(--accent-glow);
    }
    
    /* 6. Button Inner Pulse */
    @keyframes btnInnerPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    /* 7. Footer Social/Links elegant hover */
    .footer-links a {
      transition: color 0.3s ease, transform 0.3s ease;
      display: inline-block;
    }
    .footer-links a:hover {
      color: var(--accent);
      transform: translateX(5px);
    }
`;

html = html.replace('</style>', richCSS + '\n</style>');
fs.writeFileSync('index.html', html);
console.log('patched rich animations');
