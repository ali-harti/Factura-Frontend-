const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The logo in the navbar
const oldLogoHTML = `<div class="logo">
        <img src="/logo.png" alt="Factura Logo" />
        Factura
      </div>`;
      
const newLogoHTML = `<a href="/" onclick="navTo('/', event)" class="logo" style="text-decoration: none; color: inherit;">
        <img src="/logo.png" alt="Factura Logo" />
        Factura
      </a>`;

html = html.replace(oldLogoHTML, newLogoHTML);

// Intercept clicks logic - make sure '/' is handled
html = html.replace(
  'if (href === \'/signup\' || href === \'/login\' || href === \'/forgot-password\') {',
  'if (href === \'/\' || href === \'/signup\' || href === \'/login\' || href === \'/forgot-password\') {'
);

fs.writeFileSync('index.html', html);
console.log('Fixed nav logo link');
