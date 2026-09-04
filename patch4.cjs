const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// regex to remove the entire social proof section
const regex = /<!-- Social Proof -->[\s\S]*?<\/section>/;

html = html.replace(regex, '');

fs.writeFileSync('index.html', html);
console.log('patched');
