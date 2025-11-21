import { FormEvent, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import MarketCard from "../components/market/MarketCard";
import Sparkline from "../components/charts/Sparkline";
import { useMarkets } from "../lib/hooks/useMarkets";
import { requestGraphQL } from "../lib/linera/client";
import { CREATE_MARKET, PLACE_BET } from "../lib/linera/queries";
import { toNumber } from "../lib/utils/parse";

 const defaultMarketForm = {
   market_id: "",
   name: "",
   ends_at: "",
 };

 const defaultBetForm = {
   market_id: "",
   outcome: "Yes",
   amount: "",
 };

function Dashboard() {
  const { markets, isLoading } = useMarkets();
  const [marketForm, setMarketForm] = useState(defaultMarketForm);
  const [betForm, setBetForm] = useState(defaultBetForm);
  const [status, setStatus] = useState<string | null>(null);

  const totalVolume = markets.reduce((sum, market) => sum + market.volume, 0);
  const oddsSparkline = useMemo(() => {
    if (!markets.length) return [0.5];
    return markets[0]?.sparkline ?? [0.5];
  }, [markets]);
  const primaryYes = ((markets[0]?.yes_odds ?? 0.5) * 100).toFixed(1);
  const liveMarkets = markets.length;

   const handleCreateMarket = async (event: FormEvent) => {
     event.preventDefault();
     setStatus("Creating market...");
     await requestGraphQL(CREATE_MARKET, {
       input: {
         ...marketForm,
         ends_at: Number(new Date(marketForm.ends_at).getTime()),
       },
     });
     setMarketForm(defaultMarketForm);
     setStatus("Market created");
   };

   const handlePlaceBet = async (event: FormEvent) => {
     event.preventDefault();
     setStatus("Placing bet...");
     await requestGraphQL(PLACE_BET, {
       input: {
         market_id: betForm.market_id,
         outcome: betForm.outcome,
         amount: toNumber(betForm.amount),
       },
     });
     setBetForm(defaultBetForm);
     setStatus("Bet placed");
   };

  return (
    <div className="space-y-9">
      <section
        id="analytics"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        <Card title="Network Volume" subtitle="Rolling 24h flow">
          <div className="space-y-2">
            <p className="text-3xl font-semibold text-white">
              ${totalVolume.toLocaleString()}
            </p>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
              +12% vs last cycle
            </p>
          </div>
        </Card>
        <Card title="Live Odds" subtitle="Primary YES probability">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Sparkline points={oddsSparkline} width={160} height={60} />
            <div>
              <p className="text-3xl font-semibold text-emerald-400">{primaryYes}%</p>
              <p className="text-xs text-slate-400">Latency &lt; 300ms</p>
            </div>
          </div>
        </Card>
        <Card title="Active Markets" subtitle="Live + pending">
          <div className="space-y-2">
            <p className="text-3xl font-semibold text-white">{liveMarkets}</p>
            <p className="text-xs text-slate-400">Auto-refresh every 15s</p>
          </div>
        </Card>
        <Card title="Health" subtitle="Network status">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-semibold text-emerald-400">99.2%</p>
              <p className="text-xs text-slate-400">Uptime past 7d</p>
            </div>
            <span className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">
              Stable
            </span>
          </div>
        </Card>
      </section>

      <section
        id="new"
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <Card title="Create Market" subtitle="Define ID, narrative, and expiry">
          <form className="space-y-4" onSubmit={handleCreateMarket}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Market ID
                <Input
                  className="mt-2"
                  placeholder="e.g. 9061-stream"
                  value={marketForm.market_id}
                  onChange={(event) =>
                    setMarketForm({ ...marketForm, market_id: event.target.value })
                  }
                  required
                />
              </label>
              <label className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Market name
                <Input
                  className="mt-2"
                  placeholder="Headline event"
                  value={marketForm.name}
                  onChange={(event) =>
                    setMarketForm({ ...marketForm, name: event.target.value })
                  }
                  required
                />
              </label>
            </div>
            <label className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Ends at
              <Input
                className="mt-2"
                type="datetime-local"
                value={marketForm.ends_at}
                onChange={(event) =>
                  setMarketForm({ ...marketForm, ends_at: event.target.value })
                }
                required
              />
            </label>
            <Button type="submit" className="w-full sm:w-auto">
              Create Market
            </Button>
          </form>
        </Card>
        <Card title="Place Bet" subtitle="Stream liquidity to any active market">
          <form className="space-y-4" onSubmit={handlePlaceBet}>
            <label className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Market ID
              <Input
                className="mt-2"
                placeholder="Match the target ID"
                value={betForm.market_id}
                onChange={(event) => setBetForm({ ...betForm, market_id: event.target.value })}
                required
              />
            </label>
            <label className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Outcome
              <select
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40"
                value={betForm.outcome}
                onChange={(event) => setBetForm({ ...betForm, outcome: event.target.value })}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Amount
              <Input
                className="mt-2"
                placeholder="5.0"
                value={betForm.amount}
                onChange={(event) => setBetForm({ ...betForm, amount: event.target.value })}
                required
              />
            </label>
            <Button type="submit" className="w-full sm:w-auto">
              Place Bet
            </Button>
          </form>
        </Card>
      </section>

      {status && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {status}
        </div>
      )}

      <section id="hot">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Live Markets</p>
            <h2 className="text-2xl font-semibold text-white">Streaming orderbooks</h2>
          </div>
          {isLoading && (
            <p className="text-xs text-slate-500">Syncing liquidity...</p>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {markets.length ? (
            markets.map((market) => (
              <MarketCard key={market.market_id} market={market} />
            ))
          ) : (
            <Card className="text-sm text-slate-400" subtitle="No markets yet">
              Spin up your first market to see live odds appear here.
            </Card>
          )}
        </div>
      </section>
    </div>
  );
 }

 export default Dashboard;



