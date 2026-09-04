const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const floatCSS = `
    /* Floating Logo Image Animation */
    @keyframes floatingLogo {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0;
      font-weight: 700;
      font-size: 1.5rem;
      letter-spacing: -0.02em;
      cursor: pointer;
      position: relative;
    }
    
    .logo img {
      width: 110px;
      height: 110px;
      object-fit: contain;
      margin: -35px -32px -35px -35px;
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.5s ease;
      animation: floatingLogo 3s ease-in-out infinite;
    }
    
    .logo:hover img {
      /* Pause the float on hover and apply the dynamic scale/rotate */
      animation-play-state: paused;
      transform: scale(1.15) rotate(5deg) translateY(-2px);
      filter: drop-shadow(0 0 10px var(--accent));
    }
`;

html = html.replace('</style>', floatCSS + '\n</style>');
fs.writeFileSync('index.html', html);
console.log('patched logo float');
