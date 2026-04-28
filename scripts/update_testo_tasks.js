const fs = require('fs');
const file = '/home/luca/progetti/arb-inc/app/rewards/RewardsClient.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Aggiungiamo un sottotitolo esplicativo sotto "🪂 Earn Extra Points"
const targetSubtitle = `<h3 style={{ color: '#f472b6', marginBottom: '15px' }}>🪂 Earn Extra Points</h3>`;
const newSubtitle = `<h3 style={{ color: '#f472b6', marginBottom: '5px' }}>🪂 Earn Extra Points</h3>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>Complete any offer below to earn <b>+250 Points</b> instantly!</p>`;

// 2. Aggiungiamo (+250 Pts) al pulsante "Complete Task"
const targetButton = `<a href={off.link} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Complete Task →</a>`;
const newButton = `<a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: '#111', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'inline-block' }}>Complete Task (+250 Pts) →</a>`;

let modified = false;

if (code.includes(targetSubtitle)) {
    code = code.replace(targetSubtitle, newSubtitle);
    modified = true;
}

if (code.includes(targetButton)) {
    code = code.replace(targetButton, newButton);
    modified = true;
}

if (modified) {
    fs.writeFileSync(file, code);
    console.log("✅ Frontend (Tasks Box) aggiornato con successo!");
} else {
    console.log("⚠️ Testo non trovato. Forse era già stato modificato?");
}
