const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update theme CSS to a light mode
const slateCssRegex = /:root\[data-theme="slate"\] {[\s\S]*?}/;
const lightCss = `:root[data-theme="light"] {
      --bg: #ffffff;
      --card: #f4f4f5;
      --text: #09090b;
      --text-muted: rgba(9, 9, 11, 0.7);
      --border: rgba(0, 0, 0, 0.15);
      --border-light: rgba(0, 0, 0, 0.05);
      --accent: #E8724A;
      --accent-glow: rgba(232, 114, 74, 0.15);
    }`;
html = html.replace(slateCssRegex, lightCss);

// Let's also fix the logo for light mode (it's white, needs to be inverted)
const logoCssRegex = /\.logo img {/;
const logoLightCss = `.logo img {
      transition: filter 0.3s;
    }
    :root[data-theme="light"] .logo img,
    :root[data-theme="light"] .flags {
      filter: invert(1) hue-rotate(180deg);
    }
    :root[data-theme="light"] .theme-toggle {
       color: #09090b;
    }
    .logo img {`;
html = html.replace(logoCssRegex, logoLightCss);

// 2. Add language toggle button next to theme toggle
const navActionsRegex = /<div class="nav-actions">[\s\S]*?<button id="theme-toggle"/;
const newNavActions = `<div class="nav-actions">
        <button id="lang-toggle" class="theme-toggle" aria-label="Toggle language" title="Toggle language" style="font-weight: bold; font-size: 14px;">
          FR
        </button>
        <button id="theme-toggle"`;
html = html.replace(navActionsRegex, newNavActions);

// 3. Update theme JS and add Lang JS
const jsRegex = /\/\/ Theme toggle[\s\S]*?\}\);[\s\S]*?\}/;
const newJs = `// Theme & Lang toggles
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
      "Features": "Fonctionnalités",
      "How it works": "Comment ça marche",
      "Pricing": "Tarifs",
      "FAQ": "FAQ",
      "Get Started": "Démarrer",
      "Start for free": "Commencer gratuitement",
      "See it in action": "Voir en action",
      "Any invoice. Any language. Seconds.": "Toute facture. Toute langue. En quelques secondes.",
      "One AI that reads Arabic, French, English, Japanese, and 50+ more languages. PDFs, photos, scans. Factura turns any invoice from anywhere in the world into clean, exportable data. In under 30 seconds.": "Une IA qui lit l'arabe, le français, l'anglais, le japonais et plus de 50 langues. PDF, photos, scans. Factura transforme n'importe quelle facture du monde entier en données propres et exportables. En moins de 30 secondes.",
      "Invoices from 50+ countries supported": "Factures de plus de 50 pays prises en charge",
      "Why Factura?": "Pourquoi Factura ?",
      "Everything you need to automate your accounts payable": "Tout ce dont vous avez besoin pour automatiser vos comptes fournisseurs",
      "Lightning Fast": "Ultra Rapide",
      "Under 30 seconds processing time per invoice, saving your team countless hours.": "Moins de 30 secondes de traitement par facture, faisant gagner un temps précieux à votre équipe.",
      "Universal Format": "Format Universel",
      "Works with PDF, JPG, PNG, TIFF, and scanned documents of any quality.": "Fonctionne avec PDF, JPG, PNG, TIFF et documents numérisés de toute qualité.",
      "Line-item Extraction": "Extraction des Lignes",
      "Automatically matches and extracts individual line items with 99% accuracy.": "Extrait automatiquement les lignes individuelles avec une précision de 99%.",
      "Export Anywhere": "Exportez Partout",
      "Download as CSV, JSON, or sync directly to Quickbooks, Xero, and Netsuite.": "Téléchargez en CSV, JSON ou synchronisez avec Quickbooks, Xero et Netsuite.",
      "How it works_section": "Comment ça marche",
      "Three steps to automation": "Trois étapes vers l'automatisation",
      "Upload Invoice": "Téléchargez la Facture",
      "Drag and drop any invoice format into the dashboard or forward via email.": "Glissez-déposez n'importe quel format de facture ou transférez par email.",
      "AI Extraction": "Extraction IA",
      "Our AI instantly identifies vendor details, dates, totals, and line items.": "Notre IA identifie instantanément le fournisseur, les dates, les totaux et les lignes.",
      "Review & Export": "Vérifiez & Exportez",
      "Approve the extracted data and export it directly to your accounting software.": "Approuvez les données et exportez-les vers votre logiciel comptable.",
      "Simple, transparent pricing": "Tarification simple et transparente",
      "Start for free, upgrade when you need more volume.": "Commencez gratuitement, passez à la vitesse supérieure quand vous en avez besoin.",
      "Starter": "Démarrage",
      "Free": "Gratuit",
      "Forever": "Pour toujours",
      "Up to 50 invoices/mo": "Jusqu'à 50 factures/mois",
      "Standard extraction": "Extraction standard",
      "CSV & JSON export": "Exportation CSV & JSON",
      "Email support": "Support par email",
      "Current Plan": "Plan actuel",
      "Pro": "Pro",
      "$49": "49 €",
      "per month": "par mois",
      "Up to 1000 invoices/mo": "Jusqu'à 1000 factures/mois",
      "Advanced line-item extraction": "Extraction avancée des lignes",
      "Accounting software sync": "Synchro logiciel comptable",
      "Priority support": "Support prioritaire",
      "Get Pro": "Obtenir Pro",
      "Enterprise": "Entreprise",
      "Custom": "Sur mesure",
      "Unlimited volume": "Volume illimité",
      "Custom API integration": "Intégration API personnalisée",
      "Dedicated account manager": "Gestionnaire de compte dédié",
      "SLA guarantee": "Garantie SLA",
      "Contact Us": "Nous Contacter",
      "Frequently Asked Questions": "Questions Fréquemment Posées",
      "Everything you need to know about Factura.": "Tout ce que vous devez savoir sur Factura.",
      "What languages do you support?": "Quelles langues prenez-vous en charge ?",
      "We support over 50 languages including English, Spanish, French, German, Chinese, Japanese, and Arabic. Our AI automatically detects the language and extracts data accordingly.": "Nous prenons en charge plus de 50 langues, dont l'anglais, l'espagnol, le français, l'allemand, le chinois, le japonais et l'arabe. Notre IA détecte automatiquement la langue.",
      "How accurate is the extraction?": "Quelle est la précision de l'extraction ?",
      "Our AI models are trained on millions of invoices and achieve over 99% accuracy for standard fields (vendor, total, date) and 95%+ for complex line items.": "Nos modèles d'IA atteignent plus de 99% de précision pour les champs standards (fournisseur, total, date) et 95%+ pour les lignes complexes.",
      "Do you integrate with my accounting software?": "Intégrez-vous avec mon logiciel comptable ?",
      "Yes, we have native integrations with Quickbooks, Xero, NetSuite, and Sage. We also provide a robust API for custom integrations.": "Oui, nous avons des intégrations natives avec Quickbooks, Xero, NetSuite et Sage. Nous fournissons également une API robuste.",
      "Is my data secure?": "Mes données sont-elles sécurisées ?",
      "Absolutely. We use bank-level encryption (AES-256) for data at rest and in transit. We are SOC2 compliant and never train our shared models on your private data.": "Absolument. Nous utilisons un cryptage de niveau bancaire (AES-256). Nous sommes conformes SOC2 et n'entraînons jamais nos modèles sur vos données privées.",
      "Ready to automate your invoices?": "Prêt à automatiser vos factures ?",
      "Join thousands of companies saving time and money with Factura.": "Rejoignez des milliers d'entreprises qui gagnent du temps et de l'argent avec Factura.",
      "Product": "Produit",
      "Company": "Entreprise",
      "About Us": "À propos",
      "Careers": "Emplois",
      "Blog": "Blog",
      "Contact": "Contact",
      "Legal": "Légal",
      "Privacy Policy": "Confidentialité",
      "Terms of Service": "Conditions d'utilisation",
      "Security": "Sécurité"
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
        const text = node.nodeValue.trim();
        if (text && dict[text]) {
          textNodes.push({ node, en: text, fr: dict[text] });
        } else if (text === 'How it works' && node.parentNode.tagName === 'H2') {
           textNodes.push({ node, en: text, fr: dict['How it works_section'] });
        }
      });

      langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        langToggle.textContent = currentLang === 'en' ? 'FR' : 'EN';
        
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
    }`;
html = html.replace(jsRegex, newJs);

fs.writeFileSync('index.html', html);
console.log('patched');
