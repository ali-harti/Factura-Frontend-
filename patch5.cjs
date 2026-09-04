const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS for slate theme
const rootCssRegex = /(:root {[\s\S]*?})/;
const slateCss = `\n    :root[data-theme="slate"] {
      --bg: #18181b; /* Warmer slate (zinc) */
      --card: #27272a;
      --text-muted: rgba(255, 255, 255, 0.75); /* Better contrast */
      --border: rgba(255, 255, 255, 0.15);
      --border-light: rgba(255, 255, 255, 0.08);
    }`;
html = html.replace(rootCssRegex, `$1${slateCss}`);

// 2. Add Button CSS
const btnCss = `
    .theme-toggle {
      background: none;
      border: 1px solid var(--border);
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: all 0.2s;
    }
    .theme-toggle:hover {
      background: var(--border-light);
      color: var(--text);
      border-color: var(--text-muted);
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
`;
html = html.replace(/(<\/style>)/, `${btnCss}$1`);

// 3. Update Navbar HTML
const navHTMLRegex = /<div class="nav-links">[\s\S]*?<\/div>\s*<a href="#pricing" class="btn btn-primary">Get Started<\/a>/;
const newNavHTML = `<div class="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="nav-actions">
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </button>
        <a href="#pricing" class="btn btn-primary">Get Started</a>
      </div>`;
html = html.replace(navHTMLRegex, newNavHTML);

// 4. Add JavaScript
const jsCode = `
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'slate') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', 'slate');
        }
      });
    }
`;
html = html.replace(/(<script>)/, `$1${jsCode}`);

fs.writeFileSync('index.html', html);
console.log('patched');
