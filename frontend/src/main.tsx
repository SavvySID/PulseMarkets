 import { StrictMode } from "react";
 import { createRoot } from "react-dom/client";
 import { BrowserRouter } from "react-router-dom";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import App from "./App";
 import "./styles/globals.css";

 const rootEl = document.getElementById("root");
 const queryClient = new QueryClient();

 if (rootEl) {
   const root = createRoot(rootEl);
   root.render(
     <StrictMode>
       <QueryClientProvider client={queryClient}>
         <BrowserRouter>
           <App />
         </BrowserRouter>
       </QueryClientProvider>
     </StrictMode>
   );
 }



