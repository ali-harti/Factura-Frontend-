const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /const dict = \{[\s\S]*?\};/;
const match = html.match(regex);
let newDict = match[0].replace('};', `
      // Additional elements
      "$0": "0 €",
      "$199": "199 €",
      "© 2026 Factura. All rights reserved.": "© 2026 Factura. Tous droits réservés."
    };`);
html = html.replace(regex, newDict);

fs.writeFileSync('index.html', html);
console.log('patched');
