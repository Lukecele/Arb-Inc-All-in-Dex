import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// ============================================
// Zap API Configuration
// ============================================

export interface ZapApiConfig {
  apiDomain: string;
  chainId: number;
  clientId?: string; // X-Client-Id header for rate limiting
}

const DEFAULT_CONFIG: ZapApiConfig = {
  apiDomain: 'https://zap-api.kyberswap.com',
  chainId: 56, // BSC Smart Chain
  clientId: undefined, // Optional, but recommended for higher rate limits
};

// ============================================
// Retry Configuration
// ============================================

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
};

// ============================================
// API Client Class
// ============================================

export class ZapApiClient {
  private client: AxiosInstance;
  private config: ZapApiConfig;
  private retryConfig: RetryConfig;

  constructor(config?: Partial<ZapApiConfig>, retryConfig?: Partial<RetryConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };

    this.client = axios.create({
      baseURL: `${this.config.apiDomain}/${this.config.chainId}`,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add client ID if provided for higher rate limits
        ...(this.config.clientId ? { 'X-Client-Id': this.config.clientId } : {}),
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleApiError(error)
    );
  }

  // ============================================
  // Retry Logic
  // ============================================

  private async retryRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    retryCount: number = 0
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFn();
    } catch (error) {
      // Only retry on network errors or 5xx status codes
      const axiosError = error as AxiosError;
      const shouldRetry =
        retryCount < this.retryConfig.maxRetries &&
        (!axiosError.response || axiosError.response.status >= 500);

      if (!shouldRetry) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = Math.min(
        this.retryConfig.baseDelay * Math.pow(2, retryCount) + Math.random() * 1000,
        this.retryConfig.maxDelay
      );

      console.warn(`Zap API request failed, retrying in ${delay}ms... (attempt ${retryCount + 1}/${this.retryConfig.maxRetries})`);

      await new Promise(resolve => setTimeout(resolve, delay));

      return this.retryRequest(requestFn, retryCount + 1);
    }
  }

  // ============================================
  // Error Handling
  // ============================================

  private handleApiError(error: AxiosError): never {
    if (error.response) {
      // Server responded with error status
      const data = error.response.data as any;
      const message = data?.message || error.message;
      const code = data?.code || error.response.status;

      throw new Error(`Zap API Error ${code}: ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response received from Zap API server');
    } else {
      // Something happened in setting up the request
      throw new Error(`Request setup error: ${error.message}`);
    }
  }

  // ============================================
  // Generic Request Methods
  // ============================================

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<{ code: number; message: string; data: T; requestId?: string }> {
    const response = await this.retryRequest(() =>
      this.client.get<{ code: number; message: string; data: T; requestId?: string }>(url, config)
    );
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ code: number; message: string; data: T; requestId?: string }> {
    const response = await this.retryRequest(() =>
      this.client.post<{ code: number; message: string; data: T; requestId?: string }>(url, data, config)
    );
    return response.data;
  }

  // ============================================
  // Zap API Specific Methods
  // ============================================

  // Zap In (Enter Liquidity Position)
  async getZapInRoute(params: {
    dex: string; // DEX_UNISWAPV3, DEX_PANCAKESWAPV2, etc.
    'pool.id': string; // Pool ID
    'position.tickLower'?: number; // Lower tick position
    'position.tickUpper'?: number; // Upper tick position
    tokensIn: string; // Input token address
    amountsIn: string; // Input token amount (wei)
    slippage?: number; // Slippage in basis points (default: 100 = 1%)
    feeAddress?: string; // Fee recipient address
    feePcm?: number; // Fee in per cent mille (default: 0)
    deadline?: number; // Transaction deadline (Unix timestamp)
  }) {
    return this.get<{
      route: string; // Base64 encoded route
      routerAddress: string;
      gas: string; // Estimated gas
      gasUsd: string; // USD value of gas
      // Additional data depending on zap type
    }>(`/api/v1/in/route`, { params });
  }

  async buildZapInTx(params: {
    sender: string; // Sender address
    recipient: string; // Recipient address
    route: string; // Route from preview endpoint
    deadline: number; // Transaction deadline (Unix timestamp)
  }) {
    return this.post<{
      calldata: string; // Transaction data
      value: string; // Native token value to send
      routerAddress: string; // Target contract address
    }>(`/api/v1/in/route/build`, params);
  }

  // Zap Out (Exit Liquidity Position)
  async getZapOutRoute(params: {
    dex: string; // DEX_UNISWAPV3, DEX_PANCAKESWAPV2, etc.
    'pool.id': string; // Pool ID
    'position.tickLower'?: number; // Lower tick position
    'position.tickUpper'?: number; // Upper tick position
    tokensOut: string; // Output token address
    amountsOut: string; // Output token amount (wei)
    slippage?: number; // Slippage in basis points (default: 100 = 1%)
    feeAddress?: string; // Fee recipient address
    feePcm?: number; // Fee in per cent mille (default: 0)
    deadline?: number; // Transaction deadline (Unix timestamp)
  }) {
    return this.get<{
      route: string; // Base64 encoded route
      routerAddress: string;
      gas: string; // Estimated gas
      gasUsd: string; // USD value of gas
      // Additional data depending on zap type
    }>(`/api/v1/out/route`, { params });
  }

  async buildZapOutTx(params: {
    sender: string; // Sender address
    recipient: string; // Recipient address
    route: string; // Route from preview endpoint
    deadline: number; // Transaction deadline (Unix timestamp)
  }) {
    return this.post<{
      calldata: string; // Transaction data
      value: string; // Native token value to send
      routerAddress: string; // Target contract address
    }>(`/api/v1/out/route/build`, params);
  }

  // ============================================
  // Configuration Helpers
  // ============================================

  getApiDomain(): string {
    return this.config.apiDomain;
  }

  getChainId(): number {
    return this.config.chainId;
  }

  updateConfig(newConfig: Partial<ZapApiConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.apiDomain || newConfig.chainId) {
      this.client.defaults.baseURL = `${this.config.apiDomain}/${this.config.chainId}`;
    }

    // Update headers if clientId changed
    if (newConfig.clientId !== undefined) {
      if (this.config.clientId) {
        this.client.defaults.headers.common['X-Client-Id'] = this.config.clientId;
      } else {
        delete this.client.defaults.headers.common['X-Client-Id'];
      }
    }
  }
}

// ============================================
// Factory Function
// ============================================

export function createZapApiClient(
  config?: Partial<ZapApiConfig>,
  retryConfig?: Partial<RetryConfig>
): ZapApiClient {
  return new ZapApiClient(config, retryConfig);
}

// ============================================
// Singleton Instance (optional)
// ============================================

let defaultZapClientInstance: ZapApiClient | null = null;

export function getDefaultZapClient(): ZapApiClient {
  if (!defaultZapClientInstance) {
    defaultZapClientInstance = createZapApiClient();
  }
  return defaultZapClientInstance;
}

export function setDefaultZapClient(client: ZapApiClient): void {
  defaultZapClientInstance = client;
}