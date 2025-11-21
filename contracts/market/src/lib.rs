 mod actions;
 mod error;
 mod events;
 mod settlement;
 mod state;

use actions::{Action, MarketOutcome};
use async_trait::async_trait;
use error::MarketError;
use events::{BetPlaced, MarketCreated};
use linera_sdk::{
    base::{ContractAbi, ServiceAbi, WithContractAbi},
    contract::{self, Contract, ContractRuntime},
    ensure,
    service::{self, Service, ServiceRuntime},
};
use state::{MarketQuery, MarketSnapshot, MarketState};

pub struct MarketContract {
    state: MarketState,
    runtime: ContractRuntime<Self>,
}

pub struct MarketService {
    state: MarketState,
    runtime: ServiceRuntime<Self>,
}

#[derive(Clone, Copy, Debug)]
pub struct MarketAbi;

impl ContractAbi for MarketAbi {
    type Message = Action;
    type Parameters = ();
    type InitializationArgument = ();
    type Response = ();
}

impl ServiceAbi for MarketAbi {
    type Query = MarketQuery;
    type Response = MarketSnapshot;
}

linera_sdk::contract!(MarketContract);
linera_sdk::service!(MarketService);

impl WithContractAbi for MarketContract {
    type Abi = MarketAbi;
}

impl WithContractAbi for MarketService {
    type Abi = MarketAbi;
}

#[async_trait]
impl Contract for MarketContract {
    type Error = MarketError;
    type Message = Action;
    type Parameters = ();
    type InitializationArgument = ();

    async fn new(runtime: ContractRuntime<Self>) -> Result<Self, Self::Error> {
        Ok(Self {
            state: MarketState::default(),
            runtime,
        })
    }

    async fn initialize(
        &mut self,
        _params: Self::Parameters,
        _argument: Self::InitializationArgument,
    ) -> Result<(), Self::Error> {
        Ok(())
    }

    async fn execute_operation(&mut self, action: Action) -> Result<(), Self::Error> {
        self.apply_action(action).await
    }

    async fn execute_message(&mut self, action: Action) -> Result<(), Self::Error> {
        self.apply_action(action).await
    }
}

impl MarketContract {
    async fn apply_action(&mut self, action: Action) -> Result<(), MarketError> {
        match action {
            Action::CreateMarket {
                market_id,
                name,
                outcomes,
                ends_at,
            } => self.create_market(market_id, name, outcomes, ends_at).await,
            Action::PlaceBet {
                market_id,
                outcome,
                amount,
            } => self.place_bet(market_id, outcome, amount).await,
        }
    }

    async fn create_market(
        &mut self,
        market_id: String,
        name: String,
        outcomes: Vec<String>,
        ends_at: u64,
    ) -> Result<(), MarketError> {
        ensure!(!outcomes.is_empty(), MarketError::InvalidOutcomes);
        ensure!(self.state.market_id.is_none(), MarketError::AlreadyInitialized);

        self.state
            .initialize(
                market_id.clone(),
                name.clone(),
                outcomes.clone(),
                "creator".to_string(),
                ends_at,
            );

        self.runtime
            .emit_event(&MarketCreated {
                market_id,
                name,
                outcomes,
                ends_at,
            })
            .await;

        Ok(())
    }

    async fn place_bet(
        &mut self,
        market_id: String,
        outcome: MarketOutcome,
        amount: u128,
    ) -> Result<(), MarketError> {
        ensure!(amount > 0, MarketError::InvalidAmount);
        ensure!(self.state.market_id.is_some(), MarketError::NotInitialized);
        ensure!(
            self.state.market_id.as_ref() == Some(&market_id),
            MarketError::MarketMismatch
        );
        ensure!(!self.state.is_resolved, MarketError::MarketResolved);

        self.state.record_bet(&outcome, amount);
        let snapshot = self.state.snapshot();
        let total_volume = snapshot.total_no + snapshot.total_yes;

        self.runtime
            .emit_event(&BetPlaced {
                market_id,
                outcome: format!("{outcome:?}"),
                amount,
                total_volume,
                snapshot,
            })
            .await;
        Ok(())
    }
}

#[async_trait]
impl Service for MarketService {
    type Query = MarketQuery;
    type Parameters = ();
    type Error = MarketError;

    async fn new(runtime: ServiceRuntime<Self>) -> Result<Self, Self::Error> {
        Ok(Self {
            state: MarketState::default(),
            runtime,
        })
    }

    async fn handle_query(&self, query: MarketQuery) -> Result<MarketSnapshot, Self::Error> {
        match query {
            MarketQuery::GetSnapshot | MarketQuery::GetOdds => Ok(self.state.snapshot()),
        }
    }
}
