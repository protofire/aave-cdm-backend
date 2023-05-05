import { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

import {
  Market,
  Policy,
  PolicyAdjstmentsAndMarket,
  Product,
  UserPayouts,
} from "../helpers/types";

dotenv.config();

const SUBGRAPH_URL = process.env.SUBGRAPH_URL || "";
const ATOMICA_PRODUCT_ID = process.env.ATOMICA_PRODUCT_ID || "";

const initClient = () => new GraphQLClient(SUBGRAPH_URL);

const client = initClient();

const getUserPolicies = (address: string): Promise<{ policies: Policy[] }> => {
  const query = `query {
        policies(
            where: {
                owner: "${address.toLowerCase()}"
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

  return client.request(query);
};

const getPolicyAdjstmentsAndMarket = (
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

  return client.request(query);
};

const getUserPayouts = (address: string): Promise<UserPayouts> => {
  const query = `query {
    payouts(where: {
      recipient: "${address.toLowerCase()}"
    })
    {
      id,
      marketId,
      recipient,
      amount,
      capitalToken,
    }
    payoutRequests(where: {
      recipient: "${address.toLowerCase()}"
    })
    {
      id,
      marketId,
      recipient,
      distributor,
      requestedAmount,
      status,
      data,
    }
  }`;

  return client.request(query);
};

const getMarketById = (marketId: string): Promise<{ markets: Market[] }> => {
  const query = `query {
    markets(where: {
      marketId: ${marketId}
    })
    {
      id
      marketId
      productId
      riskPoolsControllerAddress
      entityList
      isEnabled
      createdAt
      title
      marketFeeRecipient
      details
      wording
      author
      premiumToken
      capitalToken
      insuredToken
      latestAccruedTimestamp
      coverAdjusterOracle
      rateOracle
      waitingPeriod
      marketOperatorIncentiveFee
      policyBuyerAllowListId
      policyBuyerAllowanceListId
      status
      premiumMulAccumulator
      settlementDiscount
      desiredCover
      withdrawDelay
      headAggregatedPoolId
      tailCover
      maxPremiumRatePerSec
      bidStepPremiumRatePerSec
      maxAggregatedPoolSlots
      tailKink
      tailJumpPremiumRatePerSec
    }
  }`;

  return client.request(query);
};

const getMarketsByProduct = (): Promise<{ markets: Market[] }> => {
  const query = `query {
    markets(where: {
      productId: ${ATOMICA_PRODUCT_ID}
    })
    {
      id
      marketId
      productId
      riskPoolsControllerAddress
      entityList
      isEnabled
      createdAt
      title
      marketFeeRecipient
      details
      wording
      author
      premiumToken
      capitalToken
      insuredToken
      latestAccruedTimestamp
      coverAdjusterOracle
      rateOracle
      waitingPeriod
      marketOperatorIncentiveFee
      policyBuyerAllowListId
      policyBuyerAllowanceListId
      status
      premiumMulAccumulator
      settlementDiscount
      desiredCover
      withdrawDelay
      headAggregatedPoolId
      tailCover
      maxPremiumRatePerSec
      bidStepPremiumRatePerSec
      maxAggregatedPoolSlots
      tailKink
      tailJumpPremiumRatePerSec
    }
  }`;

  return client.request(query);
};

const getProduct = (): Promise<{ products: Product[] }> => {
  const query = `query {
    products(where: {productId: ${ATOMICA_PRODUCT_ID}}) {
      id
      productId
      riskPoolsControllerAddress
      policyTokenIssuerAddress
      treasuryAddress
      payoutRequester
      payoutApprover
      productIncentiveFee
      maxMarketIncentiveFee
      title
      wording
      cashSettlementIsEnabled
      physicalSettlementIsEnabled
      feeToken
      marketCreationFeeAmount
      defaultPremiumToken
      defaultCapitalToken
      defaultCoverAdjusterOracle
      claimProcessor
      defaultRatesOracle
      withdrawalDelay
      withdrawRequestExpiration
      marketCreatorsAllowlistId
      waitingPeriod
      operator
      createdAt
      createdBy
      updatedAt
      status
    }
  }`;

  return client.request(query);
};

export {
  getPolicyAdjstmentsAndMarket,
  getUserPolicies,
  getUserPayouts,
  getMarketById,
  getMarketsByProduct,
  getProduct,
};
