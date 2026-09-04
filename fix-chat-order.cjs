const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Extract the chatbot HTML
const chatHTMLRegex = /<!-- Chatbot -->[\s\S]*?<\/form>\s*<\/div>/;
const chatHTMLMatch = html.match(chatHTMLRegex);

if (chatHTMLMatch) {
  const chatHTML = chatHTMLMatch[0];
  // Remove it from current position
  html = html.replace(chatHTMLRegex, '');
  // Place it right before the opening <script> tag
  html = html.replace('<script>', chatHTML + '\n\n  <script>');
  fs.writeFileSync('index.html', html);
  console.log('Fixed chat HTML order');
} else {
  console.log('Could not find chat HTML');
}
