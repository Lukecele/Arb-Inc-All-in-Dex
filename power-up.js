const fs = require('fs');
const path = require('path');

const LAYOUT_PATH = path.join(__dirname, 'app/layout.tsx');

console.log("🚀 Avvio Ottimizzazione Pro per Arb-Inc...");

try {
    let content = fs.readFileSync(LAYOUT_PATH, 'utf8');

    // AGGIUNTA SCHEMA FINANCIAL PRODUCT (SEO Avanzata)
    if (!content.includes('FinancialProduct')) {
        const financialSchema = `
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": "Arb Inc Token",
      "description": "Deflationary token with 20% burn and BNB rewards on the Arbitrage Inception DEX.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "BNB",
        "availability": "https://schema.org/InStock"
      }
    })
  }}
/>`;
        content = content.replace('</head>', `${financialSchema}\n</head>`);
        console.log("✅ Schema FinancialProduct aggiunto.");
    }

    fs.writeFileSync(LAYOUT_PATH, content);
    console.log("🎉 Ottimizzazione completata con successo!");

} catch (err) {
    console.error("❌ Errore:", err.message);
}
