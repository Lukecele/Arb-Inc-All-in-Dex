# DeFiLlama Adapter - Arbitrage Inc

## Status: ✅ Ready for Submission

## File Location
`/home/luca/Scrivania/white-page/defillama-adapters/fees/arbitrage-inc.ts`

## Test Results
```
🦙 Running ARBITRAGE-INC adapter 🦙
Start Date: Wed, 25 Mar 2026
End Date: Thu, 26 Mar 2026
BSC 👇
Daily fees: 0.00 (no transactions yet)
Daily revenue: 0.00
```

## Instructions to Submit

### Option 1: GitHub Web Interface (Recommended)

1. **Go to:** https://github.com/DefiLlama/dimension-adapters

2. **Click "Fork"** (top right corner)

3. **In your fork:**
   - Navigate to `fees/` folder
   - Click "Add file" → "Create new file"
   - Name it: `arbitrage-inc.ts`
   - Paste the content from `/home/luca/Scrivania/white-page/defillama-adapters/fees/arbitrage-inc.ts`

4. **Click "Commit changes"**

5. **Create Pull Request:**
   - Click "Contribute" → "Open pull request"
    - Fill in:
      - **Title:** `feat(fees): add Arbitrage Inc. fees adapter`
      - **Description:**
        ```
        ## Project Name
        Arbitrage Inc.

        ## Project Type
        DEX Aggregator / Fees

        ## Methodology
        We track fees sent to the address 0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7 which represents the developer commission for every arbitrage executed via our frontend integration.

        ## Chain
        BNB Smart Chain (BSC)

        ## Adapter Details
        - Version: 2
        - Start Date: 2026-03-20
        - Tracks: Token transfers to fee receiver address
        ```
       ## Project Name
       Arbitrage Inc.

       ## Project Type
       DEX Aggregator / Fees

       ## Methodology
       We track fees sent to the address 0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7 which represents the developer commission for every arbitrage executed via our frontend integration.

       ## Chain
       BNB Smart Chain (BSC)

       ## Adapter Details
       - Version: 2
       - Start Date: 2026-03-20
       - Tracks: Token transfers to fee receiver address
       ```

### Option 2: GitHub CLI (If authenticated)

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/dimension-adapters.git
cd dimension-adapters

# Copy the adapter file
cp /home/luca/Scrivania/white-page/defillama-adapters/fees/arbitrage-inc.ts fees/

# Commit and push
git add fees/arbitrage-inc.ts
git commit -m "feat(fees): add Arbitrage Inc. fees adapter"
git push origin main

# Create PR
gh pr create --title "feat(fees): add Arbitrage Inc. fees adapter" --body "$(cat <<'EOF'
## Project Name
Arbitrage Inc.

## Project Type
DEX Aggregator / Fees

## Methodology
We track fees sent to the address 0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7 which represents the developer commission for every arbitrage executed via our frontend integration.

## Chain
BNB Smart Chain (BSC)
EOF)"
```

---

## Adapter Code (for reference)

```typescript
import { Adapter, FetchOptions } from "../adapters/types";
import { CHAIN } from "../helpers/chains";
import { addTokensReceived } from "../helpers/token";

const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7';

const fetch: any = async (options: FetchOptions) => {
  const dailyFees = await addTokensReceived({
    options,
    tokens: [
      '0xbb4CdB9CBd36B01bD1cBaEBf2E08E7023b076de6',
      '0xe9e7CEA3DedcA698478E4cbC3F78dF2E8C6E2F8B',
      '0x55d398326f99059fF775485246999027B3197955',
      '0x7130d2A12B9BCbFAe4f2634d864A1BCe1767a8D0',
      '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    ],
    targets: [FEE_RECEIVER],
  });

  return {
    dailyFees,
    dailyRevenue: dailyFees,
  };
};

const adapter: Adapter = {
  version: 2,
  chains: [CHAIN.BSC],
  fetch,
  start: '2026-03-20',
  methodology: {
    Fees: "We track fees sent to the fee receiver address which represents the developer commission for every arbitrage executed via our frontend integration.",
    Revenue: "Developer fees are collected from each trade and sent to the designated fee receiver address.",
  },
};

export default adapter;
```

---

## Links

- **Repository:** https://github.com/DefiLlama/dimension-adapters
- **Your Fork:** https://github.com/DefiLlama/dimension-adapters/fork
- **PR Create:** https://github.com/DefiLlama/dimension-adapters/compare

## Next Steps After PR Merged

Once your PR is merged (usually takes 24-48h):
1. Your protocol will appear on: https://defillama.com/fees
2. Fees will be tracked automatically from the fee receiver address