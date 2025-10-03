import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { passwordSchema, emailSchema } from '@/utils/validation';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Track initialization to avoid duplicate redirects
  const [isInitialized, setIsInitialized] = useState(false);
  
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
      
      // Validate inputs
      emailSchema.parse(email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      // Log successful authentication
      setTimeout(() => {
        if (data.user) {
          supabase.from('audit_logs').insert({
            action: 'SIGN_IN',
            table_name: 'auth.users',
            record_id: data.user.id,
            metadata: {
              email: data.user.email,
              timestamp: new Date().toISOString()
            }
          });
        }
      }, 0);
      
      toast({
        title: 'Login successful',
        description: 'Welcome back to FraudShield Central',
      });
    } catch (error: any) {
      // Log failed authentication attempt
      setTimeout(() => {
        supabase.from('audit_logs').insert({
          action: 'SIGN_IN_FAILED',
          table_name: 'auth.users',
          metadata: {
            email,
            error: error.message,
            timestamp: new Date().toISOString()
          }
        });
      }, 0);
      
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

  const signUp = async (email: string, password: string, name: string, company: string) => {
    try {
      setLoading(true);
      
      // Validate inputs
      emailSchema.parse(email);
      passwordSchema.parse(password);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            name,
            company,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      // Log registration attempt
      setTimeout(() => {
        if (data.user) {
          supabase.from('audit_logs').insert({
            action: 'SIGN_UP',
            table_name: 'auth.users',
            record_id: data.user.id,
            metadata: {
              email: data.user.email,
              timestamp: new Date().toISOString()
            }
          });
        }
      }, 0);
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        toast({
          title: 'Check your email',
          description: 'Please verify your email address to complete signup. Then return to login.',
        });
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast({
          title: 'Account created',
          description: 'Welcome to FraudShield Central',
        });
        // If session exists, redirect to dashboard
        if (data.session) {
          navigate('/dashboard');
        }
      }
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
      const currentUser = user;
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // Log sign out
      if (currentUser) {
        setTimeout(() => {
          supabase.from('audit_logs').insert({
            action: 'SIGN_OUT',
            table_name: 'auth.users',
            record_id: currentUser.id,
            metadata: {
              email: currentUser.email,
              timestamp: new Date().toISOString()
            }
          });
        }, 0);
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
