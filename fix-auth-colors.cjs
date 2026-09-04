const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newRoot = `:root {
      --bg: #0d0a08;
      --card: #1a1410;
      --accent: #E8724A;
      --accent-glow: rgba(232, 114, 74, 0.3);
      --text: #ffffff;
      --text-muted: #888888;
      --border: #2a2018;
      --border-light: rgba(255, 255, 255, 0.05);
    }`;

html = html.replace(/:root\s*\{[^}]*\}/, newRoot);
fs.writeFileSync('index.html', html);
console.log('Fixed root colors');
