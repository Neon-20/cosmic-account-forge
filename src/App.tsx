
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OnboardingPersonalInfo from "./pages/OnboardingPersonalInfo";
import OnboardingBusinessInfo from "./pages/OnboardingBusinessInfo";
import OnboardingBusinessType from "./pages/OnboardingBusinessType";
import OnboardingAddress from "./pages/OnboardingAddress";
import OnboardingBusinessSize from "./pages/OnboardingBusinessSize";
import OnboardingAccountSetup from "./pages/OnboardingAccountSetup";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding/personal-info" element={<OnboardingPersonalInfo />} />
          <Route path="/onboarding/business-info" element={<OnboardingBusinessInfo />} />
          <Route path="/onboarding/business-type" element={<OnboardingBusinessType />} />
          <Route path="/onboarding/address" element={<OnboardingAddress />} />
          <Route path="/onboarding/business-size" element={<OnboardingBusinessSize />} />
          <Route path="/onboarding/account-setup" element={<OnboardingAccountSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
