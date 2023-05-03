import axios from "axios";

import { LoanPayout, LoanRequest, MarketQuote, Policy } from "../helpers/types";
import {
  getMarketById,
  getMarketsByProduct,
  getPolicyAdjstmentsAndMarket,
  getProduct,
  getUserPayouts,
  getUserPolicies,
} from "../helpers/subgraph";
import { PayoutStatus, USDC_DECIMALS, USDC_SYMBOL } from "../helpers/constants";
import { toNormalNumber } from "../helpers/utils";

const ATOMICA_URL = process.env.ATOMICA_URL || "";

const getUserLoanRequest = async (address: string) => {
  const { policies } = await getUserPolicies(address);

  const loans: LoanRequest[] = await Promise.all(
    policies.map(async (policy: Policy) => {
      let requestApy: string = "";
      const { adjustmentConfigurations, markets } =
        await getPolicyAdjstmentsAndMarket(policy.policyId, policy.marketId);

      if (adjustmentConfigurations.length) {
        requestApy = toNormalNumber(adjustmentConfigurations[0].maxRate, 16);
      } else {
        const { apy } = await getMarketQuote(policy.marketId);
        requestApy = parseFloat(apy).toFixed(2).toString();
      }

      const loan: LoanRequest = {
        id: policy.policyId,
        amount: adjustmentConfigurations.length
          ? adjustmentConfigurations[0].maxCoverage
          : policy.coverage,
        tokenAddress: markets[0].premiumToken,
        tokenDecimals: USDC_DECIMALS,
        tokenSymbol: USDC_SYMBOL,
        apy: requestApy,
        status:
          policy.expired && adjustmentConfigurations.length
            ? "pending"
            : "active",
      };

      return loan;
    })
  );

  return loans;
};

const getUserLoans = async (address: string) => {
  const { payoutRequests, payouts } = await getUserPayouts(address);

  const loanPayoutRequests: LoanPayout[] = await Promise.all(
    payoutRequests.map(async (pr) => {
      const { markets } = await getMarketById(pr.marketId);

      const request: LoanPayout = {
        id: pr.id,
        amount: pr.requestedAmount,
        data: pr.data,
        marketId: pr.marketId,
        recipient: pr.recipient,
        status: PayoutStatus[pr.status],
        tokenAddress: markets[0].capitalToken,
        tokenSymbol: USDC_SYMBOL,
        tokenDecimals: USDC_DECIMALS,
      };

      return request;
    })
  );

  const loanPayouts: LoanPayout[] = payouts.map((payout) => {
    const loan: LoanPayout = {
      id: payout.id,
      amount: payout.amount,
      tokenAddress: payout.capitalToken,
      recipient: payout.recipient,
      status: PayoutStatus[2], // Accepted
      marketId: payout.marketId,
      data: null,
      tokenSymbol: USDC_SYMBOL,
      tokenDecimals: USDC_DECIMALS,
    };

    return loan;
  });

  return { loanPayouts, loanPayoutRequests };
};

const listMarkets = async () => {
  const { products } = await getProduct();
  const { markets } = await getMarketsByProduct();

  return {
    product: products[0],
    markets,
  };
};

const getMarketQuote = async (marketId: string): Promise<MarketQuote> => {
  const { data } = await axios.get(
    `${ATOMICA_URL}/deployments/any/products/any/markets/${marketId}/quote/`
  );
  return data[0].markets[0];
};

export { getUserLoanRequest, getUserLoans, listMarkets };
