 use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub enum MarketOutcome {
    Yes,
    No,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum Action {
    CreateMarket {
        market_id: String,
        name: String,
        outcomes: Vec<String>,
        ends_at: u64,
    },
    PlaceBet {
        market_id: String,
        outcome: MarketOutcome,
        amount: u128,
    },
}



