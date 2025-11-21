 export function toNumber(input: string) {
   const parsed = Number(input);
   if (Number.isNaN(parsed) || parsed < 0) {
     return 0;
   }
   return parsed;
 }



