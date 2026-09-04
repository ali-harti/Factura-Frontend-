const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/border-color: rgba\(255, 255, 255, 0.2\);/g, 'border-color: var(--border);');
html = html.replace(/background-color: rgba\(255, 255, 255, 0.05\);/g, 'background-color: var(--border-light);');

fs.writeFileSync('index.html', html);
console.log('patched');
