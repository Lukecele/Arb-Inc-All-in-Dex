export interface VaultConfig {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  tvl: number;
  token: string;
  tokenDecimals: number;
}

// Vault in fase di caricamento manuale dall'Explorer.
// Aggiungeremo presto i primi vault reali.
export const vaultsList: VaultConfig[] = [];
