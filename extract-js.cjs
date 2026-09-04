const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g);
let js = '';
let count = 0;
for (const match of scriptMatches) {
  if (match[1].trim()) {
    js += `\n/* SCRIPT ${count} */\n` + match[1];
    count++;
  }
}
fs.writeFileSync('test.js', js);
