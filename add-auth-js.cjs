const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const authJS = `
    // Auth & Routing Logic
    const landingView = document.getElementById('landing-view');
    const authView = document.getElementById('auth-view');
    const authCard = document.getElementById('auth-card');
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    
    // Nav elements to toggle
    const navCenterLinks = document.getElementById('nav-center-links');
    const navSignin = document.getElementById('nav-signin');
    const navGetStarted = document.getElementById('nav-get-started');

    function updateNavForAuth(isAuthPage) {
      if (isAuthPage) {
        navCenterLinks.style.display = 'none';
        navSignin.style.display = 'none';
        navGetStarted.style.display = 'none';
      } else {
        navCenterLinks.style.display = 'flex';
        navSignin.style.display = 'inline-block';
        navGetStarted.style.display = 'inline-block';
      }
    }

    function showAuth(type) {
      // Hide landing smoothly
      landingView.style.transition = 'opacity 0.3s';
      landingView.style.opacity = '0';
      
      setTimeout(() => {
        landingView.style.display = 'none';
        authView.style.display = 'flex';
        
        // Slight delay to allow display:flex to apply before transition
        setTimeout(() => {
          authView.style.opacity = '1';
          authCard.classList.add('enter');
        }, 50);

        if (type === 'signup') {
          loginContainer.style.display = 'none';
          loginContainer.style.opacity = '0';
          signupContainer.style.display = 'block';
          setTimeout(() => signupContainer.style.opacity = '1', 50);
        } else {
          signupContainer.style.display = 'none';
          signupContainer.style.opacity = '0';
          loginContainer.style.display = 'block';
          setTimeout(() => loginContainer.style.opacity = '1', 50);
        }
      }, 300);
      
      updateNavForAuth(true);
    }

    function showLanding() {
      authView.style.opacity = '0';
      authCard.classList.remove('enter');
      
      setTimeout(() => {
        authView.style.display = 'none';
        landingView.style.display = 'block';
        setTimeout(() => {
          landingView.style.opacity = '1';
        }, 50);
      }, 500);
      
      updateNavForAuth(false);
    }

    // Handle History API
    function navTo(path, event) {
      if (event) event.preventDefault();
      
      // If we are already on the page we clicked, don't do anything
      if (window.location.pathname === path) return;
      
      window.history.pushState({}, '', path);
      handleRoute(path);
    }

    function handleRoute(path) {
      if (path === '/signup') {
        showAuth('signup');
      } else if (path === '/login') {
        showAuth('login');
      } else {
        showLanding();
      }
    }

    // Listen to back/forward buttons
    window.addEventListener('popstate', () => {
      handleRoute(window.location.pathname);
    });

    // Handle initial load
    document.addEventListener('DOMContentLoaded', () => {
      handleRoute(window.location.pathname);
    });

    // Intercept clicking on "Get Started" and "Sign In"
    document.addEventListener('click', (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href === '/signup' || href === '/login') {
        e.preventDefault();
        navTo(href);
      }
    });

    // Password features
    window.togglePwd = function(id) {
      const input = document.getElementById(id);
      const btn = input.nextElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
      } else {
        input.type = 'password';
        btn.textContent = 'Show';
      }
    }

    window.checkPasswordStrength = function(val) {
      const segs = [
        document.getElementById('seg-1'),
        document.getElementById('seg-2'),
        document.getElementById('seg-3'),
        document.getElementById('seg-4')
      ];
      // Reset
      segs.forEach(s => s.className = 'pwd-seg');
      
      if (!val) return;
      
      let strength = 0;
      if (val.length >= 8) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;
      
      for(let i=0; i<strength; i++) {
        segs[i].classList.add('s-' + strength);
      }
    }

    // Form Handlers
    window.handleSignup = function(e) {
      e.preventDefault();
      const pwd = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      const err = document.getElementById('signup-pwd-err');
      
      if (pwd !== confirm) {
        err.style.display = 'block';
        return;
      }
      err.style.display = 'none';
      
      const btn = document.getElementById('signup-btn');
      btn.style.opacity = '0.7';
      btn.textContent = 'Creating...';
      
      // Simulate API call
      setTimeout(() => {
        alert("Welcome to Factura!");
        navTo('/app');
      }, 1000);
    }

    window.handleLogin = function(e) {
      e.preventDefault();
      const btn = document.getElementById('login-btn');
      btn.style.opacity = '0.7';
      btn.textContent = 'Signing in...';
      
      // Simulate API call
      setTimeout(() => {
        navTo('/app');
      }, 1000);
    }

    // Google Identity Services (GIS) Callback
    function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      // Simulate backend auth success
      alert("Google Auth Successful!");
      navTo('/app');
    }

    window.triggerGoogleAuth = function() {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Placeholder
          callback: handleCredentialResponse
        });
        window.google.accounts.id.prompt(); // display the One Tap popup
      } else {
        alert("Google Auth Script not loaded yet.");
      }
    }
`;

html = html.replace('// Chatbot Logic', authJS + '\n\n    // Chatbot Logic');
fs.writeFileSync('index.html', html);
console.log('Added Auth JS');
