const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const enhancedCSS = `
    /* Enhanced Hover Effects & Animations */
    
    /* Logo */
    .logo {
      cursor: pointer;
      position: relative;
    }
    .logo img {
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.5s ease;
    }
    .logo:hover img {
      transform: scale(1.15) rotate(5deg);
      filter: drop-shadow(0 0 10px var(--primary));
    }
    
    /* Buttons */
    .btn {
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    .btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
      z-index: -1;
    }
    .btn:hover::before {
      left: 100%;
    }
    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    .btn:active {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    [data-theme='light'] .btn:hover {
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
    
    /* Nav Links */
    .nav-links a {
      position: relative;
      transition: color 0.3s ease;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: var(--primary, #000); /* fallback */
      transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .nav-links a:hover {
      color: var(--text);
    }
    .nav-links a:hover::after {
      width: 100%;
    }
    
    /* Feature & Problem Cards */
    .feature-block, .problem-card, .pricing-card, .testimonial-card {
      transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease;
    }
    .feature-block:hover, .problem-card:hover, .pricing-card:hover, .testimonial-card:hover {
      transform: translateY(-8px);
      border-color: var(--primary);
    }
    
    [data-theme='dark'] .feature-block:hover, 
    [data-theme='dark'] .problem-card:hover, 
    [data-theme='dark'] .pricing-card:hover, 
    [data-theme='dark'] .testimonial-card:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    
    [data-theme='light'] .feature-block:hover, 
    [data-theme='light'] .problem-card:hover, 
    [data-theme='light'] .pricing-card:hover, 
    [data-theme='light'] .testimonial-card:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    }
    
    /* Icons Pulse */
    .feature-icon, .problem-icon {
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .feature-block:hover .feature-icon, .problem-card:hover .problem-icon {
      transform: scale(1.15) rotate(5deg);
    }
    
    /* FAQ Accodion Icon Spin */
    .faq-btn {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .faq-btn:hover {
      background-color: var(--border);
    }
    .faq-icon {
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .faq-item.active .faq-icon {
      transform: rotate(135deg);
    }
    
    /* Timeline / How It Works */
    .step-num {
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease, color 0.3s ease;
    }
    .step:hover .step-num {
      transform: scale(1.15) translateY(-3px);
      background-color: var(--primary);
      color: white;
    }
`;

html = html.replace('</style>', enhancedCSS + '\\n</style>');

fs.writeFileSync('index.html', html);
console.log('patched');
