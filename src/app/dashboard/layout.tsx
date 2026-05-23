"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { UserButton } from "@clerk/nextjs";
import { useMockAuth } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isLoaded } = useMockAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    // Admin should be redirected to admin panel, not student dashboard
    if (role === 'ADMIN') {
      router.replace('/admin');
      return;
    }
    // Teacher should be redirected to teacher portal
    if (role === 'TEACHER') {
      router.replace('/teacher');
      return;
    }
    // Guests should go to login
    if (role === 'GUEST') {
      router.replace('/');
      return;
    }
  }, [role, isLoaded, router]);

  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Don't render until loaded and verified as student
  if (!isLoaded || role !== 'STUDENT') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <StudentSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-8 shrink-0 bg-white/50 backdrop-blur-md">
          <h2 className="font-semibold text-muted-foreground uppercase tracking-widest text-xs">Student Portal</h2>
          <div className="flex items-center space-x-4">
             {hasClerkKeys ? <UserButton /> : <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">S</div>}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
