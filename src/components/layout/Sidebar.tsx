
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAccountType } from '@/hooks/useAccountType';
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
  MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { isIndividual, isFinancialInstitution } = useAccountType();

  const individualMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Activity, label: 'My Transactions', href: '/dashboard/my-transactions' },
    { icon: Shield, label: 'Security', href: '/dashboard/security' },
    { icon: ShieldCheck, label: 'Enhanced Security', href: '/dashboard/enhanced-security' },
    { icon: Fingerprint, label: 'Behavioral Analytics', href: '/dashboard/behavioral-analytics' },
    { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
    { icon: User, label: 'KYC', href: '/dashboard/kyc' },
    { icon: Bot, label: 'AI Assistant', href: '/dashboard/ai-assistant' },
    { icon: Eye, label: 'AI Monitor', href: '/dashboard/ai-monitor' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const financialInstitutionMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Activity, label: 'Transactions', href: '/dashboard/transactions' },
    { icon: University, label: 'Bank Integration', href: '/dashboard/bank-integration' },
    { icon: Building2, label: 'Connected Banks', href: '/dashboard/connected-banks' },
    { icon: Shield, label: 'Security', href: '/dashboard/security' },
    { icon: ShieldCheck, label: 'Enhanced Security', href: '/dashboard/enhanced-security' },
    { icon: Fingerprint, label: 'Behavioral Biometrics', href: '/dashboard/behavioral-biometrics' },
    { icon: Eye, label: 'Real-Time Monitoring', href: '/dashboard/real-time-monitoring' },
    { icon: Cpu, label: 'Device Fingerprinting', href: '/dashboard/device-fingerprinting' },
    { icon: BarChart3, label: 'Business Intelligence', href: '/dashboard/business-intelligence' },
    { icon: Briefcase, label: 'Case Management', href: '/dashboard/case-management' },
    { icon: TrendingUp, label: 'Executive Dashboard', href: '/dashboard/executive' },
    { icon: Building, label: 'Enterprise Features', href: '/dashboard/enterprise-features' },
    { icon: Brain, label: 'Advanced Intelligence', href: '/dashboard/advanced-intelligence' },
    { icon: Search, label: 'Advanced Investigation', href: '/dashboard/advanced-investigation' },
    { icon: Target, label: 'Predictive Risk Scoring', href: '/dashboard/predictive-risk-scoring' },
    { icon: Scale, label: 'Legal Compliance', href: '/dashboard/legal-compliance' },
    { icon: MessageSquare, label: 'Natural Language Query', href: '/dashboard/natural-language-query' },
    { icon: Atom, label: 'Quantum Ready Tech', href: '/dashboard/quantum-ready-tech' },
    { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
    { icon: User, label: 'KYC', href: '/dashboard/kyc' },
    { icon: Bot, label: 'AI Assistant', href: '/dashboard/ai-assistant' },
    { icon: Eye, label: 'AI Monitor', href: '/dashboard/ai-monitor' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const menuItems = isIndividual ? individualMenuItems : financialInstitutionMenuItems;

  return (
    <div className="w-64 bg-card border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-bold">FS</div>
          <h1 className="text-lg font-bold">FraudShield</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
