 import { useParams } from "react-router-dom";
 import { FormEvent, useState } from "react";
 import MarketHeader from "../components/market/MarketHeader";
 import Card from "../components/ui/Card";
 import Input from "../components/ui/Input";
 import Button from "../components/ui/Button";
 import Sparkline from "../components/charts/Sparkline";
 import { useMarket } from "../lib/hooks/useMarket";
 import { requestGraphQL } from "../lib/linera/client";
 import { PLACE_BET } from "../lib/linera/queries";
 import { toNumber } from "../lib/utils/parse";

 function MarketDetail() {
   const { marketId = "" } = useParams();
   const { market, isLoading } = useMarket(marketId);
   const [amount, setAmount] = useState("");
   const [outcome, setOutcome] = useState("Yes");

   if (isLoading || !market) {
     return <p className="text-slate-400">Loading market...</p>;
   }

   const handleSubmit = async (event: FormEvent) => {
     event.preventDefault();
     await requestGraphQL(PLACE_BET, {
       input: {
         market_id: market.market_id,
         outcome,
         amount: toNumber(amount),
       },
     });
     setAmount("");
   };

   return (
     <div className="space-y-6">
       <MarketHeader market={market} />
       <section className="grid gap-6 md:grid-cols-3">
         <Card className="md:col-span-2" title="Live odds">
           <Sparkline points={market.sparkline} width={600} height={120} />
         </Card>
         <Card title="Place bet">
           <form className="space-y-3" onSubmit={handleSubmit}>
             <select
               className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-white"
               value={outcome}
               onChange={(event) => setOutcome(event.target.value)}
             >
               <option>Yes</option>
               <option>No</option>
             </select>
             <Input
               placeholder="Amount"
               value={amount}
               onChange={(event) => setAmount(event.target.value)}
               required
             />
             <Button type="submit">Place bet</Button>
           </form>
         </Card>
       </section>
     </div>
   );
 }

 export default MarketDetail;



