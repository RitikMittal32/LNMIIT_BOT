import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Better font loading behavior
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Viewport configuration (new in Next.js 13+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export const metadata = {
  title: "LNMIIT CHATBOT",
  description: "LNMIIT Information Retrieval ChatBot",
  icons: {
    icon: [
      { url: 'https://lnmiit.ac.in/wp-content/uploads/2023/11/cropped-lnmiit-icon-32x32.png', type: 'image/png', sizes: '192x192'  },
      { url: 'https://lnmiit.ac.in/wp-content/uploads/2023/11/cropped-lnmiit-icon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: 'https://lnmiit.ac.in/wp-content/uploads/2023/11/cropped-lnmiit-icon-180x180.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Head>
        {/* Preconnect to improve font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* iOS PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        suppressHydrationWarning={true} // For toast notifications
      >
        {/* Mobile viewport height fix */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
              window.addEventListener('resize', function() {
                document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
              });
            `,
          }}
        />
        
        {children}
        
        <ToastContainer
          position="bottom-center"
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