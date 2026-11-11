import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'BMW O‘zbekiston — Sheer Driving Pleasure | Rasmiy Veb-Sayt',
  description:
    'BMW O‘zbekiston rasmiy vitrinasi. Yangi avlod BMW M Power, BMW i elektr modellari, X-Series krosshoverlar va lyuks sedanlar bilan tanishing va test-drive ga yoziling.',
  keywords: [
    'BMW',
    'BMW Uzbekistan',
    'BMW M8',
    'BMW i7',
    'BMW M4',
    'BMW X7',
    'BMW test drive',
    'BMW narxlari Toshkent',
  ],
  authors: [{ name: 'BMW Uzbekistan' }],
  openGraph: {
    title: 'BMW O‘zbekiston — Sheer Driving Pleasure',
    description:
      'Bavariya muhandisligi, M Power dinamikasi va BMW i elektr harakati. Rasmiy modellar katalogi va test-drive bron qilish tizimi.',
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://bmw-uzbekistan.uz',
    siteName: 'BMW O‘zbekiston',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={inter.variable} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#0A0A0C] text-white font-sans antialiased selection:bg-[#0066B1] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
