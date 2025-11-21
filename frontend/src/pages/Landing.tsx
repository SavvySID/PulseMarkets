import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const stats = [
  { label: "Microchains live", value: "128+" },
  { label: "Avg. resolution", value: "12m" },
  { label: "Liquidity locked", value: "$4.2M" },
];

const featureCards = [
  {
    title: "Programmable odds",
    copy: "Blend live signals, human sentiment, and automated hedging into every market.",
  },
  {
    title: "Creator autopilot",
    copy: "Templates ship with guardrails for treasury, fees, and streaming payouts.",
  },
  {
    title: "Signal overlays",
    copy: "Drops, streams, and social chatter become overlays inside each contract.",
  },
];

function Landing() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute -right-32 top-28 h-72 w-72 rounded-full bg-emerald-400/20 blur-[160px]" />
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8 text-center lg:text-left">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.6em] text-slate-300 shadow-inner shadow-black/30">
            Linera Native
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Real-time prediction markets engineered for the streaming economy.
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Spin up a Pulse microchain, stream liquidity, and monitor sentiment-rich odds in a single glass dashboard. The infrastructure is automated; the experience feels handcrafted.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto">Launch App</Button>
            </Link>
            <Button className="w-full sm:w-auto" variant="ghost">
              View Docs
            </Button>
          </div>
        </div>
        <div className="grid gap-5 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/80 to-slate-950/80 p-8 shadow-[0_20px_50px_rgba(2,6,23,0.8)]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Telemetry</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center shadow-inner shadow-black/20">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {featureCards.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-left shadow-inner shadow-black/30">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white">{feature.title}</p>
                <p className="mt-2 text-sm text-slate-300">{feature.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;