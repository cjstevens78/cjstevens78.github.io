import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chris Stevens - Front End Web Developer and Web Accessibility Specialist',
  description: 'Portfolio of Chris Stevens, Time served Front End Web Developer and Web Accessibility Specialist.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}<Analytics /></body>
    </html>
  );
}