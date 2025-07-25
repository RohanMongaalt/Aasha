import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import PatientLoginPage from "./pages/PatientLoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import NotFound from "./pages/NotFound";
import { PsychologistDashboard } from "./pages/PsychologistDashboard";
import { GoalsTasksPage } from "./pages/GoalsTasksPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/patient-login" element={<PatientLoginPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/psychologist" element={<PsychologistDashboard />} />
          <Route path="/goals/:patientId" element={<GoalsTasksPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
