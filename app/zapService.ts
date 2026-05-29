import { ethers } from "ethers";
import { ZAP_CONTRACTS } from "./zapConfig";

// ABI minime necessarie per l'interazione
const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function nonces(address owner) view returns (uint256)",
  "function name() view returns (string)"
];

const KS_ZAP_ROUTER_ABI = [
  "function zapIn(address pool, uint256 amount0Max, uint256 amount1Max, bytes calldata data) external payable returns (uint256 liquidity)",
  "function zapOut(address pool, uint256 liquidity, uint256 amount0Min, uint256 amount1Min, address to) external returns (uint256 amount0, uint256 amount1)"
];

export class ZapService {
  private provider: ethers.providers.Web3Provider;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
  }

  /**
   * Controlla se il Router classico ha l'allowance per spendere il token.
   * Se non lo ha, richiede la transazione di approvazione standard.
   */
  async checkAndApproveToken(
    tokenAddress: string,
    owner: string,
    amount: ethers.BigNumber
  ): Promise<boolean> {
    const signer = this.provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    
    const allowance: ethers.BigNumber = await tokenContract.allowance(owner, ZAP_CONTRACTS.KS_ZAP_ROUTER_POSITION);
    
    if (allowance.lt(amount)) {
      const tx = await tokenContract.approve(ZAP_CONTRACTS.KS_ZAP_ROUTER_POSITION, ethers.constants.MaxUint256);
      await tx.wait();
      return true;
    }
    return false;
  }

  /**
   * Genera la firma EIP-712 (Permit) per evitare l'approve on-chain.
   * Da usare con KS_ZAP_ROUTER_POSITION_PERMIT.
   */
  async getPermitSignature(
    tokenAddress: string,
    owner: string,
    amount: ethers.BigNumber,
    deadline: number
  ): Promise<{ v: number; r: string; s: string }> {
    const signer = this.provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
    
    const [nonce, name, chainId] = await Promise.all([
      tokenContract.nonces(owner),
      tokenContract.name(),
      signer.getChainId()
    ]);

    const domain = {
      name: name,
      version: "1",
      chainId: chainId,
      verifyingContract: tokenAddress,
    };

    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const value = {
      owner: owner,
      spender: ZAP_CONTRACTS.KS_ZAP_ROUTER_POSITION_PERMIT,
      value: amount,
      nonce: nonce,
      deadline: deadline,
    };

    // Richiede la firma via portafoglio dell'utente (Metamask/TrustWallet)
    const signature = await signer._signTypedData(domain, types, value);
    return ethers.utils.splitSignature(signature);
  }

  /**
   * Esegue lo Zap In iniettando liquidità in una pool partendo da singoli token
   */
  async executeZapIn(
    poolAddress: string,
    amount0Max: string,
    amount1Max: string,
    zapData: string, // Payload generato dall'API dell'aggregatore/Kyber
    value?: string // Se si passa BNB nativo
  ) {
    const signer = this.provider.getSigner();
    const zapRouter = new ethers.Contract(ZAP_CONTRACTS.KS_ZAP_ROUTER_POSITION, KS_ZAP_ROUTER_ABI, signer);

    const txOptions = value ? { value: ethers.utils.parseEther(value) } : {};
    
    return await zapRouter.zapIn(
      poolAddress,
      ethers.utils.parseUnits(amount0Max, 18),
      ethers.utils.parseUnits(amount1Max, 18),
      zapData,
      txOptions
    );
  }

  /**
   * Esegue lo Zap Out rimuovendo liquidità e ritornando i token scelti alla destinazione
   */
  async executeZapOut(
    poolAddress: string,
    liquidityAmount: string,
    amount0Min: string,
    amount1Min: string,
    recipient: string
  ) {
    const signer = this.provider.getSigner();
    const zapRouter = new ethers.Contract(ZAP_CONTRACTS.KS_ZAP_ROUTER_POSITION, KS_ZAP_ROUTER_ABI, signer);

    return await zapRouter.zapOut(
      poolAddress,
      ethers.utils.parseUnits(liquidityAmount, 18),
      ethers.utils.parseUnits(amount0Min, 18),
      ethers.utils.parseUnits(amount1Min, 18),
      recipient
    );
  }
}
