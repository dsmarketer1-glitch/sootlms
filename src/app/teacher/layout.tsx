"use client";

import { TeacherSidebar } from "@/components/teacher-sidebar";
import { UserButton } from "@clerk/nextjs";
import { useMockAuth } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isLoaded } = useMockAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    // Only teachers can access this layout (admin also allowed to inspect)
    if (role !== 'TEACHER' && role !== 'ADMIN') {
      if (role === 'STUDENT') {
        router.replace('/dashboard');
      } else {
        router.replace('/');
      }
    }
  }, [role, isLoaded, router]);

  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Don't render anything until loaded and verified
  if (!isLoaded || (role !== 'TEACHER' && role !== 'ADMIN')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-8 shrink-0 bg-white/50 backdrop-blur-md">
          <h2 className="font-semibold text-muted-foreground uppercase tracking-widest text-xs">Teacher Portal</h2>
          <div className="flex items-center space-x-4">
             {hasClerkKeys ? <UserButton /> : <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">T</div>}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
