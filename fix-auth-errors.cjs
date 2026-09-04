const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The block to replace: from window.handleSignup to the end of triggerGoogleAuth
const oldRegex = /window\.handleSignup = function\(e\) \{[\s\S]*?window\.triggerGoogleAuth = function\(\) \{[\s\S]*?\}\s*\}/;

const newBlock = `
    // Auth Error Utilities
    function showAuthError(formType, message) {
      const banner = document.getElementById(formType + '-error');
      if (banner) {
        banner.textContent = message;
        banner.style.display = 'block';
      }
    }
    
    function hideAuthError(formType) {
      const banner = document.getElementById(formType + '-error');
      if (banner) banner.style.display = 'none';
    }

    // Form Handlers
    window.handleSignup = function(e) {
      e.preventDefault();
      hideAuthError('signup');
      
      const pwd = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      const err = document.getElementById('signup-pwd-err');
      
      if (pwd !== confirm) {
        err.style.display = 'block';
        showAuthError('signup', 'Passwords do not match. Please try again.');
        return;
      }
      err.style.display = 'none';
      
      const btn = document.getElementById('signup-btn');
      btn.style.opacity = '0.7';
      btn.textContent = 'Creating...';
      
      // Simulate API call
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.textContent = 'Create account';
        navTo('/app');
      }, 1000);
    }

    window.handleLogin = function(e) {
      e.preventDefault();
      hideAuthError('login');
      
      const email = document.getElementById('login-email').value;
      const btn = document.getElementById('login-btn');
      btn.style.opacity = '0.7';
      btn.textContent = 'Signing in...';
      
      // Simulate API call
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.textContent = 'Sign in';
        if (email.toLowerCase().includes('error')) {
          showAuthError('login', 'Invalid email or password. Please try again.');
        } else {
          navTo('/app');
        }
      }, 1000);
    }

    // Google Identity Services (GIS) Callback
    function handleCredentialResponse(response) {
      const activeForm = window.location.pathname.replace('/', '') || 'login';
      hideAuthError(activeForm);
      console.log("Encoded JWT ID token: " + response.credential);
      
      // Simulate backend validation delay
      setTimeout(() => {
        navTo('/app');
      }, 500);
    }

    window.triggerGoogleAuth = function() {
      // Determine which form is currently active to show the error on the right banner
      const activeForm = window.location.pathname.replace('/', '') || 'login';
      hideAuthError(activeForm);
      
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Placeholder
          callback: handleCredentialResponse
        });
        
        // Display the One Tap UI, and handle cancellation/skip errors
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment() || notification.isDismissedMoment()) {
             showAuthError(activeForm, "Google Sign-In was cancelled or blocked by your browser. Please try again or use your email.");
          }
        });
      } else {
         showAuthError(activeForm, "Google authentication service is currently unavailable. Please check your connection.");
      }
    }`;

html = html.replace(oldRegex, newBlock);
fs.writeFileSync('index.html', html);
console.log('Fixed auth errors UI');
