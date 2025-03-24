"use client"; 
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r h-full from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="logoSide flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h1 className="text-xl font-bold">LNMIIT CHATBOT</h1>
        </div>
        <div className="OptionSide flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <Link href='/login/' target='_blank'>
          <button className="w-full sm:w-auto px-4 py-2 rounded-md font-medium bg-white text-blue-600 hover:bg-gray-100 transition duration-200">
          LOGIN
          </button>
          </Link>
          <Link href='/register/' target='_blank'>
          <button className="w-full sm:w-auto px-4 py-2 rounded-md font-medium bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 transition duration-200">
          SIGN UP
          </button>
          </Link>
          </div>
      </div>
    </header>
  );
};

export default Header;