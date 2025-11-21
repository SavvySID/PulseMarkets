import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Sparkline from "../charts/Sparkline";
import { Market } from "../../lib/hooks/useMarkets";

type MarketCardProps = {
  market: Market;
};

function MarketCard({ market }: MarketCardProps) {
  const yesOdds = (market.yes_odds * 100).toFixed(1);
  const noOdds = (market.no_odds * 100).toFixed(1);
  const formattedVolume = Intl.NumberFormat("en-US", { notation: "compact" }).format(market.volume);

  return (
    <Card className="flex flex-col gap-5 border-white/5 bg-gradient-to-br from-white/5 via-slate-950/70 to-slate-950/90 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.6em] text-slate-400">Pulse Market</p>
          <p className="mt-2 text-lg font-semibold text-white">{market.name}</p>
        </div>
        <Sparkline points={market.sparkline} width={120} height={40} />
      </div>
      <div className="grid gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 text-sm text-white sm:grid-cols-2">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-400">Yes</p>
          <p className="text-2xl font-semibold text-emerald-300">{yesOdds}%</p>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-400">No</p>
          <p className="text-2xl font-semibold text-rose-300">{noOdds}%</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <p>Volume {formattedVolume}</p>
        <Link
          to={`/markets/${market.market_id}`}
          className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white transition hover:border-brand-400 hover:text-brand-500"
        >
          Open ↗
        </Link>
      </div>
    </Card>
  );
}

export default MarketCard;
