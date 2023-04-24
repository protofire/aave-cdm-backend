import { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

import { Policy, PolicyAdjstmentsAndMarket } from "../helpers/types";

dotenv.config();

const SUBGRAPH_URL = process.env.SUBGRAPH_URL || "";

const initClient = () => new GraphQLClient(SUBGRAPH_URL);

const getUserPolicies = (address: string): Promise<{ policies: Policy[] }> => {
  const query = `query {
        policies(
            where: {
                owner: "${address}"
            }
        ) {
            id
            policyTokenIssuerAddress
            policyId
            productId
            marketId
            owner
            issuer
            coverage
            coverageChanged
            underlyingCover
            validFrom
            validUntil
            originalBalance
            balance
            totalCharged
            expired
            waitingPeriod
            updatedAt
            liquidatedAt
            liquidatedBy
            initialMarketPremiumMulAccumulator
            premiumDeposit
            foAddress
            foFeeRate
            foFeeDeposit
            referralAddress
            referralFeeRate
            referralFeeDeposit
            referralBonus
            claims {
              id
              policyId
              votingId
              submittedBy
              submittedAt
              status
              details
            }
        }
    }`;

  const client = initClient();
  return client.request(query);
};

const getPolicyAdjstmentsAndMarket = async (
  policyId: string,
  marketId: string
): Promise<PolicyAdjstmentsAndMarket> => {
  const query = `query {
        adjustmentConfigurations (
            where: {
                policyId: ${policyId}
        } 
        first: 1000
      ) 
      {
        id,
        configId,
        coverAdjuster,
        productId,
        policyId,
        tokenId,
        maxCoverage,
        maxRate,
        lastAdjustmentAt,
        adjustmentFrequency
      }
      markets(where: {marketId: ${marketId}}) {
        premiumToken
      }
    }`;

  const client = initClient();
  return client.request(query);
};

export { getPolicyAdjstmentsAndMarket, getUserPolicies };