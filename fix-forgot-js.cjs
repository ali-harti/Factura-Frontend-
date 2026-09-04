const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<div class="auth-field">\\n          <label>Email address</label>',
  '<div id="forgot-status" style="display:none; font-size:14px; margin-bottom:16px; text-align:center; padding: 12px; border-radius: 8px;"></div>\\n        <div class="auth-field">\\n          <label>Email address</label>'
);

const oldJS = `window.handleForgotPassword = function(e) {
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
    }`;

const newJS = `window.handleForgotPassword = async function(e) {
      e.preventDefault();
      const btn = document.getElementById('forgot-btn');
      const emailInput = document.getElementById('forgot-email');
      const email = emailInput.value;
      const statusMsg = document.getElementById('forgot-status');
      
      btn.style.opacity = '0.7';
      btn.textContent = 'Sending...';
      btn.disabled = true;
      if (statusMsg) statusMsg.style.display = 'none';
      
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
          if (statusMsg) {
            statusMsg.textContent = data.message || "A password reset link has been sent to your email.";
            statusMsg.style.color = "#22c55e"; // success green
            statusMsg.style.backgroundColor = "rgba(34, 197, 94, 0.1)";
            statusMsg.style.border = "1px solid rgba(34, 197, 94, 0.2)";
            statusMsg.style.display = 'block';
          }
          emailInput.value = '';
          
          setTimeout(() => {
            closeForgotPassword();
            if (statusMsg) statusMsg.style.display = 'none';
          }, 3500);
        } else {
          if (statusMsg) {
            statusMsg.textContent = data.error || "An error occurred. Please try again.";
            statusMsg.style.color = "#ef4444"; // error red
            statusMsg.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
            statusMsg.style.border = "1px solid rgba(239, 68, 68, 0.2)";
            statusMsg.style.display = 'block';
          }
        }
      } catch (err) {
        btn.style.opacity = '1';
        btn.textContent = 'Send Reset Link';
        btn.disabled = false;
        if (statusMsg) {
          statusMsg.textContent = "A network error occurred. Please try again.";
          statusMsg.style.color = "#ef4444";
          statusMsg.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
          statusMsg.style.border = "1px solid rgba(239, 68, 68, 0.2)";
          statusMsg.style.display = 'block';
        }
      }
    }`;

html = html.replace(oldJS, newJS);
fs.writeFileSync('index.html', html);
console.log('Fixed JS');
