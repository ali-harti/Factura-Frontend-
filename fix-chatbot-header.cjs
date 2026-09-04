const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The issue in the screenshot is that the header text isn't fully visible or styled correctly.
// Also, the chatbot is returning an error which implies API key or server issue.
// First, let's fix the CSS for the window to make sure z-index is high enough.

html = html.replace('.chatbot-window {', '.chatbot-window {\n      z-index: 99999;');
html = html.replace('.chatbot-toggle {', '.chatbot-toggle {\n      z-index: 99999;');
html = html.replace('.chatbot-header {', '.chatbot-header {\n      padding: 1.5rem 1rem;\n      font-size: 1.1rem;');

fs.writeFileSync('index.html', html);
console.log('Fixed chatbot header');
