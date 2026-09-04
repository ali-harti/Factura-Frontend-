const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const moreCSS = `
    /* Feature 2: JSON Animation */
    @keyframes typingCursor {
      0%, 100% { border-right-color: transparent; }
      50% { border-right-color: var(--accent); }
    }
    
    .feature-block:nth-child(2):hover .feature-visual div {
      border-right: 2px solid transparent;
      animation: typingCursor 0.8s step-end infinite;
    }

    /* Problem Cards: Ensure stroke colors transition cleanly */
    .problem-icon svg {
      transition: stroke 0.3s ease;
    }
    .problem-card:hover .problem-icon svg {
      stroke: var(--accent);
    }
    
    /* Ensure the clock animation works from the center */
    .problem-card:nth-child(1) .problem-icon svg polyline {
      transform-origin: 12px 12px;
    }
`;

html = html.replace('</style>', moreCSS + '\n</style>');
fs.writeFileSync('index.html', html);
console.log('patched again');
