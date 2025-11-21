 import { Link } from "react-router-dom";
 import Button from "../components/ui/Button";

 function NotFound() {
   return (
     <div className="flex h-full flex-col items-center justify-center gap-4 py-24 text-center">
       <p className="text-sm uppercase tracking-[0.4em] text-slate-500">404</p>
       <h1 className="text-3xl font-semibold">This microchain went idle.</h1>
       <p className="text-slate-400">Try heading back to the dashboard.</p>
       <Link to="/dashboard">
         <Button>Go to dashboard</Button>
       </Link>
     </div>
   );
 }

 export default NotFound;



