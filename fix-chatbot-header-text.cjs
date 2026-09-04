const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Looking at the screenshot, the orange header block is at the top of the chat window, but the text "Factura Assistant" and the SVG icons are MISSING from inside it. 
// It looks like the text color is matching the background color or it's being hidden by some flex rules.
// Let's add a high-contrast text color and explicit z-index to the contents.

html = html.replace('.chatbot-header {\n      padding: 1.5rem 1rem;\n      font-size: 1.1rem;', '.chatbot-header {\n      padding: 1.5rem 1rem;\n      font-size: 1.1rem;\n      color: #ffffff;\n      position: relative;\n      z-index: 10;');

// Also, let's make sure the text isn't black in dark mode
html = html.replace('Factura Assistant', '<span style="color: white !important; font-weight: bold; z-index: 10; position: relative;">Factura Assistant</span>');

fs.writeFileSync('index.html', html);
console.log('Fixed chatbot header text');
