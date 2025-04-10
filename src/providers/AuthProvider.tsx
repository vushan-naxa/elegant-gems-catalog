
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useGuestSession } from '@/hooks/use-guest-session';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: 'customer' | 'store_owner' | 'admin' | null;
  isLoading: boolean;
  isGuest: boolean;
  guestId: string | null;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signUp: (email: string, password: string, role: 'customer' | 'store_owner' | 'admin', metadata?: any) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'store_owner' | 'admin' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { guestId, clearGuestSession } = useGuestSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Reset guest status when authenticated
        if (session?.user) {
          setIsGuest(false);
          
          // Fetch user role if authenticated (in a setTimeout to avoid deadlock)
          setTimeout(() => {
            fetchUserRole(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      // Check if we have profile data cached in localStorage for quick access
      const cachedProfile = localStorage.getItem('user_profile');
      if (cachedProfile) {
        const parsedProfile = JSON.parse(cachedProfile);
        if (parsedProfile.role) {
          console.log('Using cached role:', parsedProfile.role);
          setUserRole(parsedProfile.role as 'customer' | 'store_owner' | 'admin');
        }
      }

      console.log('Fetching user role from database for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('role, first_name, last_name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      if (data) {
        console.log('Fetched user role from database:', data.role);
        setUserRole(data.role as 'customer' | 'store_owner' | 'admin');
        
        // Store user profile data in localStorage for quick access
        localStorage.setItem('user_profile', JSON.stringify({
          role: data.role,
          firstName: data.first_name,
          lastName: data.last_name
        }));
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Clear any guest session when signing in
      if (isGuest) {
        setIsGuest(false);
        clearGuestSession();
      }
      
      console.log('Signing in user:', email);
      return await supabase.auth.signInWithPassword({ email, password });
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error, data: null };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    role: 'customer' | 'store_owner' | 'admin',
    metadata?: any
  ) => {
    try {
      // Clear any guest session when signing up
      if (isGuest) {
        setIsGuest(false);
        clearGuestSession();
      }
      
      console.log('Signing up user:', email, 'with role:', role);
      
      // Include role in user metadata
      const metadataWithRole = {
        ...metadata,
        role
      };
      
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadataWithRole
        }
      });
      
      console.log('Signup result:', result);
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error, data: null };
    }
  };

  const signOut = async () => {
    try {
      // Clear localStorage cached profile
      localStorage.removeItem('user_profile');
      
      // Clear any guest session
      if (isGuest) {
        setIsGuest(false);
        clearGuestSession();
      }
      
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const continueAsGuest = () => {
    // Set as guest and redirect to home
    setIsGuest(true);
    setUserRole('customer');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        isLoading,
        isGuest,
        guestId,
        signIn,
        signUp,
        signOut,
        continueAsGuest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
