import { PropsWithChildren } from "react";
import clsx from "clsx";

type CardProps = PropsWithChildren & {
  className?: string;
  title?: string;
  subtitle?: string;
};

function Card({ children, className, subtitle, title }: CardProps) {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-slate-950/70 p-6 shadow-[0_25px_60px_rgba(2,6,23,0.65)] backdrop-blur",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(91,91,214,0.25),_transparent_55%)]" />
      </div>
      {(title || subtitle) && (
        <div className="relative z-10 mb-4 space-y-1">
          {title && <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-300">{title}</p>}
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Card;
