const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove modal CSS
const modalCSSRegex = /\.modal-overlay\s*\{[\s\S]*?\}\s*\.modal-card\s*\{[\s\S]*?\}\s*\.modal-overlay\.open\s*\{[\s\S]*?\}\s*\.modal-overlay\.open\s*\.modal-card\s*\{[\s\S]*?\}\s*\.modal-close\s*\{[\s\S]*?\}\s*\.modal-close:hover\s*\{[\s\S]*?\}/;
html = html.replace(modalCSSRegex, '');

// 2. Remove modal HTML
const modalHTMLRegex = /<!-- Forgot Password Modal -->[\s\S]*?<div id="forgot-password-modal"[\s\S]*?<\/div>\s*<\/div>/;
html = html.replace(modalHTMLRegex, '');

// 3. Inject new container into the auth-card
const forgotContainerHTML = `
      <!-- FORGOT PASSWORD FORM -->
      <div id="forgot-container" style="display: none; opacity: 0;">
        <h2 class="auth-title">Reset Password</h2>
        <p class="auth-subtitle">Enter your email to receive a reset link.</p>
        
        <div id="forgot-status" style="display:none; font-size:14px; margin-bottom:16px; text-align:center; padding: 12px; border-radius: 8px;"></div>
        
        <form onsubmit="handleForgotPassword(event)">
          <div class="auth-field">
            <label>Email address</label>
            <input type="email" id="forgot-email" required />
          </div>
          <button type="submit" class="btn btn-primary auth-submit" id="forgot-btn">Send Reset Link</button>
        </form>
        <p class="auth-bottom"><a href="/login" onclick="navTo('/login', event)">Back to Sign In</a></p>
      </div>
`;

// Insert it right after the login-container closing div
html = html.replace('</form>\n        <p class="auth-bottom">Don\'t have an account? <a href="/signup" onclick="navTo(\'/signup\', event)">Sign up for free</a></p>\n      </div>', 
  `</form>\n        <p class="auth-bottom">Don't have an account? <a href="/signup" onclick="navTo('/signup', event)">Sign up for free</a></p>\n      </div>\n${forgotContainerHTML}`);

// 4. Update routing JS references
html = html.replace(
  'const signupContainer = document.getElementById(\'signup-container\');\n    const loginContainer = document.getElementById(\'login-container\');',
  'const signupContainer = document.getElementById(\'signup-container\');\n    const loginContainer = document.getElementById(\'login-container\');\n    const forgotContainer = document.getElementById(\'forgot-container\');'
);

const newShowAuthStr = `
        if (type === 'signup') {
          loginContainer.style.display = 'none';
          loginContainer.style.opacity = '0';
          if(forgotContainer) { forgotContainer.style.display = 'none'; forgotContainer.style.opacity = '0'; }
          signupContainer.style.display = 'block';
          setTimeout(() => signupContainer.style.opacity = '1', 50);
        } else if (type === 'forgot') {
          signupContainer.style.display = 'none';
          signupContainer.style.opacity = '0';
          loginContainer.style.display = 'none';
          loginContainer.style.opacity = '0';
          if(forgotContainer) {
            forgotContainer.style.display = 'block';
            setTimeout(() => forgotContainer.style.opacity = '1', 50);
          }
        } else {
          signupContainer.style.display = 'none';
          signupContainer.style.opacity = '0';
          if(forgotContainer) { forgotContainer.style.display = 'none'; forgotContainer.style.opacity = '0'; }
          loginContainer.style.display = 'block';
          setTimeout(() => loginContainer.style.opacity = '1', 50);
        }`;

html = html.replace(/if \(type === 'signup'\) \{[\s\S]*?setTimeout\(\(\) => loginContainer\.style\.opacity = '1', 50\);\n        \}/, newShowAuthStr);

// handleRoute
html = html.replace(
  'if (path === \'/signup\') {\n        showAuth(\'signup\');\n      } else if (path === \'/login\') {\n        showAuth(\'login\');\n      } else {',
  'if (path === \'/signup\') {\n        showAuth(\'signup\');\n      } else if (path === \'/login\') {\n        showAuth(\'login\');\n      } else if (path === \'/forgot-password\') {\n        showAuth(\'forgot\');\n      } else {'
);

// Initial DOMContentLoaded
const oldDOMContentStr = `
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
        }`;

const newDOMContentStr = `
        if (path === '/signup') {
          loginContainer.style.display = 'none';
          loginContainer.style.opacity = '0';
          if(forgotContainer) { forgotContainer.style.display = 'none'; forgotContainer.style.opacity = '0'; }
          signupContainer.style.display = 'block';
          signupContainer.style.opacity = '1';
        } else if (path === '/forgot-password') {
          signupContainer.style.display = 'none';
          signupContainer.style.opacity = '0';
          loginContainer.style.display = 'none';
          loginContainer.style.opacity = '0';
          if(forgotContainer) {
            forgotContainer.style.display = 'block';
            forgotContainer.style.opacity = '1';
          }
        } else {
          signupContainer.style.display = 'none';
          signupContainer.style.opacity = '0';
          if(forgotContainer) { forgotContainer.style.display = 'none'; forgotContainer.style.opacity = '0'; }
          loginContainer.style.display = 'block';
          loginContainer.style.opacity = '1';
        }`;

html = html.replace(oldDOMContentStr, newDOMContentStr);
html = html.replace("if (path === '/signup' || path === '/login')", "if (path === '/signup' || path === '/login' || path === '/forgot-password')");

// Intercept clicking
html = html.replace(
  'if (href === \'/signup\' || href === \'/login\') {',
  'if (href === \'/signup\' || href === \'/login\' || href === \'/forgot-password\') {'
);

// 5. Link update
html = html.replace(
  '<a href="#" onclick="openForgotPassword(event)" style="font-size:13px; color:var(--accent); text-decoration:none; cursor:pointer;">Forgot password?</a>',
  '<a href="/forgot-password" onclick="navTo(\'/forgot-password\', event)" style="font-size:13px; color:var(--accent); text-decoration:none; cursor:pointer;">Forgot password?</a>'
);

// 6. Remove open/close/click JS functions
const closeFuncsRegex = /window\.openForgotPassword = function\(e\) \{[\s\S]*?window\.closeForgotPassword = function\(\) \{[\s\S]*?\}, 300\);\n    \}/;
html = html.replace(closeFuncsRegex, '');

// Also remove the click-outside listener
const clickOutsideRegex = /\/\/ Close modal on click outside\s*document\.addEventListener\('click', \(e\) => \{[\s\S]*?\}\);\s*/;
html = html.replace(clickOutsideRegex, '');

// Fix the handleForgotPassword setTimeout not to call closeForgotPassword anymore
html = html.replace(
  'closeForgotPassword();\n            if (statusMsg) statusMsg.style.display = \'none\';',
  'if (statusMsg) statusMsg.style.display = \'none\';'
);

fs.writeFileSync('index.html', html);
console.log('Converted modal to page');
