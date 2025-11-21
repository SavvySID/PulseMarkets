 use market::actions::MarketOutcome;
 use market::state::MarketState;

#[test]
fn odds_are_even_without_volume() {
    let state = MarketState::default();
    let (yes, no) = state.odds();
    assert_eq!(yes, 0.5);
    assert_eq!(no, 0.5);
}

#[test]
fn odds_shift_with_volume() {
    let mut state = MarketState::default();
    state.record_bet(&MarketOutcome::Yes, 100);
    state.record_bet(&MarketOutcome::No, 300);
    let (yes, no) = state.odds();
    assert!((yes - 0.25).abs() < f64::EPSILON);
    assert!((no - 0.75).abs() < f64::EPSILON);
}



