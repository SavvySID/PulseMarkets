import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

function Button({ className, disabled, variant = "primary", ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        variant === "primary" &&
          "bg-gradient-to-r from-brand-600 via-indigo-500 to-emerald-500 text-white shadow-[0_10px_40px_rgba(76,29,149,0.45)] hover:from-brand-500 hover:via-indigo-400 hover:to-emerald-400",
        variant === "ghost" &&
          "border border-white/10 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      disabled={disabled}
      {...rest}
    />
  );
}

export default Button;
