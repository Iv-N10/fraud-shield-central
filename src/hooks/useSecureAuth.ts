import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { passwordSchema, emailSchema } from '@/utils/validation';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
  company: string;
}

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false
        }));

        // Log security events
        if (event === 'SIGNED_IN') {
          console.log('Secure sign-in detected');
        } else if (event === 'SIGNED_OUT') {
          console.log('Sign-out detected');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        session,
        user: session?.user ?? null,
        loading: false
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Validate inputs
      emailSchema.parse(email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      // Log successful authentication
      await supabase.from('audit_logs').insert({
        action: 'SIGN_IN',
        table_name: 'auth.users',
        record_id: data.user?.id,
        metadata: {
          email: data.user?.email,
          timestamp: new Date().toISOString()
        }
      });

      return { data, error: null };
    } catch (error: any) {
      console.error('Sign-in error:', error);
      
      // Log failed authentication attempt
      await supabase.from('audit_logs').insert({
        action: 'SIGN_IN_FAILED',
        table_name: 'auth.users',
        metadata: {
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        }
      });
      
      return { data: null, error };
    }
  };

  const signUp = async ({ email, password, name, company }: SignUpData) => {
    try {
      // Validate inputs
      emailSchema.parse(email);
      passwordSchema.parse(password);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            company
          }
        }
      });

      if (error) {
        throw error;
      }

      // Log registration attempt
      await supabase.from('audit_logs').insert({
        action: 'SIGN_UP',
        table_name: 'auth.users',
        record_id: data.user?.id,
        metadata: {
          email: data.user?.email,
          timestamp: new Date().toISOString()
        }
      });

      return { data, error: null };
    } catch (error: any) {
      console.error('Sign-up error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const currentUser = authState.user;
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // Log sign out
      if (currentUser) {
        await supabase.from('audit_logs').insert({
          action: 'SIGN_OUT',
          table_name: 'auth.users',
          record_id: currentUser.id,
          metadata: {
            email: currentUser.email,
            timestamp: new Date().toISOString()
          }
        });
      }

      return { error: null };
    } catch (error: any) {
      console.error('Sign-out error:', error);
      return { error };
    }
  };

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    signIn,
    signUp,
    signOut
  };
};