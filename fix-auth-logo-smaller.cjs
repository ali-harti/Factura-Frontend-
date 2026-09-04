const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('font-size: 3rem;', 'font-size: 2.25rem;');
html = html.replace('width: 180px !important;', 'width: 110px !important;');
html = html.replace('height: 180px !important;', 'height: 110px !important;');
html = html.replace('margin: -50px -55px -50px -55px !important;', 'margin: -35px -32px -35px -35px !important;');

fs.writeFileSync('index.html', html);
console.log('Scaled down auth logo');
