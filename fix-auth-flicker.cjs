const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the DOMContentLoaded logic to handle instant display
html = html.replace(
  '// Handle initial load\n    document.addEventListener(\'DOMContentLoaded\', () => {\n      handleRoute(window.location.pathname);\n    });',
  `// Handle initial load
    document.addEventListener('DOMContentLoaded', () => {
      const path = window.location.pathname;
      if (path === '/signup' || path === '/login') {
        landingView.style.display = 'none';
        landingView.style.opacity = '0';
        authView.style.display = 'flex';
        authView.style.opacity = '1';
        authCard.classList.add('enter');
        
        if (path === '/signup') {
          loginContainer.style.display = 'none';
          loginContainer.style.opacity = '0';
          signupContainer.style.display = 'block';
          signupContainer.style.opacity = '1';
        } else {
          signupContainer.style.display = 'none';
          signupContainer.style.opacity = '0';
          loginContainer.style.display = 'block';
          loginContainer.style.opacity = '1';
        }
        updateNavForAuth(true);
      } else {
        handleRoute(path);
      }
    });`
);

fs.writeFileSync('index.html', html);
console.log('Fixed initial auth flicker');
