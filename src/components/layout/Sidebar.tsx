
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown,
  ChevronUp, 
  BarChart2,
  UserCheck,
  Settings,
  FileText,
  Home,
  Activity,
  Brain,
  CreditCard,
  Receipt
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const mainNavigationItems = [
    { 
      title: 'Dashboard', 
      icon: <Home size={20} />, 
      path: '/dashboard' 
    },
    { 
      title: 'Activity', 
      icon: <Activity size={20} />, 
      path: '/activity' 
    },
    { 
      title: 'AI Monitor', 
      icon: <Brain size={20} />, 
      path: '/ai-monitor' 
    },
    { 
      title: 'KYC Verification', 
      icon: <UserCheck size={20} />, 
      path: '/kyc' 
    },
    { 
      title: 'Transaction Monitoring', 
      icon: <BarChart2 size={20} />, 
      path: '/transactions' 
    },
    { 
      title: 'Risk Reports', 
      icon: <FileText size={20} />, 
      path: '/reports' 
    },
    { 
      title: 'AI Assistant', 
      icon: <Brain size={20} />, 
      path: '/ai-assistant' 
    }
  ];

  const userSectionItems = [
    {
      title: 'Payments',
      icon: <CreditCard size={20} />,
      path: '/payments'
    },
    {
      title: 'My Transactions',
      icon: <Receipt size={20} />,
      path: '/my-transactions'
    }
  ];

  const settingsItems = [
    { 
      title: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/settings' 
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar className={cn("border-r border-border h-screen", 
      collapsed ? "w-[70px]" : "w-[240px]",
      "transition-all duration-300 ease-in-out"
    )}>
      <SidebarHeader className="p-4 flex justify-between items-center">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-lg">FS</div>
              <span className="font-bold text-lg">FraudShield</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/dashboard" className="flex items-center justify-center">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-lg">FS</div>
            </Link>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className={collapsed ? "hidden" : ""}
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          <ChevronDown size={18} />
        </Button>
        {collapsed && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-2 top-4"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <ChevronUp size={18} />
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Main</SidebarGroupLabel>}
          <SidebarMenu>
            {mainNavigationItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "nav-link", 
                      isActive(item.path) ? "nav-link-active" : "hover:bg-muted/30"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* User Section */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>User</SidebarGroupLabel>}
          <SidebarMenu>
            {userSectionItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "nav-link", 
                      isActive(item.path) ? "nav-link-active" : "hover:bg-muted/30"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>System</SidebarGroupLabel>}
          <SidebarMenu>
            {settingsItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "nav-link", 
                      isActive(item.path) ? "nav-link-active" : "hover:bg-muted/30"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            FraudShield Central v1.0
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
