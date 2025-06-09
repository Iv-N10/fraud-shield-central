import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Building2,
  CreditCard,
  File,
  FileText,
  Settings,
  User,
  Users,
  Brain,
  Shield,
  Activity,
  LayoutDashboard,
  Zap,
  Crown,
  Search
} from "lucide-react"
import { NavItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const navigationItems = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      ]
    },
    {
      title: "Core Features",
      items: [
        { name: "KYC", href: "/kyc", icon: User },
        { name: "Transactions", href: "/transactions", icon: CreditCard },
        { name: "Reports", href: "/reports", icon: FileText },
      ]
    },
    {
      title: "AI & Analytics",
      items: [
        { name: "AI Monitor", href: "/ai-monitor", icon: Shield },
        { name: "Behavioral Analytics", href: "/behavioral-analytics", icon: Users },
        { name: "Predictive Risk", href: "/predictive-risk", icon: AlertTriangle },
        { name: "Natural Language", href: "/natural-language", icon: File },
        { name: "Device Fingerprinting", href: "/device-fingerprinting", icon: Settings },
      ]
    },
    {
      title: "Advanced Features",
      items: [
        { name: "Executive Dashboard", href: "/executive-dashboard", icon: Crown },
        { name: "Real-time Monitoring", href: "/real-time-monitoring", icon: Activity },
        { name: "Advanced Intelligence", href: "/advanced-intelligence", icon: Brain },
        { name: "Advanced Investigation", href: "/advanced-investigation", icon: Search },
        { name: "Business Intelligence", href: "/business-intelligence", icon: BarChart3 },
        { name: "Enterprise Features", href: "/enterprise-features", icon: Building2 },
        { name: "Quantum-Ready Tech", href: "/quantum-ready-tech", icon: Zap },
      ]
    },
    {
      title: "My Account",
      items: [
        { name: "Payments", href: "/payments", icon: CreditCard },
        { name: "My Transactions", href: "/my-transactions", icon: CreditCard },
        { name: "Bank Integration", href: "/bank-integration", icon: CreditCard },
        { name: "Connected Banks", href: "/connected-banks", icon: CreditCard },
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    },
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4">
        <Link to="/dashboard" className="font-bold text-xl">
          FraudShield
        </Link>
      </div>
      <Separator />
      <div className="flex-1 overflow-y-auto py-4">
        {navigationItems.map((section, index) => (
          <div key={index} className="space-y-1">
            <div className="px-6 text-sm font-medium text-muted-foreground">
              {section.title}
            </div>
            {section.items.map((item: NavItem) => (
              <Link to={item.href} key={item.name} className="flex items-center space-x-2 px-6 py-2 text-sm font-medium hover:underline">
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );

  if (!isMobile) {
    return (
      <div className="hidden md:block w-64 border-r flex-shrink-0">
        {renderSidebarContent()}
      </div>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        {renderSidebarContent()}
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
