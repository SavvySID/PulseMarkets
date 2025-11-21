 export function formatCurrency(value: number) {
   return Intl.NumberFormat("en-US", {
     style: "currency",
     currency: "USD",
     notation: "compact",
     minimumFractionDigits: 2,
   }).format(value);
 }

 export function formatOdds(value: number) {
   return `${(value * 100).toFixed(1)}%`;
 }

 export function formatTimestamp(timestamp: number) {
   return new Date(timestamp).toLocaleString();
 }



