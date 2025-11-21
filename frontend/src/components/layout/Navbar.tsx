import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import ConnectWallet from "../wallet/ConnectWallet";

const navLinks = [
  { label: "Landing", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2 text-base font-semibold tracking-wide">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-indigo-500 to-emerald-400 text-sm text-white shadow-lg shadow-brand-500/30">
            PM
          </span>
          <span className="bg-gradient-to-r from-white via-slate-200 to-emerald-200 bg-clip-text text-transparent">
            PulseMarkets
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium uppercase tracking-[0.4em] text-slate-400 shadow-inner shadow-black/20 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(
                "rounded-full px-4 py-1 tracking-[0.25em] transition hover:text-white",
                location.pathname === link.href && "bg-white/10 text-white shadow-md shadow-brand-500/30"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:border-brand-500/50 hover:text-white"
          >
            Launch App
          </Link>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

