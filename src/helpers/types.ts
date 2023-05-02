type Policy = {
  id: string;
  policyTokenIssuerAddress: string;
  policyId: string;
  productId: string;
  marketId: string;
  owner: string;
  issuer: string;
  coverage: string;
  coverageChanged: string;
  underlyingCover: string;
  validFrom: string;
  validUntil: string;
  originalBalance: string;
  balance: string;
  totalCharged: string;
  expired: boolean;
  waitingPeriod: string;
  updatedAt: string;
  liquidatedAt: string | null;
  liquidatedBy: string | null;
  initialMarketPremiumMulAccumulator: string;
  premiumDeposit: string;
  foAddress: string;
  foFeeRate: string;
  foFeeDeposit: string;
  referralAddress: string;
  referralFeeRate: string;
  referralFeeDeposit: string;
  referralBonus: string;
  claims: any[];
  permissionTokens: PermissionToken[];
};

type PermissionToken = {
  id: string;
  policyId: string;
  owner: string;
};

type LoanRequest = {
  id: string;
  amount: string;
  status: string;
  asset: string;
  apy?: string;
};

type PolicyAdjstmentsAndMarket = {
  adjustmentConfigurations: [
    {
      id: string;
      configId: string;
      coverAdjuster: string;
      productId: string;
      policyId: string;
      tokenId: string;
      maxCoverage: string;
      maxRate: string;
      lastAdjustmentAt: string | number;
      adjustmentFrequency: string;
    }
  ];
  markets: [
    {
      premiumToken: string;
    }
  ];
};

type UserPayouts = {
  payouts: [
    {
      id: string;
      marketId: string;
      recipient: string;
      amount: string;
      capitalToken: string;
    }
  ];
  payoutRequests: [
    {
      id: string;
      marketId: string;
      recipient: string;
      distributor: boolean;
      requestedAmount: string;
      status: number;
      data: string | null;
    }
  ];
};

type Market = {
  id: string;
  marketId: string;
  productId: string;
  riskPoolsControllerAddress: string;
  entityList: string;
  isEnabled: string;
  createdAt: string;
  title: string;
  marketFeeRecipient: string;
  details: string;
  wording: string;
  author: string;
  premiumToken: string;
  capitalToken: string;
  insuredToken: string;
  latestAccruedTimestamp: string;
  coverAdjusterOracle: string;
  rateOracle: string;
  waitingPeriod: string;
  marketOperatorIncentiveFee: string;
  policyBuyerAllowListId: string;
  policyBuyerAllowanceListId: string;
  status: string;
  premiumMulAccumulator: string;
  settlementDiscount: string;
  desiredCover: string;
  withdrawDelay: string;
  headAggregatedPoolId: string;
  tailCover: string;
  maxPremiumRatePerSec: string;
  bidStepPremiumRatePerSec: string;
  maxAggregatedPoolSlots: string;
};

type LoanPayout = {
  id: string;
  marketId: string;
  recipient: string;
  amount: string;
  data: string | null;
  status: string;
  token: string;
};

type Product = {
  id: string;
  productId: string;
  riskPoolsControllerAddress: string;
  policyTokenIssuerAddress: string;
  treasuryAddress: string;
  payoutRequester: string;
  payoutApprover: string;
  productIncentiveFee: string;
  maxMarketIncentiveFee: string;
  title: string;
  wording: string;
  cashSettlementIsEnabled: boolean;
  physicalSettlementIsEnabled: boolean;
  feeToken: string;
  marketCreationFeeAmount: string;
  defaultPremiumToken: string;
  defaultCapitalToken: string;
  defaultCoverAdjusterOracle: string;
  claimProcessor: string;
  defaultRatesOracle: string;
  withdrawalDelay: string;
  withdrawRequestExpiration: string;
  marketCreatorsAllowlistId: string;
  waitingPeriod: string;
  operator: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  status: number;
};

type MarketQuote = {
  id: string;
  marketId: string;
  capitalToken: string;
  premiumToken: string;
  apy: string;
  quotePerSecond: string;
};

export {
  Policy,
  PolicyAdjstmentsAndMarket,
  LoanRequest,
  UserPayouts,
  Market,
  LoanPayout,
  Product,
  MarketQuote,
};
