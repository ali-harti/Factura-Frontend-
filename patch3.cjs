const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="sp-logos">[\s\S]*?<\/div>/;

const newLogos = `<div class="sp-logos">
        <img src="https://cdn.simpleicons.org/stripe/white" alt="Stripe" height="32" style="opacity: 0.5; filter: grayscale(100%);">
        <img src="https://cdn.simpleicons.org/microsoft/white" alt="Microsoft" height="32" style="opacity: 0.5; filter: grayscale(100%);">
        <img src="https://cdn.simpleicons.org/uber/white" alt="Uber" height="32" style="opacity: 0.5; filter: grayscale(100%);">
        <img src="https://cdn.simpleicons.org/airbnb/white" alt="Airbnb" height="32" style="opacity: 0.5; filter: grayscale(100%);">
        <img src="https://cdn.simpleicons.org/spotify/white" alt="Spotify" height="32" style="opacity: 0.5; filter: grayscale(100%);">
      </div>`;

html = html.replace(regex, newLogos);

fs.writeFileSync('index.html', html);
console.log('patched');
