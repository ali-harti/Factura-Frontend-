const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const glowCSS = `
    /* Mouse-following Radial Glow */
    .feature-block::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
        rgba(232, 114, 74, 0.12), /* using the accent color */
        transparent 40%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
      pointer-events: none;
      border-radius: inherit;
    }
    .feature-block:hover::before {
      opacity: 1;
    }
    
    /* Slightly lighter glow for light mode */
    [data-theme='light'] .feature-block::before {
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
        rgba(232, 114, 74, 0.05), 
        transparent 40%
      );
    }
`;

html = html.replace('</style>', glowCSS + '\n</style>');

const glowJS = `
    // Mouse-following Radial Glow for Feature Blocks
    document.querySelectorAll('.feature-block').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', \`\${x}px\`);
        card.style.setProperty('--mouse-y', \`\${y}px\`);
      });
    });
`;

html = html.replace('</script>', glowJS + '\n  </script>');

fs.writeFileSync('index.html', html);
console.log('patched mouse glow');
