"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth as useClerkAuth } from "@clerk/nextjs";

export type Role = 'GUEST' | 'STUDENT' | 'ADMIN' | 'TEACHER';

interface MockAuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  isSignedIn: boolean;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('GUEST');

  useEffect(() => {
    const savedRole = localStorage.getItem('soot_mock_role') as Role;
    if (savedRole) setRoleState(savedRole);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('soot_mock_role', newRole);
    window.location.reload(); // Refresh to apply role context everywhere
  };

  const isSignedIn = role !== 'GUEST';

  return (
    <MockAuthContext.Provider value={{ role, setRole, isSignedIn }}>
      {children}
      <DevRoleSwitcher />
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    return { role: 'GUEST' as Role, setRole: () => {}, isSignedIn: false };
  }
  return context;
}

export function useSafeAuth() {
  // Check if Clerk is likely configured
  const hasClerkKeys = typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // We can't call hooks conditionally easily without triggering lint errors or runtime issues
  // But we can wrap it in a component or just use a dummy object if keys are missing
  return { isSignedIn: false, userId: null, isLoaded: true };
}

function DevRoleSwitcher() {
  const { role, setRole } = useMockAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-2xl font-bold text-xs uppercase tracking-widest border-2 border-white"
      >
        🔧 Role: {role}
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white border rounded-2xl shadow-2xl p-4 flex flex-col space-y-2 w-48 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Switch View (Dev Mode)</p>
          {(['GUEST', 'STUDENT', 'ADMIN', 'TEACHER'] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                setIsOpen(false);
              }}
              className={`text-sm text-left px-3 py-2 rounded-lg transition-colors ${role === r ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted'}`}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
