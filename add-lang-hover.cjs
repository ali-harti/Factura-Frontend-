const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const hoverCSS = `
    /* Language Card Hover Effects */
    .lang-card {
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    
    .lang-card:hover {
      transform: translateY(-8px);
      border-color: var(--accent);
      box-shadow: 0 20px 40px -10px rgba(232, 114, 74, 0.2);
    }
    
    /* Light mode shadow adjust */
    [data-theme='light'] .lang-card:hover {
      box-shadow: 0 20px 40px -10px rgba(232, 114, 74, 0.15);
    }

    /* Glossy Sweep */
    .lang-card::after {
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
    
    [data-theme='light'] .lang-card::after {
      background: linear-gradient(
        to right, 
        transparent, 
        rgba(255, 255, 255, 0.4), 
        transparent
      );
    }

    .lang-card:hover::after {
      left: 150%;
    }
    
    /* Mockup Inner Animation */
    .lang-mockup {
      transition: transform 0.4s ease;
      position: relative;
      z-index: 2;
    }
    .lang-card:hover .lang-mockup {
      transform: scale(1.02);
    }
    
    /* Accent line pulse */
    @keyframes mockupPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; filter: drop-shadow(0 0 4px var(--accent)); }
    }
    .lang-card:hover .mock-line[style*="var(--accent)"],
    .lang-card:hover .mock-block {
      animation: mockupPulse 1.5s infinite;
    }
`;

html = html.replace('</style>', hoverCSS + '\n</style>');
fs.writeFileSync('index.html', html);
console.log('patched lang card hovers');
