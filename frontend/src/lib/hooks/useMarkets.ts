 import { useEffect } from "react";
 import { useQuery, useQueryClient } from "@tanstack/react-query";
 import { requestGraphQL } from "../linera/client";
 import { LIST_MARKETS } from "../linera/queries";
 import { subscribeToMarketEvents } from "../linera/subscriptions";

 export type Market = {
   market_id: string;
   name: string;
   yes_odds: number;
   no_odds: number;
   total_yes: number;
   total_no: number;
   ends_at: number;
   sparkline: number[];
   volume: number;
 };

 type ListMarketsResponse = {
   markets: Array<Omit<Market, "sparkline" | "volume">>;
 };

 async function fetchMarkets(): Promise<Market[]> {
   const data = await requestGraphQL<ListMarketsResponse>(LIST_MARKETS);
   return data.markets.map((market) => ({
     ...market,
     sparkline: [market.yes_odds],
     volume: market.total_yes + market.total_no,
   }));
 }

 export function useMarkets() {
   const queryClient = useQueryClient();
   const query = useQuery({
     queryKey: ["markets"],
     queryFn: fetchMarkets,
   });

   useEffect(() => {
     const unsubscribe = subscribeToMarketEvents((event) => {
       queryClient.setQueryData<Market[]>(["markets"], (prev) => {
         if (!prev) return prev;
         return prev.map((market) => {
           if (market.market_id !== event.market_id) return market;
           const nextSparkline = [...market.sparkline, event.snapshot.yes_odds].slice(-20);
           return {
             ...market,
             yes_odds: event.snapshot.yes_odds,
             no_odds: event.snapshot.no_odds,
             volume: event.total_volume,
             sparkline: nextSparkline,
           };
         });
       });
     });
     return () => {
       unsubscribe();
     };
   }, [queryClient]);

   return {
     markets: query.data ?? [],
     isLoading: query.isLoading,
     error: query.error,
   };
 }



