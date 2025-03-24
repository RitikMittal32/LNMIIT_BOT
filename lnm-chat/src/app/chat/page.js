// app/chat/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { UserCircleIcon, ArrowPathIcon, QrCodeIcon , XMarkIcon  } from '@heroicons/react/24/outline';
import { QRCode } from "qrcode.react";
import { FAQ } from '@/components/FAQ/faq';
import axios from '@/config/axiosConfig';
import ChatMessage from '@/components/chatMessage/chatMessage';
import Image from 'next/image';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const FAQ_QUESTIONS = [
    "Can I get info about {Professor_Name}",
    "Who works in {field_Name}",
    "Important Announcements",
    "Can you find {Book_Name} in the Library?"
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
  
    setLoading(true);
  

    try {
      const res = await axios.post('/api/chat/dialogflow', 
        { message: input, sessionId }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
    
      if (res.data.success) {
        setMessages(prev => [
          ...prev,
          { text: res.data.text, isBot: true, timestamp: new Date().toISOString() }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { text: "Error processing your request.", isBot: true }
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Server error. Please try again.", isBot: true }
      ]);
    }
    
    setLoading(false);
    setInput('');
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
    {/* Mobile Overlay */}
    {isMobile && isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-20"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

      {/* Collapsible Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-30' : 'relative'}
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-16'}
        bg-white border-r border-gray-200 p-4 flex flex-col
        transition-all duration-300 ease-in-out
      `}>
        {/* Close button for mobile */}
        {isMobile && (
          <button
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        )}

        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8">
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
          <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        {/* QR Code Download - Only visible when expanded */}
        {isSidebarOpen && (
          <div className="mb-8">
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              {/* <QRCode 
                value="https://play.google.com/store/apps/details?id=com.lnmiit.chatbot"
                size={100}
                className="mx-auto mb-2"
              /> */}
              <p className="text-xs text-gray-600">Scan to download mobile app</p>
            </div>
          </div>
        )}

        {/* Chat History - Only visible when expanded */}
        {isSidebarOpen && (
          <div className="flex-1 overflow-auto">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">History</h4>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">
                  Conversation {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collapse Button (desktop) */}
        {!isMobile && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${isSidebarOpen? 'absolute top-5 right-4 p-1 hover:bg-gray-100 rounded-lg self-start' : 'p-1 hover:bg-gray-100 rounded-lg self-start'}`}
          >
            {isSidebarOpen ? (
              <img src='/LeftSideBar.svg' className="h-6 w-6 text-gray-500" />
            ) : (
              <img src='/RightSideBar.svg' className="h-6 w-6 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-2 left-2 z-10 p-2 hover:bg-gray-100 rounded-lg"
          >
            <img src='/RightSideBar.svg' className="h-6 w-6 text-gray-500" />
          </button>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-auto p-4 space-y-4 pt-12 md:pt-4">
          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[70%] rounded-lg p-3 ${
                message.isBot 
                  ? 'bg-white border border-gray-200'
                  : 'bg-blue-600 text-white'
              }`}>
                <p className="text-sm">{message.text}</p>
                {message.timestamp && (
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          ))}
          {/* {messages.map((message, i) => (
            <ChatMessage key={i} message={message} isBot={message.isBot} />
          ))} */}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* FAQ & Input Section */}
        <div className="border-t border-gray-200 p-4 bg-white">
          {/* FAQ Suggestions */}
          <div className="grid grid-cols-2 gap-2 mb-4 md:grid-cols-2">
            {FAQ_QUESTIONS.map((question, i) => (
              <div
                key={i}
                onClick={() => setInput(question)}
                className="text-sm p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 truncate"
              >
                {question}
              </div>
            ))}
    
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}