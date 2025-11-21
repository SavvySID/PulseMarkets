 import { createClient } from "graphql-ws";

 export type BetEvent = {
   market_id: string;
   outcome: string;
   amount: number;
   total_volume: number;
   snapshot: {
     yes_odds: number;
     no_odds: number;
   };
 };

 type Callback = (event: BetEvent) => void;

 const WS_ENDPOINT =
   import.meta.env.VITE_LINERA_GRAPHQL_WS ?? "ws://localhost:8080/graphql";

 export function subscribeToMarketEvents(cb: Callback) {
   const client = createClient({
     url: WS_ENDPOINT,
   });

   const dispose = client.subscribe<{ betPlaced: BetEvent }>(
     {
       query: /* GraphQL */ `
         subscription MarketEvents {
           betPlaced {
             market_id
             outcome
             amount
             total_volume
             snapshot {
               yes_odds
               no_odds
             }
           }
         }
       `,
     },
     {
       next: (data) => {
         if (data.data?.betPlaced) {
           cb(data.data.betPlaced);
         }
       },
       error: (err) => {
         console.error("subscription error", err);
       },
       complete: () => undefined,
     }
   );

   return () => dispose();
 }



