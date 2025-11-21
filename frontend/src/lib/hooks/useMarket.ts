 import { useEffect } from "react";
 import { useQuery, useQueryClient } from "@tanstack/react-query";
 import { requestGraphQL } from "../linera/client";
 import { GET_MARKET } from "../linera/queries";
 import { subscribeToMarketEvents } from "../linera/subscriptions";

 export type Market = {
   market_id: string;
   name: string;
   yes_odds: number;
   no_odds: number;
   total_yes: number;
   total_no: number;
   ends_at: Date;
   volume: number;
   sparkline: number[];
 };

 type Response = {
   market: Omit<Market, "ends_at" | "volume" | "sparkline"> & { ends_at: number };
 };

 async function fetchMarket(marketId: string): Promise<Market> {
   const { market } = await requestGraphQL<Response>(GET_MARKET, { marketId });
   return {
     ...market,
     ends_at: new Date(market.ends_at),
     volume: market.total_yes + market.total_no,
     sparkline: [market.yes_odds],
   };
 }

 export function useMarket(marketId: string) {
   const queryClient = useQueryClient();
   const query = useQuery({
     queryKey: ["market", marketId],
     queryFn: () => fetchMarket(marketId),
     enabled: Boolean(marketId),
   });

   useEffect(() => {
     if (!marketId) return;
     const unsubscribe = subscribeToMarketEvents((event) => {
       if (event.market_id !== marketId) return;
       queryClient.setQueryData<Market>(["market", marketId], (prev) => {
         if (!prev) return prev;
         const sparkline = [...prev.sparkline, event.snapshot.yes_odds].slice(-40);
         return {
           ...prev,
           yes_odds: event.snapshot.yes_odds,
           no_odds: event.snapshot.no_odds,
           volume: event.total_volume,
           sparkline,
         };
       });
     });
     return () => unsubscribe();
   }, [marketId, queryClient]);

   return {
     market: query.data ?? null,
     isLoading: query.isLoading,
     error: query.error,
   };
 }



