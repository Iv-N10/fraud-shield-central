import React from 'react';
import { Settings, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EnhancedNotification } from '@/components/ui/enhanced-notification';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { toggleSidebar } = useSidebar();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Extract initials from user's name or email
  const getUserInitials = () => {
    if (!user) return 'U';
    
    if (user.user_metadata?.name) {
      const nameParts = user.user_metadata.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return nameParts[0][0];
    }
    
    return user.email?.[0].toUpperCase() || 'U';
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked, navigating to /dashboard/settings');
    navigate('/dashboard/settings');
  };

  return (
    <header className="border-b border-border/50 h-16 flex items-center px-4 lg:px-6 bg-gradient-card backdrop-blur-md glass shadow-md-custom">
      <Button
        size="icon"
        variant="ghost"
        className="mr-2 md:hidden hover:bg-primary/10 transition-all duration-300"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="ml-auto flex items-center space-x-4">
        <EnhancedNotification />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-105 transition-all duration-300">
              <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-glow">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt={user?.user_metadata?.name || user?.email || 'User'} 
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 glass border-primary/20 shadow-xl-custom animate-scale-in" align="end" forceMount>
            <DropdownMenuLabel className="pb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium gradient-text">My Account</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem 
              onClick={handleSettingsClick}
              className="hover:bg-primary/10 transition-all duration-200 cursor-pointer"
            >
              <Settings className="mr-3 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="hover:bg-destructive/10 text-destructive transition-all duration-200 cursor-pointer"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
