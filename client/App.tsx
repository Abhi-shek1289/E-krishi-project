import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Weather from "./pages/Weather";
import CropRecommendation from "./pages/CropRecommendation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Reset page on app initialization to always start from home
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.history.replaceState(null, "", "/");
  }

  return (
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
};

// Prevent multiple createRoot calls on the same container
const container = document.getElementById("root")!;

// Check if the container already has a React root
if (!container._reactRootContainer) {
  const root = createRoot(container);
  // Store reference to prevent multiple roots
  (container as any)._reactRootContainer = root;
  root.render(<App />);
} else {
  // If root already exists, just re-render
  (container as any)._reactRootContainer.render(<App />);
}
