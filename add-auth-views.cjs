const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Modify the navbar HTML to include a Sign In link and add IDs so we can hide them
html = html.replace(
  '<a href="#pricing" class="btn btn-primary">Get Started</a>',
  '<a href="/login" class="nav-signin" style="color: var(--text); font-weight: 500; text-decoration: none; margin-right: 16px; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent)\'" onmouseout="this.style.color=\'var(--text)\'">Sign In</a>\n        <a href="/signup" class="btn btn-primary nav-get-started">Get Started</a>'
);
html = html.replace('<div class="nav-links">', '<div class="nav-links" id="nav-center-links">');
html = html.replace('href="#features"', 'href="/#features"');
html = html.replace('href="#how-it-works"', 'href="/#how-it-works"');
html = html.replace('href="#pricing"', 'href="/#pricing"');
html = html.replace('href="#faq"', 'href="/#faq"');
html = html.replace('class="nav-signin"', 'class="nav-signin" id="nav-signin"');
html = html.replace('class="btn btn-primary nav-get-started"', 'class="btn btn-primary nav-get-started" id="nav-get-started"');
html = html.replace('href="#pricing" class="btn btn-primary">Start for free', 'href="/signup" class="btn btn-primary">Start for free');


// Wrap the main content in #landing-view
html = html.replace('<!-- Hero -->', '<div id="landing-view">\n  <!-- Hero -->');

// Find the end of footer
html = html.replace('</footer>', '</footer>\n  </div> <!-- End landing-view -->\n');

// Now inject the auth view container right after landing-view
const authViewHTML = `
  <div id="auth-view" style="display: none; opacity: 0; transition: opacity 0.5s ease-in-out; position: absolute; top: 80px; left: 0; width: 100%; min-height: calc(100vh - 80px); z-index: 10; align-items: center; justify-content: center; padding: 2rem 1rem;">
    <div class="auth-card" id="auth-card">
      <div class="auth-logo-wrap">
         <div class="logo">
           <img src="/logo.png" alt="Factura Logo" />
           Factura
         </div>
      </div>
      
      <!-- SIGNUP FORM -->
      <div id="signup-container">
        <h2 class="auth-title">Create your account</h2>
        <p class="auth-subtitle">Start extracting invoices in minutes</p>
        
        <div id="signup-error" class="auth-banner" style="display:none;"></div>
        
        <button class="google-btn" onclick="triggerGoogleAuth()">
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <form id="signup-form" onsubmit="handleSignup(event)">
          <div class="auth-field">
            <label>Full name</label>
            <input type="text" id="signup-name" required />
          </div>
          <div class="auth-field">
            <label>Email</label>
            <input type="email" id="signup-email" required />
          </div>
          <div class="auth-field">
            <label>Password</label>
            <div class="password-wrap">
              <input type="password" id="signup-password" required oninput="checkPasswordStrength(this.value)" />
              <button type="button" class="pwd-toggle" onclick="togglePwd('signup-password')">Show</button>
            </div>
            <div class="pwd-strength">
              <div class="pwd-seg" id="seg-1"></div>
              <div class="pwd-seg" id="seg-2"></div>
              <div class="pwd-seg" id="seg-3"></div>
              <div class="pwd-seg" id="seg-4"></div>
            </div>
          </div>
          <div class="auth-field">
            <label>Confirm password</label>
            <input type="password" id="signup-confirm" required />
            <div id="signup-pwd-err" class="inline-err" style="display:none;">Passwords do not match</div>
          </div>
          <div class="auth-terms">
            <label>
              <input type="checkbox" required />
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>
          </div>
          <button type="submit" class="btn btn-primary auth-submit" id="signup-btn">Create account</button>
        </form>
        <p class="auth-bottom">Already have an account? <a href="/login" onclick="navTo('/login', event)">Sign in</a></p>
      </div>

      <!-- LOGIN FORM -->
      <div id="login-container" style="display: none; opacity: 0;">
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-subtitle">Sign in to your Factura account</p>
        
        <div id="login-error" class="auth-banner" style="display:none;"></div>

        <button class="google-btn" onclick="triggerGoogleAuth()">
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <form id="login-form" onsubmit="handleLogin(event)">
          <div class="auth-field">
            <label>Email</label>
            <input type="email" id="login-email" required />
          </div>
          <div class="auth-field">
            <div style="display:flex; justify-content:space-between;">
              <label>Password</label>
              <a href="#" style="font-size:13px; color:var(--accent); text-decoration:none;">Forgot password?</a>
            </div>
            <div class="password-wrap">
              <input type="password" id="login-password" required />
              <button type="button" class="pwd-toggle" onclick="togglePwd('login-password')">Show</button>
            </div>
          </div>
          <div class="auth-terms">
            <label>
              <input type="checkbox" />
              <span style="color:var(--text-muted);">Keep me signed in</span>
            </label>
          </div>
          <button type="submit" class="btn btn-primary auth-submit" id="login-btn">Sign in</button>
        </form>
        <p class="auth-bottom">Don't have an account? <a href="/signup" onclick="navTo('/signup', event)">Sign up for free</a></p>
      </div>

    </div>
  </div>
`;

html = html.replace('</div> <!-- End landing-view -->', '</div> <!-- End landing-view -->\n' + authViewHTML);

// Add GIS script to head
html = html.replace('</head>', '  <script src="https://accounts.google.com/gsi/client" async defer></script>\n</head>');

fs.writeFileSync('index.html', html);
console.log('Added Auth Views');
