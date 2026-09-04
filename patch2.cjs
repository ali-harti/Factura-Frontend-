const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Looking at the grep output, the 🇸🇦 flag is actually already in the file:
// <div class="flags">🇺🇸 🇫🇷 🇸🇦 🇩🇪 🇯🇵 🇧🇷 🇮🇳 🇨🇳</div>
// The user might be asking for an explicit label like 'Arabic' or something similar,
// but the prompt says: "add also arabic here: 🇺🇸 🇫🇷 🇸🇦 🇩🇪 🇯🇵 🇧🇷 🇮🇳 🇨🇳"
// Let's add the UAE flag 🇦🇪 and Egypt 🇪🇬 to make Arabic support more prominent if they meant flags.

html = html.replace(
  /<div class="flags">🇺🇸 🇫🇷 🇸🇦 🇩🇪 🇯🇵 🇧🇷 🇮🇳 🇨🇳<\/div>/,
  `<div class="flags">🇺🇸 🇫🇷 🇸🇦 🇦🇪 🇪🇬 🇩🇪 🇯🇵 🇧🇷 🇮🇳 🇨🇳</div>`
);

fs.writeFileSync('index.html', html);
console.log('patched');
