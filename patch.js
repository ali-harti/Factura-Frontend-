const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /\.logo \{[\s\S]*?gap: 0\.75rem;[\s\S]*?\}/,
  `.logo {
      display: flex;
      align-items: center;
      gap: 0;
      font-weight: 700;
      font-size: 1.5rem;
      letter-spacing: -0.02em;
    }
    .logo img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin: -20px -16px -20px -24px;
    }`
);

html = html.replace(
  /<img src="\/logo\.png" alt="Factura Logo" style="[^"]+" \/>/g,
  `<img src="/logo.png" alt="Factura Logo" />`
);

fs.writeFileSync('index.html', html);
console.log('patched');
