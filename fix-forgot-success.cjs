const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the forgot-container content
const oldForgotContainer = /<!-- FORGOT PASSWORD FORM -->\s*<div id="forgot-container" style="display: none; opacity: 0;">[\s\S]*?<p class="auth-bottom"><a href="\/login" onclick="navTo\('\/login', event\)">Back to Sign In<\/a><\/p>\s*<\/div>/;

const newForgotContainer = `<!-- FORGOT PASSWORD FORM -->
      <div id="forgot-container" style="display: none; opacity: 0;">
        
        <div id="forgot-entry-state">
          <h2 class="auth-title">Reset Password</h2>
          <p class="auth-subtitle">Enter your email to receive a reset link.</p>
          
          <div id="forgot-error-banner" class="auth-banner" style="display:none;"></div>
          
          <form onsubmit="handleForgotPassword(event)">
            <div class="auth-field">
              <label>Email address</label>
              <input type="email" id="forgot-email" required />
            </div>
            <button type="submit" class="btn btn-primary auth-submit" id="forgot-btn">Send Reset Link</button>
          </form>
          <p class="auth-bottom"><a href="/login" onclick="navTo('/login', event)">Back to Sign In</a></p>
        </div>

        <div id="forgot-success-state" style="display: none; text-align: center;">
          <div style="width: 64px; height: 64px; background: rgba(232, 114, 74, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"></path>
              <polyline points="22 7 12 14 2 7"></polyline>
              <path d="m16 19 2 2 4-4"></path>
            </svg>
          </div>
          <h2 class="auth-title">Check your email</h2>
          <p class="auth-subtitle" style="margin-bottom: 32px;">We've sent a password reset link to <br/><strong id="forgot-success-email" style="color: var(--text);"></strong></p>
          <button type="button" class="btn btn-primary auth-submit" onclick="navTo('/login', event)">Return to login</button>
        </div>

      </div>`;

html = html.replace(oldForgotContainer, newForgotContainer);

// Now update the JS logic
const jsOldRegex = /window\.handleForgotPassword = async function\(e\) \{[\s\S]*?\}\s*catch \(err\) \{[\s\S]*?\}\s*\}/;

const jsNew = `window.handleForgotPassword = async function(e) {
      e.preventDefault();
      const btn = document.getElementById('forgot-btn');
      const emailInput = document.getElementById('forgot-email');
      const email = emailInput.value;
      const errorBanner = document.getElementById('forgot-error-banner');
      const entryState = document.getElementById('forgot-entry-state');
      const successState = document.getElementById('forgot-success-state');
      const successEmailText = document.getElementById('forgot-success-email');
      
      btn.style.opacity = '0.7';
      btn.textContent = 'Sending...';
      btn.disabled = true;
      if (errorBanner) errorBanner.style.display = 'none';
      
      try {
        const response = await fetch('/api/v1/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        
        btn.style.opacity = '1';
        btn.textContent = 'Send Reset Link';
        btn.disabled = false;
        
        if (response.ok) {
          // Calculate height for smooth transition
          const authCard = document.getElementById('auth-card');
          const currentHeight = authCard.getBoundingClientRect().height;
          authCard.style.height = currentHeight + 'px';
          authCard.style.overflow = 'hidden';
          
          // Cross-fade internal states
          entryState.style.transition = 'opacity 0.2s ease-out';
          entryState.style.opacity = '0';
          
          setTimeout(() => {
            entryState.style.display = 'none';
            successEmailText.textContent = email;
            successState.style.display = 'block';
            successState.style.opacity = '0';
            successState.style.transition = 'opacity 0.2s ease-in';
            
            // Reflow and adjust height
            authCard.style.height = 'auto';
            const newHeight = authCard.getBoundingClientRect().height;
            authCard.style.height = currentHeight + 'px';
            void authCard.offsetHeight;
            authCard.style.height = newHeight + 'px';
            
            successState.style.opacity = '1';
            
            setTimeout(() => {
              authCard.style.height = 'auto';
              authCard.style.overflow = 'visible';
            }, 300);
          }, 200);
          
        } else {
          if (errorBanner) {
            errorBanner.textContent = data.error || "An error occurred. Please try again.";
            errorBanner.style.display = 'block';
          }
        }
      } catch (err) {
        btn.style.opacity = '1';
        btn.textContent = 'Send Reset Link';
        btn.disabled = false;
        if (errorBanner) {
          errorBanner.textContent = "A network error occurred. Please try again.";
          errorBanner.style.display = 'block';
        }
      }
    }`;

html = html.replace(jsOldRegex, jsNew);

// Since we added transition classes, we should also reset them when toggling auth views
// Add reset logic to showAuth
const showAuthRegex = /if \(forgotContainer\) \{\s*forgotContainer\.style\.display = type === 'forgot' \? 'block' : 'none';\s*forgotContainer\.style\.opacity = type === 'forgot' \? '1' : '0';\s*\}/;

const showAuthReplacement = `if (forgotContainer) {
              forgotContainer.style.display = type === 'forgot' ? 'block' : 'none';
              forgotContainer.style.opacity = type === 'forgot' ? '1' : '0';
              // Reset to entry state
              if (type === 'forgot') {
                const entryState = document.getElementById('forgot-entry-state');
                const successState = document.getElementById('forgot-success-state');
                const emailInput = document.getElementById('forgot-email');
                if (entryState) {
                  entryState.style.display = 'block';
                  entryState.style.opacity = '1';
                }
                if (successState) {
                  successState.style.display = 'none';
                  successState.style.opacity = '0';
                }
                if (emailInput) {
                  emailInput.value = '';
                }
              }
            }`;

html = html.replace(showAuthRegex, showAuthReplacement);

// We need to also patch the switchViews logic so going back to forgot resets the internal state
const switchViewsRegex = /targetContainer\.style\.display = 'block';/;
const switchViewsReplacement = `targetContainer.style.display = 'block';
          
          if (type === 'forgot') {
            const entryState = document.getElementById('forgot-entry-state');
            const successState = document.getElementById('forgot-success-state');
            const emailInput = document.getElementById('forgot-email');
            if (entryState) {
              entryState.style.display = 'block';
              entryState.style.opacity = '1';
            }
            if (successState) {
              successState.style.display = 'none';
              successState.style.opacity = '0';
            }
            if (emailInput) {
              emailInput.value = '';
            }
          }`;

html = html.replace(switchViewsRegex, switchViewsReplacement);

fs.writeFileSync('index.html', html);
console.log('Added rich success state');
