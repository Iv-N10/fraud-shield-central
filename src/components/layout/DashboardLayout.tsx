
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-bg">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 animate-fade-in">
          <Header />
          <main className="flex-1 p-6 overflow-auto bg-gradient-bg">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
