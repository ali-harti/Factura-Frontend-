const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldShowAuth = `    function showAuth(type) {
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
        }
      }, 300);
      
      updateNavForAuth(true);
    }`;

const newShowAuth = `    function showAuth(type) {
      const isAlreadyAuth = authView.style.display !== 'none' && authView.style.display !== '';
      
      const switchViews = () => {
        const containers = [
          { type: 'signup', el: signupContainer },
          { type: 'login', el: loginContainer },
          { type: 'forgot', el: forgotContainer }
        ];
        
        // Find active container
        const targetContainer = containers.find(c => c.type === type)?.el;
        if (!targetContainer) return;
        
        // Fix card height to current height for smooth transition
        const currentHeight = authCard.getBoundingClientRect().height;
        authCard.style.height = currentHeight + 'px';
        authCard.style.overflow = 'hidden';
        authCard.style.transition = 'height 0.3s ease, transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.5s ease-out';
        
        // Fade out all containers
        containers.forEach(c => {
          if (c.el) {
            c.el.style.transition = 'opacity 0.2s ease-out';
            c.el.style.opacity = '0';
          }
        });
        
        // Wait for fade out, then swap
        setTimeout(() => {
          containers.forEach(c => {
            if (c.el) c.el.style.display = 'none';
          });
          
          targetContainer.style.display = 'block';
          
          // Calculate new height
          authCard.style.height = 'auto';
          const newHeight = authCard.getBoundingClientRect().height;
          authCard.style.height = currentHeight + 'px';
          
          // Force reflow
          void authCard.offsetHeight;
          
          // Transition to new height and fade in content
          authCard.style.height = newHeight + 'px';
          targetContainer.style.opacity = '1';
          
          // Clean up fixed height after transition
          setTimeout(() => {
            authCard.style.height = 'auto';
            authCard.style.overflow = 'visible';
          }, 300);
          
        }, 200);
      };

      if (!isAlreadyAuth) {
        // We are transitioning from landing page
        landingView.style.transition = 'opacity 0.3s';
        landingView.style.opacity = '0';
        
        setTimeout(() => {
          landingView.style.display = 'none';
          authView.style.display = 'flex';
          
          // Slight delay to allow display:flex to apply
          setTimeout(() => {
            authView.style.opacity = '1';
            authCard.classList.add('enter');
            
            // Set initial displays without animation since card is entering
            signupContainer.style.display = type === 'signup' ? 'block' : 'none';
            signupContainer.style.opacity = type === 'signup' ? '1' : '0';
            
            loginContainer.style.display = type === 'login' ? 'block' : 'none';
            loginContainer.style.opacity = type === 'login' ? '1' : '0';
            
            if (forgotContainer) {
              forgotContainer.style.display = type === 'forgot' ? 'block' : 'none';
              forgotContainer.style.opacity = type === 'forgot' ? '1' : '0';
            }
          }, 50);
        }, 300);
      } else {
        // We are already in auth view, just switch the inner containers smoothly
        switchViews();
      }
      
      updateNavForAuth(true);
    }`;

html = html.replace(oldShowAuth, newShowAuth);

// Wait, the DOMContentLoaded logic also directly manipulates these.
// Let's add transitions to the containers in CSS to make it cleaner.
html = html.replace('/* Chatbot Styles */', `
    #signup-container, #login-container, #forgot-container {
      transition: opacity 0.2s ease-in-out;
    }
    /* Chatbot Styles */`);

fs.writeFileSync('index.html', html);
console.log('Fixed auth transitions');
