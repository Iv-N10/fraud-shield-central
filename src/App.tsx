
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Transactions from '@/pages/Dashboard/Transactions';
import MyTransactions from '@/pages/Dashboard/MyTransactions';
import Payments from '@/pages/Dashboard/Payments';
import Activity from '@/pages/Dashboard/Activity';
import Security from '@/pages/Dashboard/Security';
import EnhancedSecurity from '@/pages/Dashboard/EnhancedSecurity';
import BehavioralAnalytics from '@/pages/Dashboard/BehavioralAnalytics';
import Reports from '@/pages/Dashboard/Reports';
import Settings from '@/pages/Dashboard/Settings';
import KYC from '@/pages/Dashboard/KYC';
import AIAssistant from '@/pages/Dashboard/AIAssistant';
import AIMonitor from '@/pages/Dashboard/AIMonitor';
import ExecutiveDashboard from '@/pages/Dashboard/ExecutiveDashboard';
import RealTimeMonitoring from '@/pages/Dashboard/RealTimeMonitoring';
import DeviceFingerprinting from '@/pages/Dashboard/DeviceFingerprinting';
import BankIntegration from '@/pages/Dashboard/BankIntegration';
import ConnectedBanks from '@/pages/Dashboard/ConnectedBanks';
import BusinessIntelligence from '@/pages/Dashboard/BusinessIntelligence';
import EnterpriseFeatures from '@/pages/Dashboard/EnterpriseFeatures';
import AdvancedIntelligence from '@/pages/Dashboard/AdvancedIntelligence';
import AdvancedInvestigation from '@/pages/Dashboard/AdvancedInvestigation';
import PredictiveRiskScoring from '@/pages/Dashboard/PredictiveRiskScoring';
import LegalCompliance from '@/pages/Dashboard/LegalCompliance';
import NaturalLanguageQuery from '@/pages/Dashboard/NaturalLanguageQuery';
import QuantumReadyTech from '@/pages/Dashboard/QuantumReadyTech';
import NotFound from '@/pages/NotFound';
import CaseManagement from '@/pages/Dashboard/CaseManagement';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="my-transactions" element={<MyTransactions />} />
              <Route path="payments" element={<Payments />} />
              <Route path="activity" element={<Activity />} />
              <Route path="security" element={<Security />} />
              <Route path="enhanced-security" element={<EnhancedSecurity />} />
              <Route path="behavioral-analytics" element={<BehavioralAnalytics />} />
              <Route path="behavioral-biometrics" element={<BehavioralAnalytics />} />
              <Route path="case-management" element={<CaseManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="kyc" element={<KYC />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="ai-monitor" element={<AIMonitor />} />
              <Route path="executive" element={<ExecutiveDashboard />} />
              <Route path="real-time-monitoring" element={<RealTimeMonitoring />} />
              <Route path="device-fingerprinting" element={<DeviceFingerprinting />} />
              <Route path="bank-integration" element={<BankIntegration />} />
              <Route path="connected-banks" element={<ConnectedBanks />} />
              <Route path="business-intelligence" element={<BusinessIntelligence />} />
              <Route path="enterprise-features" element={<EnterpriseFeatures />} />
              <Route path="advanced-intelligence" element={<AdvancedIntelligence />} />
              <Route path="advanced-investigation" element={<AdvancedInvestigation />} />
              <Route path="predictive-risk-scoring" element={<PredictiveRiskScoring />} />
              <Route path="legal-compliance" element={<LegalCompliance />} />
              <Route path="natural-language-query" element={<NaturalLanguageQuery />} />
              <Route path="quantum-ready-tech" element={<QuantumReadyTech />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
