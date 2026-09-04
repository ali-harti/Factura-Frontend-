const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bodyRegex = /body\s*\{([\s\S]*?)\}/;
html = html.replace(bodyRegex, `body {\n$1  transition: background-color 0.5s ease, color 0.5s ease;\n}`);

// Add transition to other main layout elements for a completely smooth effect
const otherElements = `
    /* Smooth Theme Transitions */
    body, header, footer, .stats, .problem-card, .pricing-card, .faq-btn, .faq-content, .upload-area, .btn-outline {
      transition: background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease;
    }
`;
html = html.replace('/* Typography */', otherElements + '\n    /* Typography */');

fs.writeFileSync('index.html', html);
console.log('patched');
