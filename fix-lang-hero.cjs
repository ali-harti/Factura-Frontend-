const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the animation logic to be reusable so we can call it on language swap
const jsRegex2 = /\/\/ Word-by-word reveal in hero[\s\S]*?\}\);[\s\S]*?\}/;
const newJs2 = `// Word-by-word reveal in hero
    const headline = document.querySelector('.hero-headline');
    let originalHeadlineText = { en: "Any invoice. Any language. Seconds.", fr: "Toute facture. Toute langue. En secondes." };
    
    function animateHeadline(lang) {
      if (!headline) return;
      const text = originalHeadlineText[lang];
      headline.innerHTML = '';
      text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.classList.add('reveal-word');
        span.style.animationDelay = \`\${i * 0.15}s\`;
        headline.appendChild(span);
        headline.appendChild(document.createTextNode(' '));
      });
    }
    
    // Initial animation
    animateHeadline('en');
`;
html = html.replace(jsRegex2, newJs2);

// And update the language toggle event listener to call animateHeadline
html = html.replace(/langToggle\.textContent = currentLang === 'en' \? 'FR' : 'EN';/, `langToggle.textContent = currentLang === 'en' ? 'FR' : 'EN';
        if (typeof animateHeadline === 'function') animateHeadline(currentLang);`);

fs.writeFileSync('index.html', html);
console.log('patched');
