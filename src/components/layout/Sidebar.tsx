
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAccountType } from '@/hooks/useAccountType';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  CreditCard,
  Activity,
  Shield,
  FileText,
  Settings,
  User,
  Bot,
  Eye,
  Building,
  Zap,
  Brain,
  Search,
  Scale,
  Atom,
  TrendingUp,
  Users,
  PieChart,
  Briefcase,
  Cpu,
  Fingerprint,
  Building2,
  University,
  BarChart3,
  ShieldCheck,
  Target,
  BookOpen,
  MessageSquare,
  ChevronDown,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { isIndividual, isFinancialInstitution } = useAccountType();
  const { user, signOut, userProfile } = useAuth();

  const overviewItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: TrendingUp, label: 'Executive Dashboard', href: '/dashboard/executive' },
  ];

  const transactionManagementItems = isIndividual ? [
    { icon: Activity, label: 'My Transactions', href: '/dashboard/my-transactions' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Activity, label: 'Activity', href: '/dashboard/activity' },
  ] : [
    { icon: Activity, label: 'Transactions', href: '/dashboard/transactions' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Activity, label: 'Activity', href: '/dashboard/activity' },
  ];

  const enhancedSecurityItems = [
    { icon: ShieldCheck, label: 'Enhanced Security Center', href: '/dashboard/enhanced-security', badge: 'NEW' },
    { icon: Shield, label: 'Security Center', href: '/dashboard/security' },
    { icon: Fingerprint, label: 'Behavioral Biometrics', href: '/dashboard/behavioral-biometrics', badge: 'NEW' },
    { icon: Eye, label: 'Real-time Monitoring', href: '/dashboard/real-time-monitoring' },
  ];

  const bankingIntegrationItems = isFinancialInstitution ? [
    { icon: University, label: 'Bank Integration', href: '/dashboard/bank-integration' },
    { icon: Building2, label: 'Connected Banks', href: '/dashboard/connected-banks' },
    { icon: Cpu, label: 'Device Fingerprinting', href: '/dashboard/device-fingerprinting' },
  ] : [];

  const advancedFeaturesItems = isFinancialInstitution ? [
    { icon: Brain, label: 'Advanced Intelligence', href: '/dashboard/advanced-intelligence' },
    { icon: Search, label: 'Advanced Investigation', href: '/dashboard/advanced-investigation' },
    { icon: BarChart3, label: 'Business Intelligence', href: '/dashboard/business-intelligence' },
    { icon: Briefcase, label: 'Case Management', href: '/dashboard/case-management' },
    { icon: Target, label: 'Predictive Risk Scoring', href: '/dashboard/predictive-risk-scoring' },
    { icon: Scale, label: 'Legal Compliance', href: '/dashboard/legal-compliance' },
    { icon: MessageSquare, label: 'Natural Language Query', href: '/dashboard/natural-language-query' },
    { icon: Atom, label: 'Quantum Ready Tech', href: '/dashboard/quantum-ready-tech' },
    { icon: Building, label: 'Enterprise Features', href: '/dashboard/enterprise-features' },
  ] : [
    { icon: Fingerprint, label: 'Behavioral Analytics', href: '/dashboard/behavioral-analytics' },
    { icon: MessageSquare, label: 'Natural Language Query', href: '/dashboard/natural-language-query' },
  ];

  const systemItems = [
    { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
    { icon: User, label: 'KYC', href: '/dashboard/kyc' },
    { icon: Bot, label: 'AI Assistant', href: '/dashboard/ai-assistant' },
    { icon: Eye, label: 'AI Monitor', href: '/dashboard/ai-monitor' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const renderMenuSection = (title: string, items: any[], showBadges = false) => {
    return (
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
          {title}
        </h3>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors mx-2',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
                {showBadges && item.badge && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">Z</div>
          <h1 className="text-lg font-bold">Zentra</h1>
        </div>
        <p className="text-sm text-gray-400">FraudShield Pro</p>
      </div>
      
      {/* Menu Sections */}
      <div className="flex-1 py-4">
        {renderMenuSection('Overview', overviewItems)}
        {renderMenuSection('Transaction Management', transactionManagementItems)}
        {renderMenuSection('Enhanced Security', enhancedSecurityItems, true)}
        
        {isFinancialInstitution && bankingIntegrationItems.length > 0 && 
          renderMenuSection('Banking Integration', bankingIntegrationItems)
        }
        
        {advancedFeaturesItems.length > 0 && 
          renderMenuSection(isFinancialInstitution ? 'Advanced Features' : 'AI Features', advancedFeaturesItems)
        }
        
        {renderMenuSection('System', systemItems)}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {userProfile?.full_name || user?.user_metadata?.name || 'John Doe'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email || 'john@example.com'}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
        
        <button
          onClick={signOut}
          className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
