const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update the link
html = html.replace(
  '<a href="#" style="font-size:13px; color:var(--accent); text-decoration:none;">Forgot password?</a>',
  '<a href="#" onclick="openForgotPassword(event)" style="font-size:13px; color:var(--accent); text-decoration:none; cursor:pointer;">Forgot password?</a>'
);

// 2. Add Modal HTML before </body>
const modalHTML = `
  <!-- Forgot Password Modal -->
  <div id="forgot-password-modal" class="modal-overlay" style="display: none; opacity: 0;">
    <div class="modal-card">
      <button class="modal-close" onclick="closeForgotPassword()" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <h3 class="auth-title" style="font-size: 22px;">Reset Password</h3>
      <p class="auth-subtitle" style="margin-bottom: 24px;">Enter your email to receive a reset link.</p>
      <form onsubmit="handleForgotPassword(event)">
        <div class="auth-field">
          <label>Email address</label>
          <input type="email" id="forgot-email" required />
        </div>
        <button type="submit" class="btn btn-primary auth-submit" id="forgot-btn">Send Reset Link</button>
      </form>
    </div>
  </div>
</body>`;
html = html.replace('</body>', modalHTML);

// 3. Add CSS before </style>
const modalCSS = `
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
    }
    .modal-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 32px;
      width: 90%;
      max-width: 400px;
      position: relative;
      transform: translateY(-20px);
      transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .modal-overlay.open {
      opacity: 1;
    }
    .modal-overlay.open .modal-card {
      transform: translateY(0);
    }
    .modal-close {
      position: absolute;
      top: 16px; right: 16px;
      background: none; border: none;
      color: var(--text-muted);
      cursor: pointer;
      transition: color 0.2s;
    }
    .modal-close:hover {
      color: var(--text);
    }
</style>`;
html = html.replace('</style>', modalCSS);

// 4. Add JS before // Chatbot Logic
const modalJS = `
    window.openForgotPassword = function(e) {
      if (e) e.preventDefault();
      const modal = document.getElementById('forgot-password-modal');
      modal.style.display = 'flex';
      // trigger reflow
      void modal.offsetWidth;
      modal.classList.add('open');
    }
    window.closeForgotPassword = function() {
      const modal = document.getElementById('forgot-password-modal');
      modal.classList.remove('open');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
    window.handleForgotPassword = function(e) {
      e.preventDefault();
      const btn = document.getElementById('forgot-btn');
      btn.style.opacity = '0.7';
      btn.textContent = 'Sending...';
      setTimeout(() => {
        alert("A password reset link has been sent to your email.");
        btn.style.opacity = '1';
        btn.textContent = 'Send Reset Link';
        closeForgotPassword();
        document.getElementById('forgot-email').value = '';
      }, 1000);
    }

    // Close modal on click outside
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('forgot-password-modal');
      if (modal && e.target === modal) {
        closeForgotPassword();
      }
    });

    // Chatbot Logic`;
html = html.replace('// Chatbot Logic', modalJS);

fs.writeFileSync('index.html', html);
console.log('Forgot password modal added');
