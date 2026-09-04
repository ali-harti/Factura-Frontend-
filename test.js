
/* SCRIPT 0 */

    // Theme & Lang toggles
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      });
    }

    const dict = {
      // Nav & Footer
      "Features": "Fonctionnalités",
      "How it works": "Comment ça marche",
      "Pricing": "Tarifs",
      "FAQ": "FAQ",
      "Get Started": "Démarrer",
      "Try Factura free": "Essayer Factura gratuitement",
      "Product": "Produit",
      "Company": "Entreprise",
      "Legal": "Légal",
      
      // Hero
      "Any invoice. Any language. Seconds.": "Toute facture. Toute langue. Secondes.",
      "One AI that reads Arabic, French, English, Japanese, and 50+ more languages. PDFs, photos, scans. Factura turns any invoice from anywhere in the world into clean, exportable data. In under 30 seconds.": "Une IA qui lit l'arabe, le français, l'anglais, le japonais et plus de 50 autres langues. Factura transforme toute facture en données propres. En moins de 30 secondes.",
      "Start for free": "Commencer gratuitement",
      "See it in action": "Voir en action",
      "Invoices from 50+ countries supported": "Factures de 50+ pays prises en charge",
      
      
      // Testimonials
      "Trusted by finance and operations teams worldwide": "Approuvé par les équipes financières et opérationnelles du monde entier",
      "\"Factura cut our invoice processing time by 90%. It's like magic.\"": "\"Factura a réduit notre temps de traitement des factures de 90%. C'est magique.\"",
      "CFO at TechFlow": "Directrice Financière chez TechFlow",
      "\"We process invoices in 15 languages. Factura handles them all without a hiccup.\"": "\"Nous traitons des factures dans 15 langues. Factura les gère toutes sans problème.\"",
      "VP Finance, GlobalTrade": "VP Finance, GlobalTrade",
      "\"The best AI tool we've integrated this year. Simple, fast, and incredibly accurate.\"": "\"Le meilleur outil d'IA intégré cette année. Simple, rapide et incroyablement précis.\"",
      "Accounting Director, Luxe": "Directrice Comptable, Luxe",
      "\"No more manual entry. Our team can finally focus on strategic work.\"": "\"Fini la saisie manuelle. Notre équipe peut enfin se concentrer sur des tâches stratégiques.\"",
      "Operations Lead, K.K. Nexus": "Responsable des Opérations, K.K. Nexus",

      // The Problem section
      "Why Factura?": "Pourquoi Factura ?",
      "Hours wasted daily": "Heures perdues quotidiennement",
      "Manual data entry wastes hours every day, pulling your team away from actual analysis and strategy.": "La saisie manuelle fait perdre des heures chaque jour, éloignant votre équipe de l'analyse et de la stratégie.",
      "Costly errors": "Erreurs coûteuses",
      "One typo in an invoice means payment disputes, delayed reconciliations, and damaged vendor relationships.": "Une seule faute de frappe entraîne des litiges, des retards et nuit aux relations avec les fournisseurs.",
      "Global chaos": "Chaos global",
      "Your invoices arrive in 5 languages and 3 formats, your team handles none of them efficiently.": "Vos factures arrivent dans 5 langues et 3 formats, votre équipe ne gère aucun d'eux efficacement.",
      
      // Language Feature
      "One tool. Every language.": "Un outil. Toutes les langues.",
      "From Latin scripts to Arabic RTL, CJK characters to Devanagari, Factura's AI vision model handles them all natively, with no configuration needed.": "Des scripts latins à l'arabe RTL, en passant par le CJK et le Devanagari, le modèle d'IA de Factura gère tout nativement.",
      "English": "Anglais",
      "French": "Français",
      "Arabic (RTL)": "Arabe (RTL)",
      "Japanese (CJK)": "Japonais (CJK)",
      
      // Features
      "Everything you need to automate your accounts payable": "Tout ce qu'il faut pour automatiser vos comptes fournisseurs",
      "Workflow Ready": "Prêt pour le workflow",
      "Seamless Ingestion": "Ingestion fluide",
      "Drag & drop, email forwarding, or API. We accept PDF, JPG, PNG, and multi-page documents up to 20MB. Factura normalizes the input instantly.": "Glisser-déposer, email, ou API. PDF, JPG, PNG jusqu'à 20Mo acceptés. Factura normalise tout instantanément.",
      "Global Intelligence": "Intelligence globale",
      "AI reads every language": "L'IA lit toutes les langues",
      "Powered by a state-of-the-art vision model, Factura extracts structured data from Latin, Arabic, CJK, Cyrillic, Devanagari scripts and more. Always returns a confidence score and detected language.": "Factura extrait les données de divers scripts et langues. Renvoie toujours un score de confiance.",
      "Export and move on": "Exportez et avancez",
      "Review data in our intuitive inline JSON editor for human corrections. Export to CSV and JSON, search your history, or push directly to your ERP via API.": "Révisez et corrigez les données. Exportez en CSV/JSON, ou poussez vers votre ERP via API.",
      
      // Mock Dashboard text
      "Drag and drop invoice": "Glissez-déposez la facture",
      "PDF, PNG, JPG (max 20MB)": "PDF, PNG, JPG (max 20Mo)",
      "Upload your invoice": "Téléchargez votre facture",
      "Invoice #INV-2026": "Facture #INV-2026",
      "Export CSV": "Exporter en CSV",
      "Sync to ERP": "Synchroniser l'ERP",
      
      // How it Works
      "Stop re-typing invoices.": "Arrêtez de retaper vos factures.",
      "Join thousands of finance teams who let AI do the reading.": "Rejoignez des milliers d'équipes financières qui laissent l'IA faire la lecture.",
      "Upload anything": "Téléchargez n'importe quoi",
      "Upload any format (PDF, JPG, PNG) in any language. Drag & drop or use our API.": "Téléchargez tout format, toute langue. Glissez-déposez ou utilisez l'API.",
      "AI extracts in seconds": "L'IA extrait en secondes",
      "Our model returns structured JSON data, language detected, and a confidence score instantly.": "Données JSON, langue et score de confiance instantanés.",
      "Correct, export, integrate": "Corrigez, exportez, intégrez",
      "Review, correct if needed, and export to CSV, JSON, or sync directly to your ERP.": "Vérifiez, corrigez et exportez en CSV/JSON, ou synchronisez votre ERP.",
      
      // Stats
      "Average processing time": "Temps de traitement moyen",
      "Accuracy on clean scans": "Précision sur scans propres",
      "Languages supported": "Langues prises en charge",
      
      // Pricing
      "Simple, transparent pricing": "Tarifs simples et transparents",
      "Starter": "Démarrage",
      "Free": "Gratuit",
      "Forever": "Pour toujours",
      "Perfect for small teams testing the waters.": "Idéal pour les petites équipes qui se lancent.",
      "/ month": "/ mois",
      "50 invoices / month": "50 factures / mois",
      "50+ Languages": "50+ Langues",
      "Web interface only": "Interface web uniquement",
      "Current Plan": "Plan actuel",
      "Pro": "Pro",
      "For growing finance departments.": "Pour les départements financiers en croissance.",
      "2,000 invoices / month": "2 000 factures / mois",
      "CSV & JSON Export": "Export CSV & JSON",
      "Priority Support": "Support prioritaire",
      "Start 14-day trial": "Commencer l'essai de 14j",
      "Enterprise": "Entreprise",
      "Custom": "Personnalisé",
      "For large organizations with strict privacy needs.": "Pour grandes organisations aux besoins stricts.",
      "Unlimited invoices": "Factures illimitées",
      "Custom SLA": "SLA personnalisé",
      "Dedicated account manager": "Gestionnaire de compte",
      "Full API Access": "Accès API complet",
      "ERP Integrations": "Intégrations ERP",
      "Private deployment": "Déploiement privé",
      "Contact Sales": "Contacter les ventes",
      
      // FAQ
      "Frequently Asked Questions": "Foire aux Questions",
      "Everything you need to know about Factura.": "Tout ce qu'il faut savoir sur Factura.",
      "What languages does Factura support?": "Quelles langues Factura gère-t-il réellement ?",
      "Factura supports over 50 languages globally. Our AI vision model is trained to recognize Latin, Arabic, Cyrillic, Devanagari, and CJK (Chinese, Japanese, Korean) scripts seamlessly without any manual pre-configuration.": "Factura gère plus de 50 langues (Latin, Arabe, Cyrillique, Devanagari, CJK) sans configuration.",
      "What file formats are accepted?": "Quels formats sont acceptés ?",
      "We accept PDF (both native text and scanned), JPG, and PNG formats. Multi-page documents are fully supported up to a file size of 20MB per upload.": "Nous acceptons les PDF (natifs ou scannés), JPG et PNG jusqu'à 20 Mo.",
      "How accurate is the extraction?": "Quelle est la précision de l'extraction ?",
      "On clean, digital PDFs and high-quality scans, Factura achieves 95%+ accuracy. For every extraction, we provide a confidence score so your team knows exactly which invoices might require a quick human review.": "Factura atteint 95%+ de précision sur des scans de qualité. Nous fournissons un score de confiance pour chaque extraction.",
      "Is my invoice data secure?": "Les données de mes factures sont-elles sécurisées ?",
      "Absolutely. Data is encrypted in transit and at rest. We are SOC2 compliant, and we do not use your invoice data to train our foundational models. For maximum security, see our Enterprise private deployment option.": "Absolument. Données cryptées et SOC2. Nous n'entraînons pas nos modèles sur vos données.",
      "Can I self-host Factura for full data privacy?": "Puis-je héberger Factura pour la confidentialité des données ?",
      "Yes, our Enterprise plan includes an option for VPC or on-premise deployment. This ensures that your sensitive financial data never leaves your internal corporate network.": "Oui, notre plan Entreprise inclut l'hébergement VPC ou sur site pour vos données sensibles.",
    
      // Additional elements
      "$0": "0 €",
      "$199": "199 €",
      "© 2026 Factura. All rights reserved.": "© 2026 Factura. Tous droits réservés."
    };

    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'en';

    function walkDom(node, callback) {
      if (node.nodeType === 3) {
        callback(node);
      } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        for (let i = 0; i < node.childNodes.length; i++) {
          walkDom(node.childNodes[i], callback);
        }
      }
    }

    if (langToggle) {
      // Store original text
      const textNodes = [];
      walkDom(document.body, (node) => {
        if (!node.nodeValue) return;
        const text = node.nodeValue.trim();
        if (!text) return;
        const strippedText = text.replace(/\s+/g, ' '); 
        
        let matchedFr = dict[strippedText];
        if (matchedFr) {
          textNodes.push({ node, en: text, fr: matchedFr });
        } else if (strippedText === 'How it works' && node.parentNode && node.parentNode.tagName === 'H2') {
           textNodes.push({ node, en: text, fr: dict['How it works_section'] || "Comment ça marche" });
        }
      });

      langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        langToggle.textContent = currentLang === 'en' ? 'FR' : 'EN';
        if (typeof animateHeadline === 'function') animateHeadline(currentLang);
        
        textNodes.forEach(item => {
          item.node.nodeValue = item.node.nodeValue.replace(
            currentLang === 'en' ? item.fr : item.en,
            currentLang === 'en' ? item.en : item.fr
          );
        });

        // Special handling for the animated headline (Word-by-word reveal)
        const headline = document.querySelector('.hero-headline');
        if (headline && !headline.querySelector('span')) {
            // Already initialized? No, the animation script runs once.
            // For a simple implementation, let's just trigger a page reload with hash or 
            // dynamically rebuild the spans
        }
      });
    }

    // Word-by-word reveal in hero
    const headline = document.querySelector('.hero-headline');
    let originalHeadlineText = { en: "Any invoice. Any language. Seconds.", fr: "Toute facture. Toute langue. En secondes." };
    
    function animateHeadline(lang) {
      if (!headline) return;
      const text = originalHeadlineText[lang];
      headline.innerHTML = '';
      text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.classList.add('reveal-word');
        span.style.animationDelay = `${i * 0.15}s`;
        headline.appendChild(span);
        headline.appendChild(document.createTextNode(' '));
      });
    }
    
    // Initial animation
    animateHeadline('en');


    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Intersection Observer for fade-up animations
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // Stats count-up animation
    const statsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseFloat(stat.getAttribute('data-target'));
          const duration = 2000;
          const start = performance.now();
          const isPercent = stat.hasAttribute('data-percent');
          const isSeconds = stat.hasAttribute('data-seconds');
          const isPlus = stat.hasAttribute('data-plus');
          
          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const current = target * easeProgress;
            
            let formatted = Math.floor(current);
            let prefix = isSeconds ? '< ' : '';
            let suffix = isPercent ? '%' : (isPlus ? '+' : '');
            
            stat.textContent = prefix + formatted + suffix;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              stat.textContent = prefix + target + suffix;
            }
          };
          requestAnimationFrame(animate);
          obs.unobserve(stat);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-btn');
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Scroll Progress
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });

  // Sparkle Canvas Particle System
    const bgCanvas = document.createElement('canvas');
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100vw';
    bgCanvas.style.height = '100vh';
    bgCanvas.style.pointerEvents = 'none';
    bgCanvas.style.zIndex = '-5';
    document.body.prepend(bgCanvas);

    const bgCtx = bgCanvas.getContext('2d');
    let bgParticles = [];
    let cw, ch;

    function initBgCanvas() {
        cw = window.innerWidth;
        ch = window.innerHeight;
        bgCanvas.width = cw;
        bgCanvas.height = ch;
        bgParticles = [];
        // Create particles based on screen size (roughly 1 per 12000 pixels)
        const numParticles = Math.min(Math.floor((cw * ch) / 12000), 150);
        for (let i = 0; i < numParticles; i++) {
            bgParticles.push({
                x: Math.random() * cw,
                y: Math.random() * ch,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random(),
                dAlpha: (Math.random() - 0.5) * 0.015,
                isAccent: Math.random() > 0.85 // 15% of particles are accent color
            });
        }
    }

    function animateBgCanvas() {
        bgCtx.clearRect(0, 0, cw, ch);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const baseColor = isLight ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
        const accentColor = 'rgba(232, 114, 74, '; // --accent rgb approx

        bgParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha += p.dAlpha;

            if (p.alpha <= 0.05 || p.alpha >= 0.8) p.dAlpha *= -1;
            
            if (p.x < 0) p.x = cw;
            if (p.x > cw) p.x = 0;
            if (p.y < 0) p.y = ch;
            if (p.y > ch) p.y = 0;

            bgCtx.beginPath();
            bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            bgCtx.fillStyle = (p.isAccent ? accentColor : baseColor) + p.alpha + ')';
            bgCtx.fill();
        });
        requestAnimationFrame(animateBgCanvas);
    }

    window.addEventListener('resize', initBgCanvas);
    initBgCanvas();
    animateBgCanvas();

  
    
    // Auth & Routing Logic
    const landingView = document.getElementById('landing-view');
    const authView = document.getElementById('auth-view');
    const authCard = document.getElementById('auth-card');
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    const forgotContainer = document.getElementById('forgot-container');
    
    // Nav elements to toggle
    const navCenterLinks = document.getElementById('nav-center-links');
    const navSignin = document.getElementById('nav-signin');
    const navGetStarted = document.getElementById('nav-get-started');

    function updateNavForAuth(isAuthPage) {
      if (isAuthPage) {
        navCenterLinks.style.display = 'none';
        navSignin.style.display = 'none';
        navGetStarted.style.display = 'none';
        const chatTgl = document.getElementById('chatToggle');
        if(chatTgl) chatTgl.style.display = 'none';
      } else {
        navCenterLinks.style.display = 'flex';
        navSignin.style.display = 'inline-block';
        navGetStarted.style.display = 'inline-block';
        const chatTgl = document.getElementById('chatToggle');
        if(chatTgl) chatTgl.style.display = 'flex';
      }
    }

    function showAuth(type) {
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
            }
          }, 50);
        }, 300);
      } else {
        // We are already in auth view, just switch the inner containers smoothly
        switchViews();
      }
      
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
      } else if (path === '/forgot-password') {
        showAuth('forgot');
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
      const path = window.location.pathname;
      if (path === '/signup' || path === '/login' || path === '/forgot-password') {
        landingView.style.display = 'none';
        landingView.style.opacity = '0';
        authView.style.display = 'flex';
        authView.style.opacity = '1';
        authCard.classList.add('enter');
        
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
        }
        updateNavForAuth(true);
      } else {
        handleRoute(path);
      }
    });

    // Intercept clicking on "Get Started" and "Sign In"
    document.addEventListener('click', (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href === '/' || href === '/signup' || href === '/login' || href === '/forgot-password') {
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
    }


    
    
    window.handleForgotPassword = async function(e) {
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
    }

    // Chatbot Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    let isChatOpen = false;
    
    function toggleChat() {
      isChatOpen = !isChatOpen;
      if (isChatOpen) {
        chatWindow.classList.add('open');
        chatInput.focus();
      } else {
        chatWindow.classList.remove('open');
      }
    }
    
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);
    
    function appendMessage(text, sender) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender}`;
      msgDiv.textContent = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return msgDiv;
    }
    
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      
      // User message
      appendMessage(text, 'user');
      chatInput.value = '';
      
      // Loading indicator
      const loadingMsg = appendMessage('Thinking...', 'bot loading');
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, sessionId: 'user-session' })
        });
        
        const data = await response.json();
        chatMessages.removeChild(loadingMsg);
        
        if (response.ok) {
          appendMessage(data.text, 'bot');
        } else {
          appendMessage('Sorry, I encountered an error. Please try again.', 'bot');
          console.error(data.error);
        }
      } catch (err) {
        chatMessages.removeChild(loadingMsg);
        appendMessage('Network error. Is the server running?', 'bot');
      }
    });

  