import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
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

const description = 'Turn any public GitHub repo into a beautiful landing page — in seconds.';

// The deployed site URL. localhost is used only for local development.
// NEXT_PUBLIC_SITE_URL overrides it (e.g. once a custom domain is added).
const resolveSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
  return 'https://ghostdock.vercel.app';
};

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: 'GhostDock',
  description,
  openGraph: {
    title: 'GhostDock',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostDock',
    description,
  },
};

// Clerk's accessible dark base theme, tinted with the GhostDock accent.
const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#00c47a',
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
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="flex min-h-full flex-col">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
