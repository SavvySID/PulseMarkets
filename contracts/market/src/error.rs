 use thiserror::Error;

#[derive(Debug, Error)]
pub enum MarketError {
    #[error("market already initialized")]
    AlreadyInitialized,
    #[error("market not yet created")]
    NotInitialized,
    #[error("market id mismatch")]
    MarketMismatch,
    #[error("market is resolved")]
    MarketResolved,
    #[error("invalid outcomes provided")]
    InvalidOutcomes,
    #[error("amount must be greater than zero")]
    InvalidAmount,
}



