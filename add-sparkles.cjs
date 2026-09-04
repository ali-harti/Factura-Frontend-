const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bgCSS = `
    /* Background Animated Orbs */
    .bg-orbs {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      overflow: hidden;
      z-index: -6;
      pointer-events: none;
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.6;
      animation: floatOrb 25s infinite ease-in-out alternate;
    }
    .orb-1 {
      width: 50vw; height: 50vw;
      max-width: 600px; max-height: 600px;
      background: var(--accent-glow);
      top: -10%; left: -10%;
    }
    .orb-2 {
      width: 40vw; height: 40vw;
      max-width: 500px; max-height: 500px;
      background: rgba(150, 150, 150, 0.1);
      bottom: -10%; right: -5%;
      animation-delay: -12s;
      animation-direction: alternate-reverse;
    }
    [data-theme="light"] .orb-2 {
      background: rgba(0, 0, 0, 0.05);
    }
    @keyframes floatOrb {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(3vw, -5vh) scale(1.1); }
      66% { transform: translate(-2vw, 2vh) scale(0.9); }
      100% { transform: translate(4vw, 4vh) scale(1.2); }
    }
`;
html = html.replace('</style>', bgCSS + '\n</style>');

const orbsHTML = `
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
  </div>`;
html = html.replace('<body>', '<body>' + orbsHTML);

const bgJS = `
    // Sparkle Canvas Particle System
    const bgCanvas = document.createElement('canvas');
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100vw';
    bgCanvas.style.height = '100vh';
    bgCanvas.style.pointerEvents = 'none';
    bgCanvas.style.zIndex = '-5';
    document.body.prepend(bgCanvas);

    const bgCtx = bgCanvas.getContext('2d');
    let bgParticles = [];
    let cw, ch;

    function initBgCanvas() {
        cw = window.innerWidth;
        ch = window.innerHeight;
        bgCanvas.width = cw;
        bgCanvas.height = ch;
        bgParticles = [];
        // Create particles based on screen size (roughly 1 per 12000 pixels)
        const numParticles = Math.min(Math.floor((cw * ch) / 12000), 150);
        for (let i = 0; i < numParticles; i++) {
            bgParticles.push({
                x: Math.random() * cw,
                y: Math.random() * ch,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random(),
                dAlpha: (Math.random() - 0.5) * 0.015,
                isAccent: Math.random() > 0.85 // 15% of particles are accent color
            });
        }
    }

    function animateBgCanvas() {
        bgCtx.clearRect(0, 0, cw, ch);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const baseColor = isLight ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
        const accentColor = 'rgba(232, 114, 74, '; // --accent rgb approx

        bgParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha += p.dAlpha;

            if (p.alpha <= 0.05 || p.alpha >= 0.8) p.dAlpha *= -1;
            
            if (p.x < 0) p.x = cw;
            if (p.x > cw) p.x = 0;
            if (p.y < 0) p.y = ch;
            if (p.y > ch) p.y = 0;

            bgCtx.beginPath();
            bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            bgCtx.fillStyle = (p.isAccent ? accentColor : baseColor) + p.alpha + ')';
            bgCtx.fill();
        });
        requestAnimationFrame(animateBgCanvas);
    }

    window.addEventListener('resize', initBgCanvas);
    initBgCanvas();
    animateBgCanvas();
`;
html = html.replace('</script>', bgJS + '\n  </script>');

fs.writeFileSync('index.html', html);
console.log('patched sparkles');
