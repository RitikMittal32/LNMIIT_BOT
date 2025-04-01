import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Add this to prevent mobile browsers from zooming on input focus
  interactiveWidget: 'resizes-visual',
};

export const metadata = {
  title: "LNMIIT CHATBOT",
  description: "LNMIIT Information Retrieval ChatBot",
  icons: {
    icon: [
      { url: '/lnmIcon32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/lnmIcon192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/lnmIcon180x180.png', type: 'image/png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Add these meta tags for better mobile handling */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        {/* Improved mobile viewport handling */}
        <div className="flex flex-col h-[calc(100dvh)] overflow-hidden">
          {children}
        </div>
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="text-sm"
        />
      </body>
    </html>
  );
}