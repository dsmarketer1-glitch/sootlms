"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMockAuth } from "@/lib/mock-auth";

function NavbarContent({ isSignedIn, role, hasClerkKeys }: { isSignedIn: boolean, role: string, hasClerkKeys: boolean }) {
  // Determine the correct dashboard link for the signed-in user
  const dashboardHref = role === 'ADMIN' ? '/admin' 
    : role === 'TEACHER' ? '/teacher' 
    : '/dashboard';

  const dashboardLabel = role === 'ADMIN' ? 'Admin Panel'
    : role === 'TEACHER' ? 'Teacher Portal'
    : 'Dashboard';

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
                  <SignInButton mode="modal" forceRedirectUrl="/">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl="/">
                    <Button size="sm">Get Started</Button>
                  </SignUpButton>
                </>
              ) : (
                <Button size="sm" onClick={() => alert("Please switch role using the bottom-right switcher for demo.")}>Get Started</Button>
              )}
            </>
          ) : (
            <>
              <Link href={dashboardHref}>
                <Button variant="ghost" size="sm" className="text-primary font-bold">{dashboardLabel}</Button>
              </Link>
              {hasClerkKeys && <UserButton />}
              {!hasClerkKeys && <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">{role[0]}</div>}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const { isSignedIn, role, isLoaded } = useMockAuth();

  return (
    <NavbarContent 
      isSignedIn={isSignedIn} 
      role={role} 
      hasClerkKeys={hasClerkKeys} 
    />
  );
}
