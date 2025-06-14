
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User2,
  ChevronUp,
  LayoutDashboard,
  CreditCard,
  Activity,
  Shield,
  FileText,
  Settings,
  AlertTriangle,
  TrendingUp,
  Brain,
  Users,
  Database,
  Clock,
  Building,
  Search,
  Atom,
  Fingerprint
} from 'lucide-react';

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Executive Dashboard",
          url: "/dashboard/executive",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "Transaction Management",
      items: [
        {
          title: "My Transactions",
          url: "/dashboard/transactions",
          icon: CreditCard,
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
          icon: CreditCard,
        },
        {
          title: "Activity",
          url: "/dashboard/activity",
          icon: Activity,
        },
      ],
    },
    {
      title: "Enhanced Security",
      items: [
        {
          title: "Enhanced Security Center",
          url: "/dashboard/enhanced-security",
          icon: Shield,
          isNew: true,
        },
        {
          title: "Security Center",
          url: "/dashboard/security",
          icon: Shield,
        },
        {
          title: "Behavioral Biometrics",
          url: "/dashboard/behavioral-biometrics",
          icon: Fingerprint,
          isNew: true,
        },
        {
          title: "Real-time Monitoring",
          url: "/dashboard/real-time-monitoring",
          icon: Activity,
        },
        {
          title: "Device Fingerprinting",
          url: "/dashboard/device-fingerprinting",
          icon: Users,
        },
      ],
    },
    {
      title: "AI & Intelligence",
      items: [
        {
          title: "AI Assistant",
          url: "/dashboard/ai-assistant",
          icon: Brain,
        },
        {
          title: "AI Monitor",
          url: "/dashboard/ai-monitor",
          icon: Brain,
        },
        {
          title: "Advanced Intelligence",
          url: "/dashboard/advanced-intelligence",
          icon: Search,
        },
        {
          title: "Predictive Risk Scoring",
          url: "/dashboard/predictive-risk-scoring",
          icon: TrendingUp,
        },
        {
          title: "Behavioral Analytics",
          url: "/dashboard/behavioral-analytics",
          icon: Activity,
        },
        {
          title: "Natural Language Query",
          url: "/dashboard/natural-language-query",
          icon: Search,
        },
      ],
    },
    {
      title: "Investigation & Compliance",
      items: [
        {
          title: "Advanced Investigation",
          url: "/dashboard/advanced-investigation",
          icon: Search,
        },
        {
          title: "KYC",
          url: "/dashboard/kyc",
          icon: Users,
        },
        {
          title: "Legal Compliance",
          url: "/dashboard/legal-compliance",
          icon: FileText,
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
          icon: FileText,
        },
      ],
    },
    {
      title: "Banking & Integration",
      items: [
        {
          title: "Bank Integration",
          url: "/dashboard/bank-integration",
          icon: Building,
        },
        {
          title: "Connected Banks",
          url: "/dashboard/connected-banks",
          icon: Database,
        },
      ],
    },
    {
      title: "Enterprise & Advanced",
      items: [
        {
          title: "Business Intelligence",
          url: "/dashboard/business-intelligence",
          icon: TrendingUp,
        },
        {
          title: "Enterprise Features",
          url: "/dashboard/enterprise-features",
          icon: Building,
        },
        {
          title: "Quantum-Ready Tech",
          url: "/dashboard/quantum-ready-tech",
          icon: Atom,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <img 
            src="/lovable-uploads/a214adb1-1327-4a83-9cfb-06148d9998f3.png" 
            alt="Zentra" 
            className="h-8 w-8 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold">Zentra</span>
            <span className="text-xs text-muted-foreground">FraudShield Pro</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.isNew && (
                          <span className="ml-auto bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="h-8 w-8 rounded-lg" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
