 # PulseMarkets

PulseMarkets is a Linera-powered real-time prediction market. The Wave 1 MVP
ships a minimal smart contract plus a Vite/Tailwind dashboard so users can
create a market, place YES/NO bets, and watch live odds update via Linera’s
GraphQL subscriptions.

## Layout

```
contracts/market   # Linera contract + service
frontend           # Vite + React + Tailwind dashboard
scripts            # Helper scripts for build/test/deploy
```

## Quick start

### Contracts

```bash
cd contracts/market
cargo build --release --target wasm32-unknown-unknown
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

## Wave 1 scope

- Create/Place bet entrypoints
- Odds + volume emitted as events
- GraphQL polling + subscriptions
- Mock wallet connect (RainbowKit inspired UI)



