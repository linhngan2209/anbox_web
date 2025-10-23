'use client';

import { useAuth } from '@/contexts/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header  />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
