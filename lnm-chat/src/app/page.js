// app/chat/page.jsx
'use client';
import { useState } from 'react';
import Header from "@/components/header/header";
import { QRCode } from "qrcode.react";
import Link from 'next/link';

export default function MainInterface() {
  const [showQR, setShowQR] = useState(false);
  const appDownloadLink = "https://example.com/download-app"; // Replace with your actual link

  // Need responsiveness for tablet also
  return (
    <div className="h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="sm:h-[12.5%] h-[18%]"><Header /></div>
      <div className="sm:h-[87.5%] h-[82%] flex flex-col">
        <div className="chatInfo h-[30%] flex justify-center items-center">
          <p className="text-2xl font-medium text-gray-700">Welcome to LNMIIT CHATBOT</p>
        </div>
        <div className="connectInfo h-[70%] flex flex-col justify-center items-center gap-8 w-[80%] mx-auto">
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
            {/* Get Started Button */}
            <Link 
              href="/chat/" 
              className="relative w-full max-w-xs" target="_blank"
            >
              <button className="w-full p-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </Link>

            {/* Get App Button with QR Code */}
            <div className="relative w-full max-w-xs">
              <button 
                onClick={() => setShowQR(!showQR)}
                className="w-full p-12 text-white bg-purple-600 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get LNMIIT Chatbot App
              </button>
              
              {/* {showQR && (
                <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-2xl border border-gray-200 z-10">
                  <QRCode 
                    value={appDownloadLink} 
                    size={128}
                    level="H"
                    className="mb-2"
                  />
                  <p className="text-sm text-center text-gray-600 mt-2">Scan to download</p>
                  <a 
                    href={appDownloadLink} 
                    className="text-xs text-blue-500 hover:underline block text-center mt-1"
                    target="_blank"
                  >
                    or click here
                  </a>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-200"></div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}