const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS
const css = `
    /* Testimonials Carousel */
    .testimonials-section {
      padding: 4rem 0;
      border-bottom: 1px solid var(--border);
      background: var(--bg-alt);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .testimonials-section h2 {
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
      color: var(--text);
    }
    .marquee {
      width: 100vw;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
    }
    .marquee:hover .marquee-content {
      animation-play-state: paused;
    }
    .marquee::before, .marquee::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 10vw;
      z-index: 2;
      pointer-events: none;
    }
    .marquee::before {
      left: 0;
      background: linear-gradient(to right, var(--bg-alt), transparent);
    }
    .marquee::after {
      right: 0;
      background: linear-gradient(to left, var(--bg-alt), transparent);
    }
    .marquee-content {
      display: inline-block;
      animation: scrollMarquee 40s linear infinite;
    }
    @keyframes scrollMarquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .testimonial-card {
      display: inline-block;
      width: 350px;
      padding: 2rem;
      margin: 0 1rem;
      border: 1px solid var(--border);
      border-radius: 1rem;
      background: var(--bg);
      white-space: normal;
      vertical-align: top;
      transition: background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease;
    }
    .testimonial-quote {
      font-size: 1rem;
      color: var(--text);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .testimonial-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .testimonial-meta h4 {
      font-size: 0.95rem;
      margin: 0;
      color: var(--text);
    }
    .testimonial-meta p {
      font-size: 0.8rem;
      margin: 0;
      color: var(--text-muted);
    }
`;

html = html.replace('/* Social Proof */', css + '\n    /* Social Proof */');

// 2. Add HTML below Hero (line ~762)
const htmlBlock = `
  <!-- Testimonials Carousel -->
  <section class="testimonials-section fade-up">
    <h2>Trusted by finance teams worldwide</h2>
    <div class="marquee">
      <div class="marquee-content">
        <!-- Set 1 -->
        <div class="testimonial-card">
          <p class="testimonial-quote">"Factura cut our invoice processing time by 90%. It's like magic."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">JD</div>
            <div class="testimonial-meta">
              <h4>Jane Doe</h4>
              <p>CFO at TechFlow</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"We process invoices in 15 languages. Factura handles them all without a hiccup."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">AK</div>
            <div class="testimonial-meta">
              <h4>Ahmed Khan</h4>
              <p>VP Finance, GlobalTrade</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"The best AI tool we've integrated this year. Simple, fast, and incredibly accurate."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">SD</div>
            <div class="testimonial-meta">
              <h4>Sarah Dubois</h4>
              <p>Accounting Director, Luxe</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"No more manual entry. Our team can finally focus on strategic work."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">YT</div>
            <div class="testimonial-meta">
              <h4>Yosuke Tanaka</h4>
              <p>Operations Lead, K.K. Nexus</p>
            </div>
          </div>
        </div>
        <!-- Set 2 (Duplicate for infinite scroll) -->
        <div class="testimonial-card">
          <p class="testimonial-quote">"Factura cut our invoice processing time by 90%. It's like magic."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">JD</div>
            <div class="testimonial-meta">
              <h4>Jane Doe</h4>
              <p>CFO at TechFlow</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"We process invoices in 15 languages. Factura handles them all without a hiccup."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">AK</div>
            <div class="testimonial-meta">
              <h4>Ahmed Khan</h4>
              <p>VP Finance, GlobalTrade</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"The best AI tool we've integrated this year. Simple, fast, and incredibly accurate."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">SD</div>
            <div class="testimonial-meta">
              <h4>Sarah Dubois</h4>
              <p>Accounting Director, Luxe</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"No more manual entry. Our team can finally focus on strategic work."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">YT</div>
            <div class="testimonial-meta">
              <h4>Yosuke Tanaka</h4>
              <p>Operations Lead, K.K. Nexus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

html = html.replace('</section>\n\n  \n\n  <!-- Problem -->', '</section>\n' + htmlBlock + '\n  <!-- Problem -->');

// 3. Update translations
const dictAdditions = `
      // Testimonials
      "Trusted by finance teams worldwide": "Approuvé par les équipes financières du monde entier",
      "\\"Factura cut our invoice processing time by 90%. It's like magic.\\"": "\\"Factura a réduit notre temps de traitement des factures de 90%. C'est magique.\\"",
      "CFO at TechFlow": "Directrice Financière chez TechFlow",
      "\\"We process invoices in 15 languages. Factura handles them all without a hiccup.\\"": "\\"Nous traitons des factures dans 15 langues. Factura les gère toutes sans problème.\\"",
      "VP Finance, GlobalTrade": "VP Finance, GlobalTrade",
      "\\"The best AI tool we've integrated this year. Simple, fast, and incredibly accurate.\\"": "\\"Le meilleur outil d'IA intégré cette année. Simple, rapide et incroyablement précis.\\"",
      "Accounting Director, Luxe": "Directrice Comptable, Luxe",
      "\\"No more manual entry. Our team can finally focus on strategic work.\\"": "\\"Fini la saisie manuelle. Notre équipe peut enfin se concentrer sur des tâches stratégiques.\\"",
      "Operations Lead, K.K. Nexus": "Responsable des Opérations, K.K. Nexus",
`;

html = html.replace('// The Problem section', dictAdditions + '\n      // The Problem section');

fs.writeFileSync('index.html', html);
console.log('patched');
