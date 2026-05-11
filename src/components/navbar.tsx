"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMockAuth } from "@/lib/mock-auth";

function NavbarContent({ isSignedIn, role, isMock, hasClerkKeys }: { isSignedIn: boolean, role: string, isMock: boolean, hasClerkKeys: boolean }) {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter text-gradient">SOOT OS</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            <>
              {hasClerkKeys ? (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm">Get Started</Button>
                  </SignUpButton>
                </>
              ) : (
                <Button size="sm" onClick={() => alert("Please switch role to STUDENT or ADMIN using the bottom-right switcher for demo.")}>Get Started</Button>
              )}
            </>
          ) : (
            <>
              {role === 'ADMIN' ? (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-primary font-bold">Admin Panel</Button>
                </Link>
              ) : role === 'TEACHER' ? (
                <Link href="/teacher">
                  <Button variant="ghost" size="sm" className="text-primary font-bold">Teacher Portal</Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
              )}
              {!isMock && hasClerkKeys && <UserButton afterSignOutUrl="/" />}
              {isMock && <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">{role[0]}</div>}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const { isSignedIn: isMockSignedIn, role: mockRole } = useMockAuth();

  if (hasClerkKeys) {
    return <ClerkNavbar mockRole={mockRole} isMockSignedIn={isMockSignedIn} hasClerkKeys={hasClerkKeys} />;
  }

  return <NavbarContent isSignedIn={isMockSignedIn} role={mockRole} isMock={true} hasClerkKeys={false} />;
}

function ClerkNavbar({ mockRole, isMockSignedIn, hasClerkKeys }: { mockRole: string, isMockSignedIn: boolean, hasClerkKeys: boolean }) {
  const { isSignedIn: isClerkSignedIn } = useAuth();
  const isSignedIn = isClerkSignedIn || isMockSignedIn;
  const role = isClerkSignedIn ? 'USER' : mockRole;

  return <NavbarContent isSignedIn={isSignedIn} role={role} isMock={!isClerkSignedIn} hasClerkKeys={hasClerkKeys} />;
}
