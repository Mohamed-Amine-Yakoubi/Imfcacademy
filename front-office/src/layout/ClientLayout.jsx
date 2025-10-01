'use client';

import { useSession } from 'next-auth/react';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import SignInForm from '@/components/auth/SignInForm';

export default function ClientLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') return null; // Optional loading spinner

  return (
    <ThemeProvider>
      {session?.user ? (
        <SidebarProvider>{children}</SidebarProvider>
      ) : (
        <SignInForm />
      )}
    </ThemeProvider>
  );
}
