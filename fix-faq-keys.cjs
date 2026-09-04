const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  {
    old: '"What languages does Factura actually support?": "Quelles langues Factura gère-t-il réellement ?",',
    new: '"What languages does Factura support?": "Quelles langues Factura gère-t-il réellement ?",\n      "What file formats are accepted?": "Quels formats sont acceptés ?",\n      "How accurate is the extraction?": "Quelle est la précision de l\'extraction ?",\n      "Is my invoice data secure?": "Les données de mes factures sont-elles sécurisées ?",\n      "Can I self-host Factura for full data privacy?": "Puis-je auto-héberger Factura pour la confidentialité des données ?",'
  }
];

// Need to remove the old ones that don't match
html = html.replace('"What languages does Factura actually support?": "Quelles langues Factura gère-t-il réellement ?",', '"What languages does Factura support?": "Quelles langues Factura gère-t-il réellement ?",');
html = html.replace('"How accurate is the extraction on scanned PDFs?": "Quelle est la précision sur des PDF scannés ?",', '"How accurate is the extraction?": "Quelle est la précision de l\'extraction ?",');
html = html.replace('"Is my financial data secure?": "Mes données sont-elles sécurisées ?",', '"Is my invoice data secure?": "Les données de mes factures sont-elles sécurisées ?",');
html = html.replace('"Can I host Factura on-premise?": "Puis-je héberger Factura sur site ?",', '"Can I self-host Factura for full data privacy?": "Puis-je héberger Factura pour la confidentialité des données ?",');

// Add the missing CTA string
html = html.replace('"Stop re-typing invoices.": "Arrêtez de retaper vos factures.",', '"Stop re-typing invoices.": "Arrêtez de retaper vos factures.",\n      "Join thousands of finance teams who let AI do the reading.": "Rejoignez des milliers d\'équipes financières qui laissent l\'IA faire la lecture.",');

fs.writeFileSync('index.html', html);
console.log('patched');
