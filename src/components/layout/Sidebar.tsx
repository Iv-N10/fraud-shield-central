
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
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
  Search,
  AlertCircle
} from "lucide-react"
import { NavItem } from "@/types"
import { Link } from "react-router-dom";

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
      { name: "Predictive Risk", href: "/predictive-risk", icon: AlertCircle },
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-6 py-4">
          <Link to="/dashboard" className="font-bold text-xl">
            FraudShield
          </Link>
        </div>
        {navigationItems.map((section, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item: NavItem) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link to={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
