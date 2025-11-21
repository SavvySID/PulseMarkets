import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MarketDetail from "./pages/MarketDetail";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010414] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,91,214,0.25),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(69,64,201,0.15),transparent_60%)]" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-10">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/markets/:marketId" element={<MarketDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
