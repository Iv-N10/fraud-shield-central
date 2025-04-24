
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className={cn(
            "flex-1 p-6 overflow-auto",
          )}>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
