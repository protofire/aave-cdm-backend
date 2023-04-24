import axios from "axios";
import dotenv from "dotenv";
import { LoanRequest, Policy } from "../helpers/types";
import {
  getPolicyAdjstmentsAndMarket,
  getUserPolicies,
} from "../helpers/subgraph";

dotenv.config();

// const ATOMICA_URL = process.env.ATOMICA_URL || "";
// const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID || "";

const getUserLoanRequest = async (address: string) => {
  const { policies } = await getUserPolicies(address);
  const loans: LoanRequest[] = [];

  await Promise.all(
    policies.map(async (policy: Policy) => {
      const { adjustmentConfigurations, markets } =
        await getPolicyAdjstmentsAndMarket(policy.policyId, policy.marketId);
      console.log(adjustmentConfigurations);
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
      loans.push(loan);
    })
  );
  return loans;
};

const getUserLoans = () => {};

export { getUserLoanRequest };
