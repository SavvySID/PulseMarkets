 import { forwardRef, InputHTMLAttributes } from "react";
 import clsx from "clsx";

 type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref
) {
   return (
     <input
       ref={ref}
       className={clsx(
        "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 shadow-inner shadow-black/20 backdrop-blur transition focus:border-brand-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400/40",
         className
       )}
       {...rest}
     />
   );
 });

 export default Input;
