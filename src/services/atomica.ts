import { LoanPayout, LoanRequest, Policy } from "../helpers/types";
import {
  getMarketById,
  getPolicyAdjstmentsAndMarket,
  getUserPayouts,
  getUserPolicies,
} from "../helpers/subgraph";
import { PayoutStatus } from "../helpers/constants";

const getUserLoanRequest = async (address: string) => {
  const { policies } = await getUserPolicies(address);

  const loans: LoanRequest[] = await Promise.all(
    policies.map(async (policy: Policy) => {
      const { adjustmentConfigurations, markets } =
        await getPolicyAdjstmentsAndMarket(policy.policyId, policy.marketId);

      const loan: LoanRequest = {
        id: policy.policyId,
        amount: adjustmentConfigurations.length
          ? adjustmentConfigurations[0].maxCoverage
          : policy.coverage,
        asset: markets[0].premiumToken,
        apy: adjustmentConfigurations.length
          ? adjustmentConfigurations[0].maxRate
          : "0",
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
        token: markets[0].capitalToken,
      };

      return request;
    })
  );

  const loanPayouts: LoanPayout[] = payouts.map((payout) => {
    const loan: LoanPayout = {
      id: payout.id,
      amount: payout.amount,
      token: payout.capitalToken,
      recipient: payout.recipient,
      status: PayoutStatus[2], // Accepted
      marketId: payout.marketId,
      data: null,
    };

    return loan;
  });

  return { loanPayouts, loanPayoutRequests };
};

export { getUserLoanRequest, getUserLoans };
