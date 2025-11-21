import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Create Market", href: "/dashboard#new" },
  { label: "Live Liquidity", href: "/dashboard#analytics" },
  { label: "Hot Markets", href: "/dashboard#hot" },
  { label: "Docs", href: "/" },
];

function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-white/5 bg-slate-950/40 px-6 py-10 lg:block">
      <div className="sticky top-28 space-y-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/60 to-slate-950/80 p-5 shadow-inner shadow-black/30">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Quick Links</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="flex items-center justify-between rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white" to={link.href}>
                  <span>{link.label}</span>
                  <span className="text-xs text-slate-500">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-600/30 via-indigo-500/20 to-emerald-400/20 p-5 text-xs text-slate-200 shadow-lg shadow-indigo-900/40">
          <p className="font-semibold text-white">Creator Tip</p>
          <p className="mt-3 text-slate-200">
            Schedule markets at least <span className="text-white">24h</span> ahead to build anticipation and allow liquidity to accumulate.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;