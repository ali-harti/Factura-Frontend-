
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
      
      // The Problem section
      "Why Factura?": "Pourquoi Factura ?",
      "Hours wasted daily": "Heures perdues quotidiennement",
      "Manual data entry wastes hours every day, pulling your team away from actual analysis and strategy.": "La saisie manuelle fait perdre des heures chaque jour, éloignant votre équipe de l'analyse et de la stratégie.",
      "Costly errors": "Erreurs coûteuses",
      "One typo in an invoice means payment disputes, delayed reconciliations, and damaged vendor relationships.": "Une seule faute de frappe entraîne des litiges, des retards et nuit aux relations avec les fournisseurs.",
      "Global chaos": "Chaos global",
      "Your invoices arrive in 5 languages and 3 formats — your team handles none of them efficiently.": "Vos factures arrivent dans 5 langues et 3 formats — votre équipe ne gère aucun d'eux efficacement.",
      
      // Language Feature
      "One tool. Every language.": "Un outil. Toutes les langues.",
      "From Latin scripts to Arabic RTL, CJK characters to Devanagari — Factura's AI vision model handles them all natively, with no configuration needed.": "Des scripts latins à l'arabe RTL, en passant par le CJK et le Devanagari — le modèle d'IA de Factura gère tout nativement.",
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
      "What languages does Factura actually support?": "Quelles langues Factura gère-t-il réellement ?",
      "Factura supports over 50 languages globally. Our AI vision model is trained to recognize Latin, Arabic, Cyrillic, Devanagari, and CJK (Chinese, Japanese, Korean) scripts seamlessly without any manual pre-configuration.": "Factura gère plus de 50 langues (Latin, Arabe, Cyrillique, Devanagari, CJK) sans configuration.",
      "What file formats are accepted?": "Quels formats sont acceptés ?",
      "We accept PDF (both native text and scanned), JPG, and PNG formats. Multi-page documents are fully supported up to a file size of 20MB per upload.": "Nous acceptons les PDF (natifs ou scannés), JPG et PNG jusqu'à 20 Mo.",
      "How accurate is the extraction on scanned PDFs?": "Quelle est la précision sur des PDF scannés ?",
      "On clean, digital PDFs and high-quality scans, Factura achieves 95%+ accuracy. For every extraction, we provide a confidence score so your team knows exactly which invoices might require a quick human review.": "Factura atteint 95%+ de précision sur des scans de qualité. Nous fournissons un score de confiance pour chaque extraction.",
      "Is my financial data secure?": "Mes données sont-elles sécurisées ?",
      "Absolutely. Data is encrypted in transit and at rest. We are SOC2 compliant, and we do not use your invoice data to train our foundational models. For maximum security, see our Enterprise private deployment option.": "Absolument. Données cryptées et SOC2. Nous n'entraînons pas nos modèles sur vos données.",
      "Can I host Factura on-premise?": "Puis-je héberger Factura sur site ?",
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
        } else if (strippedText === 'How it works' && node.parentNode.tagName === 'H2') {
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
  