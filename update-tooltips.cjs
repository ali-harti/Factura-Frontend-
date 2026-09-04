const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const tooltipCSS = `
    /* Pricing Tooltips */
    .features-list li {
      position: relative;
    }
    
    .info-icon {
      margin-left: auto;
      color: var(--text-muted);
      opacity: 0.5;
      cursor: help;
      transition: opacity 0.3s ease, color 0.3s ease;
      width: 16px !important;
      height: 16px !important;
    }
    
    .features-list li:hover .info-icon {
      opacity: 1;
      color: var(--accent);
    }
    
    .features-list li[data-tooltip]::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background-color: var(--card);
      color: var(--text);
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      line-height: 1.4;
      white-space: normal;
      width: max-content;
      max-width: 200px;
      text-align: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, transform 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      border: 1px solid var(--border);
      z-index: 10;
      pointer-events: none;
    }
    
    .features-list li[data-tooltip]:hover::after {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(-5px);
    }
`;

html = html.replace('</style>', tooltipCSS + '\n</style>');

const infoSvg = `<svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

const replacementMap = [
  // Starter
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 50 invoices / month</li>',
    new: `<li data-tooltip="Process up to 50 invoices completely free. Resets on the 1st of every month."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 50 invoices / month ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> CSV & JSON Export</li>',
    new: `<li data-tooltip="Easily export your structured data in standard formats for analysis."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> CSV & JSON Export ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 50+ Languages</li>',
    new: `<li data-tooltip="Our base AI model automatically recognizes and translates invoices in over 50 languages."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 50+ Languages ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Web interface only</li>',
    new: `<li data-tooltip="Access Factura through our beautiful, intuitive web dashboard."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Web interface only ${infoSvg}</li>`
  },
  // Pro
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 2,000 invoices / month</li>',
    new: `<li data-tooltip="A generous allowance of 2,000 invoices per month, covering mid-sized teams."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 2,000 invoices / month ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Full API Access</li>',
    new: `<li data-tooltip="Integrate Factura directly into your own tools using our REST or GraphQL API."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Full API Access ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ERP Integrations</li>',
    new: `<li data-tooltip="Native sync with NetSuite, SAP, Quickbooks, and Xero."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ERP Integrations ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority Support</li>',
    new: `<li data-tooltip="Jump the queue. Get email support responses in under 2 hours."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority Support ${infoSvg}</li>`
  },
  // Enterprise
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited invoices</li>',
    new: `<li data-tooltip="No volume caps. We scale our extraction pipelines to match your needs."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited invoices ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Private deployment</li>',
    new: `<li data-tooltip="Self-host Factura on your own AWS/GCP instances, or use a dedicated single-tenant cloud."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Private deployment ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom SLA</li>',
    new: `<li data-tooltip="Guaranteed 99.99% uptime with financial penalties if we miss our target."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom SLA ${infoSvg}</li>`
  },
  {
    old: '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated account manager</li>',
    new: `<li data-tooltip="Direct Slack channel and phone line to a dedicated technical account manager."><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated account manager ${infoSvg}</li>`
  }
];

for (const rep of replacementMap) {
  html = html.replace(rep.old, rep.new);
}

fs.writeFileSync('index.html', html);
console.log('patched tooltips');
