const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I will make the font even bigger, matching the requested screenshot more closely
html = html.replace('font-size: 2.25rem;', 'font-size: 3rem;');

// And make sure the image sizing reflects a larger scale
html = html.replace('width: 150px !important;', 'width: 180px !important;');
html = html.replace('height: 150px !important;', 'height: 180px !important;');
html = html.replace('margin: -45px -42px -45px -45px !important;', 'margin: -50px -55px -50px -55px !important;');

fs.writeFileSync('index.html', html);
console.log('Made auth logo even bigger');
