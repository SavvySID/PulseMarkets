 export const LIST_MARKETS = /* GraphQL */ `
   query ListMarkets {
     markets {
       market_id
       name
       yes_odds
       no_odds
       total_yes
       total_no
       ends_at
     }
   }
 `;

 export const GET_MARKET = /* GraphQL */ `
   query GetMarket($marketId: ID!) {
     market(market_id: $marketId) {
       market_id
       name
       yes_odds
       no_odds
       total_yes
       total_no
       ends_at
     }
   }
 `;

export const CREATE_MARKET = /* GraphQL */ `
  mutation CreateMarket($input: CreateMarketInput!) {
    createMarket(input: $input) {
      success
    }
  }
`;

export const PLACE_BET = /* GraphQL */ `
  mutation PlaceBet($input: PlaceBetInput!) {
    placeBet(input: $input) {
      success
    }
  }
`;
