"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useUser, ClerkProvider } from "@clerk/nextjs";
import { supabase } from '@/lib/supabase';

export type Role = 'GUEST' | 'STUDENT' | 'ADMIN' | 'TEACHER';

interface MockAuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  isSignedIn: boolean;
  isLoaded: boolean;
  userId: string | null;
  email: string | null;
  fullName: string | null;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

// 1. Clerk Authentication Provider (nested inside <ClerkProvider>)
function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isClerkLoaded, isSignedIn: isClerkSignedIn } = useUser();
  const [role, setRoleState] = useState<Role>('GUEST');
  const [isSyncLoaded, setIsSyncLoaded] = useState(false);

  useEffect(() => {
    async function syncProfile() {
      if (!isClerkLoaded) return;

      if (!isClerkSignedIn || !user) {
        setRoleState('GUEST');
        setIsSyncLoaded(true);
        return;
      }

      try {
        const email = user.primaryEmailAddress?.emailAddress || "";
        
        // Fetch profile from Supabase
        let { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('clerk_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching user profile:", error);
        }

        // Auto-seed admin or create new student profile if missing
        if (!profile) {
          const isSystemAdmin = email.toLowerCase() === 'ds.marketer1@gmail.com';
          const assignedDbRole = isSystemAdmin ? 'admin' : 'student';

          const newProfile = {
            clerk_id: user.id,
            email: email,
            full_name: user.fullName || user.username || "Anonymous Learner",
            role: assignedDbRole,
            avatar_url: user.imageUrl || null,
            is_active: true,
          };

          const { data: insertedProfile, error: insertError } = await supabase
            .from('user_profiles')
            .insert(newProfile)
            .select()
            .single();

          if (insertError) {
            console.error("Error creating user profile in Supabase:", insertError);
          } else {
            profile = insertedProfile;
          }
        } else {
          // If profile exists, check if email is admin email and role is not admin
          if (email.toLowerCase() === 'ds.marketer1@gmail.com' && profile.role !== 'admin') {
            const { data: updatedProfile } = await supabase
              .from('user_profiles')
              .update({ role: 'admin' })
              .eq('clerk_id', user.id)
              .select()
              .single();
            if (updatedProfile) {
              profile = updatedProfile;
            }
          }
        }

        // Map Supabase role to Context Role
        if (profile) {
          const dbRole = profile.role;
          if (dbRole === 'admin') {
            setRoleState('ADMIN');
          } else if (dbRole === 'trainer') {
            setRoleState('TEACHER');
          } else {
            setRoleState('STUDENT');
          }
        } else {
          setRoleState('STUDENT'); // Fallback
        }
      } catch (e) {
        console.error("Auth sync failed", e);
        setRoleState('STUDENT');
      } finally {
        setIsSyncLoaded(true);
      }
    }

    syncProfile();
  }, [user, isClerkLoaded, isClerkSignedIn]);

  const setRole = (newRole: Role) => {
    console.warn("Manual role switcher is disabled in live mode. Role is derived from authentication profile.");
  };

  const contextValue: MockAuthContextType = {
    role,
    setRole,
    isSignedIn: !!isClerkSignedIn && isSyncLoaded && role !== 'GUEST',
    isLoaded: !!isClerkLoaded && isSyncLoaded,
    userId: user?.id || null,
    email: user?.primaryEmailAddress?.emailAddress || null,
    fullName: user?.fullName || null
  };

  return (
    <MockAuthContext.Provider value={contextValue}>
      {children}
    </MockAuthContext.Provider>
  );
}

// 2. Local Authentication Provider (Used when Clerk keys are missing)
function LocalAuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soot_mock_role');
      return (saved as Role) || 'ADMIN';
    }
    return 'ADMIN';
  });

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('soot_mock_role', newRole);
    }
  };

  const email = role === 'ADMIN' 
    ? 'ds.marketer1@gmail.com' 
    : role === 'TEACHER' 
      ? 'teacher@schoolofoddthinkers.com' 
      : role === 'STUDENT'
        ? 'student@schoolofoddthinkers.com'
        : null;

  const fullName = role === 'ADMIN' 
    ? 'System Admin (Local)' 
    : role === 'TEACHER' 
      ? 'Trainer Account (Local)' 
      : role === 'STUDENT'
        ? 'Student Account (Local)'
        : 'Guest User (Local)';

  const contextValue: MockAuthContextType = {
    role,
    setRole,
    isSignedIn: role !== 'GUEST',
    isLoaded: true,
    userId: role !== 'GUEST' ? `mock_local_user_${role.toLowerCase()}` : null,
    email,
    fullName
  };

  return (
    <MockAuthContext.Provider value={contextValue}>
      {children}
      {/* Mini Floating Switcher for Local Dev / Keyless Mode */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        <div className="bg-slate-950 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex flex-col space-y-2 min-w-[200px] text-xs font-sans">
          <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center text-[10px] tracking-wider uppercase text-slate-400">
            <span>Local Dev Switcher</span>
            <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded text-[8px]">Mock Mode</span>
          </div>
          <div className="flex flex-col space-y-1 pt-1">
            {(['ADMIN', 'TEACHER', 'STUDENT', 'GUEST'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`w-full text-left px-2 py-1.5 rounded transition ${
                  role === r 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {r === 'ADMIN' && '👑 Admin'}
                {r === 'TEACHER' && '🎓 Teacher'}
                {r === 'STUDENT' && '📝 Student'}
                {r === 'GUEST' && '🌐 Guest (Logout)'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MockAuthContext.Provider>
  );
}

// 3. Central Entry Point Wrapper
export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (hasClerkKeys) {
    return (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ClerkAuthProvider>
          {children}
        </ClerkAuthProvider>
      </ClerkProvider>
    );
  }

  return <LocalAuthProvider>{children}</LocalAuthProvider>;
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    return { 
      role: 'GUEST' as Role, 
      setRole: () => {}, 
      isSignedIn: false, 
      isLoaded: false,
      userId: null,
      email: null,
      fullName: null
    };
  }
  return context;
}

export function useSafeAuth() {
  const { isSignedIn, userId, isLoaded } = useMockAuth();
  return { isSignedIn, userId, isLoaded };
}
