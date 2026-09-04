const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
`      }
    }
    }

    // Chatbot Logic`,
`      }
    }

    // Chatbot Logic`
);

fs.writeFileSync('index.html', html);
console.log('Fixed extra brace');
