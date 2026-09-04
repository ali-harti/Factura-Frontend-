const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /walkDom\(document\.body, \(node\) => \{([\s\S]*?)\}\);/g;
html = html.replace(regex, `walkDom(document.body, (node) => {
        if (!node.nodeValue) return;
        const text = node.nodeValue.trim();
        if (!text) return;
        const strippedText = text.replace(/\\s+/g, ' '); 
        
        let matchedFr = dict[strippedText];
        if (matchedFr) {
          textNodes.push({ node, en: text, fr: matchedFr });
        } else if (strippedText === 'How it works' && node.parentNode && node.parentNode.tagName === 'H2') {
           textNodes.push({ node, en: text, fr: dict['How it works_section'] || "Comment ça marche" });
        }
      });`);
fs.writeFileSync('index.html', html);
