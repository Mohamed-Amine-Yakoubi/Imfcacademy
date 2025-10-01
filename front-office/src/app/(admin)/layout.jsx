'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AppSidebar from '@/layout/AppSidebar';
import AppHeader from '@/layout/AppHeader';
import Backdrop from '@/layout/Backdrop';

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <SidebarProvider>
          <Admin>{children}</Admin>
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

function Admin({ children }) {
  const { data: session, status } = useSession();
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
 console.log('Session status:', status);
  console.log('Session data:', session);
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }else   if (status === 'authenticated') {
      // Rediriger vers /admin si déjà connecté
      router.replace('/admin');
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null; // On attend la redirection
  }
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";
  return (
<div className="min-h-screen xl:flex">
  {/* Sidebar */}
  <AppSidebar />

  {/* Backdrop (pour les écrans mobiles) */}
  <Backdrop />

  {/* Zone principale (header + contenu) */}
  <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
    {/* Header */}
    <AppHeader />

    {/* Contenu principal de la page */}
    <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
      {children}
    </div>
  </div>
</div>
  );
}
