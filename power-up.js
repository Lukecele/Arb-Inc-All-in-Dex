const fs = require('fs');
const path = require('path');

const LAYOUT_PATH = path.join(__dirname, 'app/layout.tsx');

console.log("🚀 Avvio ottimizzazione Arb-Inc...");

try {
    let content = fs.readFileSync(LAYOUT_PATH, 'utf8');

    // 1. AGGIUNTA JSON-LD (SEO)
    if (!content.includes('application/ld+json')) {
        const jsonLD = `
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Arbitrage Inception",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "description": "DEX Aggregator and Liquidity Hub on BNB Smart Chain"
    })
  }}
/>`;
        content = content.replace('</head>', `${jsonLD}\n</head>`);
        console.log("✅ JSON-LD SEO aggiunto.");
    }

    // 2. CORREZIONE DINAMICA WIDGET (Previene Hydration Error)
    if (!content.includes('next/dynamic')) {
        const dynamicImport = 'import dynamic from "next/dynamic";\n';
        content = dynamicImport + content;
        console.log("✅ Sistema Dynamic Import preparato.");
    }

    fs.writeFileSync(LAYOUT_PATH, content);
    console.log("🎉 Tutte le modifiche sono state applicate con successo!");

} catch (err) {
    console.error("❌ ERRORE durante l'automazione:", err.message);
    process.exit(1);
}
