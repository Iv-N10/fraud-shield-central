
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import AIMonitor from "./pages/Dashboard/AIMonitor";
import KYC from "./pages/Dashboard/KYC";
import Transactions from "./pages/Dashboard/Transactions";
import Reports from "./pages/Dashboard/Reports";
import Settings from "./pages/Dashboard/Settings";
import AIAssistant from "./pages/Dashboard/AIAssistant";
import Payments from "./pages/Dashboard/Payments";
import MyTransactions from "./pages/Dashboard/MyTransactions";
import BankIntegration from "./pages/Dashboard/BankIntegration";
import ConnectedBanks from "./pages/Dashboard/ConnectedBanks";
import NotFound from "./pages/NotFound";
import Security from "./pages/Dashboard/Security";
import Activity from "./pages/Dashboard/Activity";
import BehavioralAnalytics from "./pages/Dashboard/BehavioralAnalytics";
import PredictiveRiskScoring from "./pages/Dashboard/PredictiveRiskScoring";
import NaturalLanguageQuery from "./pages/Dashboard/NaturalLanguageQuery";
import DeviceFingerprinting from "./pages/Dashboard/DeviceFingerprinting";
import ExecutiveDashboard from "./pages/Dashboard/ExecutiveDashboard";
import RealTimeMonitoring from "./pages/Dashboard/RealTimeMonitoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="executive-dashboard" element={<ExecutiveDashboard />} />
              <Route path="real-time-monitoring" element={<RealTimeMonitoring />} />
              <Route path="ai-monitor" element={<AIMonitor />} />
              <Route path="behavioral-analytics" element={<BehavioralAnalytics />} />
              <Route path="predictive-risk" element={<PredictiveRiskScoring />} />
              <Route path="natural-language" element={<NaturalLanguageQuery />} />
              <Route path="device-fingerprinting" element={<DeviceFingerprinting />} />
              <Route path="activity" element={<Activity />} />
              <Route path="security" element={<Security />} />
              <Route path="kyc" element={<KYC />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="reports" element={<Reports />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="payments" element={<Payments />} />
              <Route path="my-transactions" element={<MyTransactions />} />
              <Route path="bank-integration" element={<BankIntegration />} />
              <Route path="connected-banks" element={<ConnectedBanks />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
