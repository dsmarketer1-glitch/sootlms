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
  const { role } = useMockAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'STUDENT' && role !== 'ADMIN' && role !== 'TEACHER') {
      router.push('/');
    }
  }, [role, router]);

  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

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
