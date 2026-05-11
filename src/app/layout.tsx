import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SOOT OS | School of Odd Thinkers",
  description: "Operating System for School of Odd Thinkers - Digital Marketing Academy",
};

import { MockAuthProvider } from "@/lib/mock-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if Clerk keys exist
  const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col">
        <MockAuthProvider>
          {hasClerkKeys ? (
            <ClerkProvider>
              {children}
            </ClerkProvider>
          ) : (
            <>{children}</>
          )}
        </MockAuthProvider>
      </body>
    </html>
  );
}
