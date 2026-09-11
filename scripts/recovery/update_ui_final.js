const fs = require("fs");
const file = "/home/luca/progetti/arb-inc/app/rewards/RewardsClient.tsx";
let code = fs.readFileSync(file, "utf8");

const targetSubtitle = `<h3 style={{ color: '#f472b6', marginBottom: '15px' }}>🪂 Earn Extra Points</h3>`;
const newSubtitle = `<h3 style={{ color: '#f472b6', marginBottom: '5px' }}>🪂 Earn Extra Points</h3>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>Complete any offer below to earn <b>+250 Points</b> instantly!</p>`;

const targetButton = `<a href={off.link} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Complete Task →</a>`;
const newButton = `<a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: '#111', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'inline-block' }}>Complete Task (+250 Pts) →</a>`;

code = code.replace(targetSubtitle, newSubtitle);
code = code.replace(targetButton, newButton);
fs.writeFileSync(file, code);
console.log("✅ Grafica aggiornata!");
