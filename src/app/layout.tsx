import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth';
import ClientLayout from './client-layout';
import { CartProvider } from '@/contexts/cartContext';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ANBOX - Meal Subscription Service',
  description: 'Dịch vụ đăng ký bữa ăn lành mạnh, tiện lợi và ngon miệng.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
