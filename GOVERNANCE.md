# Protocol Governance

Arbitrage Inception operates as permissionless open-source software with no central authority.

## Smart Contract
The token contract (TaxableToken on BSCScan) was deployed with immutable parameters
set in the constructor. There are no admin functions, no owner privileges, and no
mechanism to change the taxWallet or taxPercentage after deployment. The contract
is fully verifiable on BSCScan.

## Frontend
Changes are proposed via Pull Requests. The codebase is MIT-licensed and anyone
can fork, deploy, and run their own instance.

## Treasury
The treasury address and all distributions are on-chain and publicly verifiable.
No party can unilaterally redirect or freeze funds.
