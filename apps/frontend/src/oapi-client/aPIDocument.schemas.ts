/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * API Document
 * API Document Description
 * OpenAPI spec version: 1.0
 */
export type TransactionControllerGetUserTransactionsSortBy =
  (typeof TransactionControllerGetUserTransactionsSortBy)[keyof typeof TransactionControllerGetUserTransactionsSortBy];

export const TransactionControllerGetUserTransactionsSortBy = {
  "createdAt+asc": "createdAt+asc",
  "createdAt+desc": "createdAt+desc",
  "amount+asc": "amount+asc",
  "amount+desc": "amount+desc",
} as const;

export type TransactionControllerGetUserTransactionsParams = {
  /**
   * Sort order
   */
  sortBy: TransactionControllerGetUserTransactionsSortBy;
  /**
   * Time scope
   */
  time: string;
  /**
   * Page number
   */
  page: number;
  /**
   * Data per page
   */
  limit: number;
};

export type TransactionControllerGetTransactionsSortBy =
  (typeof TransactionControllerGetTransactionsSortBy)[keyof typeof TransactionControllerGetTransactionsSortBy];

export const TransactionControllerGetTransactionsSortBy = {
  "createdAt+asc": "createdAt+asc",
  "createdAt+desc": "createdAt+desc",
  "amount+asc": "amount+asc",
  "amount+desc": "amount+desc",
} as const;

export type TransactionControllerGetTransactionsParams = {
  /**
   * Sort order
   */
  sortBy: TransactionControllerGetTransactionsSortBy;
  /**
   * Time scope
   */
  time: string;
  /**
   * Page number
   */
  page: number;
  /**
   * Data per page
   */
  limit: number;
};

export interface PurchaseSolarCoinsRequestDTO {
  /** Amount in Thai Baht (thb) */
  amount: number;
  /** Carbon footprint (KgCO2eq) */
  cf: number;
  /** Solar Carbon Coin (coins) */
  scc: number;
  /** Omise Token for charging. */
  tokenId: string;
}

export interface SolarGenerateRequestDTO {
  /** Carbon Credit Serial Number */
  ccSerial: string;
}

export interface ResendEmailRequestDto {
  /** User's email */
  email: string;
  /** User's id */
  id: number;
}

export interface ResendEmailResponseDto {
  /** Return true if success. */
  success: boolean;
  /** Brief description of the response. */
  message: string;
}

export interface VerifyEmailResponseDto {
  /** Return true if success. */
  success: boolean;
  /** Brief description of the response. */
  message: string;
  /** Email. */
  email: string;
}

export interface LoginRequest {
  /** User's email */
  email?: string;
  /** User's name */
  name?: string;
  /** User's password */
  password: string;
}

/**
 * SMEs' size
 */
export type RegisterUserSMEsRequestSize =
  (typeof RegisterUserSMEsRequestSize)[keyof typeof RegisterUserSMEsRequestSize];

export const RegisterUserSMEsRequestSize = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
} as const;

/**
 * SMEs' type
 */
export type RegisterUserSMEsRequestIndustry =
  (typeof RegisterUserSMEsRequestIndustry)[keyof typeof RegisterUserSMEsRequestIndustry];

export const RegisterUserSMEsRequestIndustry = {
  MANUFACTURE: "MANUFACTURE",
  TRADE: "TRADE",
  SERVICE: "SERVICE",
} as const;

export interface RegisterUserSMEsRequest {
  /** User's email */
  email: string;
  /** User's password */
  password: string;
  /** User's name */
  name: string;
  /** User's telephone number */
  phone: string;
  /** SMEs' type */
  industry: RegisterUserSMEsRequestIndustry;
  /** SMEs' size */
  size: RegisterUserSMEsRequestSize;
}

export interface RegisterUserRetailRequest {
  /** User's email */
  email: string;
  /** User's password */
  password: string;
  /** User's name */
  name: string;
  /** User's telephone number */
  phone: string;
}
