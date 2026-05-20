import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/lib/providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GhostDock',
  description: 'Turn any public GitHub repo into a beautiful landing page — in seconds.',
};

const clerkAppearance = {
  variables: {
    colorBackground: '#c8d0cc',
    colorInputBackground: '#f0f4f2',
    colorPrimary: '#00a865',
    colorText: '#0a2416',
    colorTextSecondary: '#3d5248',
    colorTextOnPrimaryBackground: '#f5f9f5',
    colorDanger: '#c4622a',
    colorNeutral: '#3d5248',
    colorInputText: '#0a2416',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-geist-sans)',
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="flex min-h-full flex-col">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
