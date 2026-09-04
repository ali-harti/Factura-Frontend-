const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace all instances of `color: white;` with `color: var(--text);` or completely remove them if body text color cascades.
// Let's replace inline styles first.
html = html.replace(/color: white;/g, 'color: var(--text);');
html = html.replace(/background: white;/g, 'background: var(--text);');

// Let's also check CSS block
html = html.replace(/color: white;/g, 'color: var(--text);');

fs.writeFileSync('index.html', html);
console.log('patched');
