 use crate::state::MarketSnapshot;
 use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MarketCreated {
    pub market_id: String,
    pub name: String,
    pub outcomes: Vec<String>,
    pub ends_at: u64,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BetPlaced {
    pub market_id: String,
    pub outcome: String,
    pub amount: u128,
    pub total_volume: u128,
    pub snapshot: MarketSnapshot,
}



