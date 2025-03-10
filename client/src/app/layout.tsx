import AntStyledComponentsRegistry from '@/webpages/shared/ant/registry/AntRegistryClient';
import RootLayoutClient from '@/webpages/shared/components/root-layout/RootLayoutClient';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Doc Analysis',
  description: 'Scout technical exercise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AntStyledComponentsRegistry>
          <RootLayoutClient>{children}</RootLayoutClient>
        </AntStyledComponentsRegistry>
      </body>
    </html>
  );
}
