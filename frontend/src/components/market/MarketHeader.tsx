 import GradientBorder from "../ui/GradientBorder";
 import { Market } from "../../lib/hooks/useMarket";

 type MarketHeaderProps = {
   market: Market;
 };

 function MarketHeader({ market }: MarketHeaderProps) {
   return (
     <GradientBorder>
       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
         <div>
           <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Market</p>
           <p className="text-2xl font-semibold text-white">{market.name}</p>
           <p className="text-sm text-slate-400">Closes {market.ends_at.toLocaleString()}</p>
         </div>
         <div className="grid grid-cols-2 gap-4 text-center">
           <div>
             <p className="text-sm text-slate-500">Yes Odds</p>
             <p className="text-2xl font-bold text-emerald-400">
               {(market.yes_odds * 100).toFixed(1)}%
             </p>
           </div>
           <div>
             <p className="text-sm text-slate-500">No Odds</p>
             <p className="text-2xl font-bold text-rose-400">
               {(market.no_odds * 100).toFixed(1)}%
             </p>
           </div>
         </div>
       </div>
     </GradientBorder>
   );
 }

 export default MarketHeader;



