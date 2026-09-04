const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const css = `
    /* Lottie-style Micro Animations */
    
    @keyframes lottieClock {
      0% { transform: rotate(0deg); }
      20% { transform: rotate(90deg); }
      40% { transform: rotate(180deg); }
      60% { transform: rotate(270deg); }
      80% { transform: rotate(360deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes lottieAlert {
      0%, 100% { transform: translateX(0) scale(1); }
      20% { transform: translateX(-2px) scale(1.1) rotate(-5deg); }
      40% { transform: translateX(2px) scale(1.1) rotate(5deg); }
      60% { transform: translateX(-2px) scale(1.1) rotate(-5deg); }
      80% { transform: translateX(2px) scale(1.1) rotate(5deg); }
    }
    
    @keyframes lottieChat {
      0%, 100% { transform: scale(1) translateY(0); }
      20% { transform: scale(1.1) translateY(-3px) rotate(-3deg); }
      40% { transform: scale(1.1) translateY(-3px) rotate(3deg); }
      60% { transform: scale(0.95) translateY(1px); }
      80% { transform: scale(1.05) translateY(-1px); }
    }
    
    @keyframes lottieUpload {
      0%, 100% { transform: translateY(0); }
      30% { transform: translateY(-8px); }
      70% { transform: translateY(4px); }
    }

    @keyframes lottiePulseGlow {
      0%, 100% { filter: drop-shadow(0 0 2px var(--accent)); }
      50% { filter: drop-shadow(0 0 10px var(--accent)); }
    }

    /* Override the previous static scale/rotate */
    .feature-block:hover .feature-icon, .problem-card:hover .problem-icon {
      transform: none; /* Removed the static static transform */
    }

    /* Assign animations to specific SVGs */
    .problem-card:nth-child(1):hover .problem-icon svg polyline {
      transform-origin: 12px 12px;
      animation: lottieClock 1.5s ease-in-out infinite;
    }
    
    .problem-card:nth-child(2):hover .problem-icon svg {
      animation: lottieAlert 0.8s ease-in-out infinite;
    }
    .problem-card:nth-child(2):hover .problem-icon svg path {
      stroke: #ff6b6b;
      transition: stroke 0.3s ease;
    }
    
    .problem-card:nth-child(3):hover .problem-icon svg {
      animation: lottieChat 1.5s ease-in-out infinite;
    }
    
    /* Feature 1 Upload SVG inner arrow */
    .feature-block:nth-child(1):hover .feature-visual svg polyline,
    .feature-block:nth-child(1):hover .feature-visual svg line {
      animation: lottieUpload 1s ease-in-out infinite;
      stroke: var(--accent);
      transition: stroke 0.3s ease;
    }
    
    /* Feature icons color transition */
    .feature-block:hover .feature-visual svg {
      animation: lottiePulseGlow 2s ease-in-out infinite;
    }
`;

html = html.replace('</style>', css + '\n</style>');
fs.writeFileSync('index.html', html);
console.log('patched');
