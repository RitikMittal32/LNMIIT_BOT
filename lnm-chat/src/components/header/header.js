"use client"; 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GoogleSignIn from '../signIn/google';
const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r h-full from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="logoSide flex items-center">
          <Image 
          src = "https://lnmiit.ac.in/wp-content/uploads/2023/11/cropped-lnmiit-icon-180x180.png"
          width={32}
          height={32}
          />
          <h1 className="text-xl font-bold">LNMIIT CHATBOT</h1>
        </div>
        <div className="OptionSide flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <GoogleSignIn />
          </div>
      </div>
    </header>
  );
};

export default Header;