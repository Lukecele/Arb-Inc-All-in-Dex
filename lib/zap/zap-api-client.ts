import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

export interface ZapApiConfig {
  apiDomain: string;
  chainId: number;
  clientId?: string;
}

const DEFAULT_CONFIG: ZapApiConfig = {
  apiDomain: 'https://zap-api.kyberswap.com',
  chainId: 56, // BSC as default
};

interface ZapInRouteParams {
  dex: string;
  'pool.id': string;
  'position.tickLower'?: number;
  'position.tickUpper'?: number;
  tokensIn: string;
  amountsIn: string;
  slippage?: number;
  feeAddress?: string;
  feePcm?: number;
  deadline?: number;
}

interface ZapOutRouteParams {
  dexFrom: string;
  'pool_from.id': string;
  'position_from.id': string;
  tokens_to: string;
  slippage?: number;
  feeAddress?: string;
  feePcm?: number;
  deadline?: number;
}

export class ZapApiClient {
  private client: AxiosInstance;
  private config: ZapApiConfig;

  constructor(config?: Partial<ZapApiConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };

    const chainMap: Record<number, string> = {
      1: 'ethereum',
      56: 'bsc',
      137: 'polygon',
      42161: 'arbitrum',
      10: 'optimism',
      43114: 'avalanche',
      250: 'fantom',
      59144: 'linea',
      324: 'zksync',
      1101: 'polygon-zkevm',
      8453: 'base',
    };
    const chainPath = chainMap[this.config.chainId] || this.config.chainId.toString();

    this.client = axios.create({
      baseURL: `${this.config.apiDomain}/${chainPath}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.config.clientId ? { 'X-Client-Id': this.config.clientId } : {}),
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const data = error.response.data as any;
          throw new Error(data?.message || data?.error || error.message);
        }
        throw new Error(error.message);
      }
    );
  }

  async getZapInRoute(params: ZapInRouteParams) {
    const { data } = await this.client.get('/api/v1/in/route', { params });
    return data;
  }

  async buildZapInTx(params: {
    sender: string;
    recipient: string;
    route: string;
    deadline?: number;
  }) {
    const { data } = await this.client.post('/api/v1/in/route/build', params);
    return data;
  }

  async getZapOutRoute(params: ZapOutRouteParams) {
    const { data } = await this.client.get('/api/v1/out/route', { params });
    return data;
  }

  async buildZapOutTx(params: {
    sender: string;
    recipient: string;
    route: string;
    deadline?: number;
  }) {
    const { data } = await this.client.post('/api/v1/out/route/build', params);
    return data;
  }
}

let defaultInstance: ZapApiClient | null = null;
export function getDefaultZapClient(): ZapApiClient {
  if (!defaultInstance) {
    defaultInstance = new ZapApiClient();
  }
  return defaultInstance;
}
