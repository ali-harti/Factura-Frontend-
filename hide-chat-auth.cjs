const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  'navGetStarted.style.display = \'none\';',
  'navGetStarted.style.display = \'none\';\n        const chatTgl = document.getElementById(\'chatToggle\');\n        if(chatTgl) chatTgl.style.display = \'none\';'
);

html = html.replace(
  'navGetStarted.style.display = \'inline-block\';',
  'navGetStarted.style.display = \'inline-block\';\n        const chatTgl = document.getElementById(\'chatToggle\');\n        if(chatTgl) chatTgl.style.display = \'flex\';'
);

fs.writeFileSync('index.html', html);
console.log('Fixed chat toggle on auth');
