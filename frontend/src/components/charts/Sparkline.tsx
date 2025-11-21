 type SparklineProps = {
   points: number[];
   width?: number;
   height?: number;
 };

 function normalize(points: number[]) {
   if (!points.length) return points;
   const min = Math.min(...points);
   const max = Math.max(...points);
   if (max === min) {
     return points.map(() => 0.5);
   }
   return points.map((value) => (value - min) / (max - min));
 }

 function Sparkline({ points, width = 120, height = 32 }: SparklineProps) {
   const normalized = normalize(points);
   const step = width / Math.max(points.length - 1, 1);
   const path = normalized
     .map((value, index) => {
       const x = index * step;
       const y = height - value * height;
       return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
     })
     .join(" ");

   return (
     <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="text-brand-500">
       <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
     </svg>
   );
 }

 export default Sparkline;



