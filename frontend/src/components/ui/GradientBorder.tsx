 import { PropsWithChildren } from "react";
 import clsx from "clsx";

 type GradientBorderProps = PropsWithChildren & {
   className?: string;
 };

 function GradientBorder({ children, className }: GradientBorderProps) {
   return (
     <div className={clsx("rounded-2xl bg-gradient-to-br from-brand-600 to-pink-500 p-[1px]", className)}>
       <div className="rounded-2xl bg-slate-950 p-4">{children}</div>
     </div>
   );
 }

 export default GradientBorder;



