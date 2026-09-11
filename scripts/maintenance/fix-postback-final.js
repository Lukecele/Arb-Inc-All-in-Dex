const fs = require("fs");
let f = fs.readFileSync("app/api/postback/route.ts", "utf8");

// 1. Aggiungi import ethers in cima (manca ancora)
if (f.indexOf("isAddress") === -1 || f.indexOf('from "ethers"') === -1) {
  f = 'import { isAddress, getAddress } from "ethers";\n' + f;
}

// 2. ref:parent usa ancora "wallet" invece di "safeWallet" — correggi
f = f.replace(
  "ref:parent:" + "${wallet}`",
  "ref:parent:" + "${safeWallet}`"
);

fs.writeFileSync("app/api/postback/route.ts", f);
console.log("OK");
