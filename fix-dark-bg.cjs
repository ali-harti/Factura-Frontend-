const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The stats bar and footer currently have a hardcoded dark background `#0a0a0a`
// We should change these to rely on a dynamic variable, or explicitly invert them in light mode.

html = html.replace(/background: #0a0a0a;/g, 'background: var(--bg-alt, #0a0a0a);');

// Let's define --bg-alt for light mode
const lightCssRegex = /(:root\[data-theme="light"\] \{[\s\S]*?)(\})/;
html = html.replace(lightCssRegex, '$1  --bg-alt: #f4f4f5;\n$2');

fs.writeFileSync('index.html', html);
console.log('patched');
