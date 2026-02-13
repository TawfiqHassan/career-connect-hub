import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JobsPage from "./pages/JobsPage";
import CoursesPage from "./pages/CoursesPage";
import BooksPage from "./pages/BooksPage";
import PricingPage from "./pages/PricingPage";
import CVBuilderPage from "./pages/CVBuilderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cv-builder" element={<CVBuilderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
