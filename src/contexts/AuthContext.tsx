
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userProfile: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string, accountType: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Track initialization to avoid duplicate redirects
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  useEffect(() => {
    // Flag to prevent multiple redirects
    let isRedirecting = false;
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        // Update state synchronously
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch profile data when user signs in
        if (currentSession?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
        }
        
        // Only handle navigation on main auth events and if not already redirecting
        if (!isRedirecting) {
          if (event === 'SIGNED_IN') {
            isRedirecting = true;
            const currentPath = window.location.pathname;
            if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/') {
              console.log('Redirecting to dashboard after sign in');
              navigate('/dashboard', { replace: true });
            }
            // Reset flag after redirect
            setTimeout(() => { isRedirecting = false; }, 100);
          } else if (event === 'SIGNED_OUT') {
            isRedirecting = true;
            console.log('Redirecting to login after sign out');
            navigate('/login', { replace: true });
            // Reset flag after redirect
            setTimeout(() => { isRedirecting = false; }, 100);
          }
        }
      }
    );

    // Then check for existing session only once
    const initializeAuth = async () => {
      if (isInitialized) return;
      
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        // Update state
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch profile if user exists
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        }
        
        // Only redirect on initial load if we have a session
        if (currentSession?.user && !isRedirecting) {
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/') {
            isRedirecting = true;
            console.log('Initial redirect to dashboard');
            navigate('/dashboard', { replace: true });
            setTimeout(() => { isRedirecting = false; }, 100);
          }
        }
        
        setIsInitialized(true);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: 'Login successful',
        description: 'Welcome back to FraudShield Central',
      });
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'An error occurred during login',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string, accountType: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
            account_type: accountType,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: 'Account created',
        description: 'Welcome to FraudShield Central',
      });
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error.message || 'An error occurred during signup',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // The onAuthStateChange will handle navigation
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
