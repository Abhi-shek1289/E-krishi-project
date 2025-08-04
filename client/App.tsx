import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Weather from "./pages/Weather";
import CropRecommendation from "./pages/CropRecommendation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

// Prevent multiple createRoot calls by storing root globally
const container = document.getElementById("root")!;

// Use a global property to persist the root across hot reloads
declare global {
  interface Window {
    __react_root__?: ReturnType<typeof createRoot>;
  }
}

if (!window.__react_root__) {
  window.__react_root__ = createRoot(container);
}

window.__react_root__.render(<App />);
