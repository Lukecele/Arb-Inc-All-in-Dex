# Contract Audit & Transparency
## Token Contract
| Field | Value |
|---|---|
| Address | 0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c |
| Network | BNB Smart Chain (Chain ID 56) |
| Standard | BEP-20 |
| Source | [BSCScan Verified](https://bscscan.com/address/0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c#code) |
| SPDX License | MIT |
| Contract Name | TaxableToken |
| Compiler | v0.8.30+commit.73712a01 |
## Immutability — No Admin Functions
The contract has NO privileged functions after deployment:
- No `onlyOwner` modifier exists anywhere in the contract
- No `setTaxWallet()` — tax wallet is immutable post-deploy
- No `setTaxPercentage()` — tax percentage is immutable post-deploy
- No `mint()` — supply is fixed
- No `pause()` or `blacklist()` functions
The `owner` state variable exists but controls nothing — there are zero
functions that check `msg.sender == owner`. Ownership cannot be used to
alter contract behavior. Verify this by reading the ABI on BSCScan.
## Parameters Set at Deploy (Immutable)
| Parameter | Value |
|---|---|
| Total Supply | 1,000,000,000 (9 decimals) |
| Tax Percentage | 4% (buy and sell) |
| Tax Wallet | 0x66BB01F14229E2179bAD84D52A69C0e4628dE63f |
## No Professional Audit
This contract has not undergone a paid audit. It is a simple BEP-20
implementation with tax-on-transfer logic — no complex DeFi mechanics.
Source code is fully public on BSCScan.
## Third-Party Integrations (Frontend Only)
- KyberSwap Liquidity Widgets
- Mayan Finance Bridge
- PancakeSwap Router
