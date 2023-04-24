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

export { Policy, PolicyAdjstmentsAndMarket, LoanRequest };
