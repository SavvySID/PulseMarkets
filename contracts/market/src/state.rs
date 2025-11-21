 use crate::actions::MarketOutcome;
 use serde::{Deserialize, Serialize};

/// Canonical snapshot returned via service queries.
#[derive(Clone, Debug, Serialize, Deserialize, Default)]
pub struct MarketSnapshot {
    pub market_id: Option<String>,
    pub name: Option<String>,
    pub outcomes: Vec<String>,
    pub total_yes: u128,
    pub total_no: u128,
    pub is_resolved: bool,
    pub ends_at: Option<u64>,
    pub yes_odds: f64,
    pub no_odds: f64,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum MarketQuery {
    GetSnapshot,
    GetOdds,
}

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
pub struct MarketState {
    pub market_id: Option<String>,
    pub name: Option<String>,
    pub outcomes: Vec<String>,
    pub total_yes: u128,
    pub total_no: u128,
    pub creator: Option<String>,
    pub is_resolved: bool,
    pub ends_at: Option<u64>,
}

impl MarketState {
    pub fn initialize(
        &mut self,
        market_id: String,
        name: String,
        outcomes: Vec<String>,
        creator: String,
        ends_at: u64,
    ) {
        self.market_id = Some(market_id);
        self.name = Some(name);
        self.outcomes = outcomes;
        self.creator = Some(creator);
        self.ends_at = Some(ends_at);
        self.total_yes = 0;
        self.total_no = 0;
        self.is_resolved = false;
    }

    pub fn record_bet(&mut self, outcome: &MarketOutcome, amount: u128) {
        match outcome {
            MarketOutcome::Yes => self.total_yes += amount,
            MarketOutcome::No => self.total_no += amount,
        }
    }

    pub fn odds(&self) -> (f64, f64) {
        let yes = self.total_yes as f64;
        let no = self.total_no as f64;
        let total = yes + no;
        if total == 0.0 {
            (0.5, 0.5)
        } else {
            (yes / total, no / total)
        }
    }

    pub fn snapshot(&self) -> MarketSnapshot {
        let (yes_odds, no_odds) = self.odds();
        MarketSnapshot {
            market_id: self.market_id.clone(),
            name: self.name.clone(),
            outcomes: self.outcomes.clone(),
            total_yes: self.total_yes,
            total_no: self.total_no,
            is_resolved: self.is_resolved,
            ends_at: self.ends_at,
            yes_odds,
            no_odds,
        }
    }
}



