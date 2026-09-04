const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCSS = `    .auth-logo-wrap .logo img {
      width: 48px !important;
      height: 48px !important;
      margin: 0 12px 0 0 !important;
      animation: none !important;
      transform: none !important;
      filter: none !important;
    }`;

const newCSS = `    .auth-logo-wrap .logo img {
      width: 150px !important;
      height: 150px !important;
      margin: -45px -42px -45px -45px !important;
      animation: none !important;
      transform: none !important;
    }`;

html = html.replace(oldCSS, newCSS);

// Let's also check if there is an SVG they meant for the logo, or if the coral color is needed.
// I will apply a CSS filter to tint the white PNG to coral (#E8724A) if it's white.
// Actually, if the prompt says "make teh logo here bigger", I'll just focus on size and negative margins first.

fs.writeFileSync('index.html', html);
console.log('Fixed auth logo size');
