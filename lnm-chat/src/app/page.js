// app/chat/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { UserCircleIcon, ArrowPathIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { QRCode } from "qrcode.react";
import { FAQ } from '@/components/FAQ/faq';
import ChatMessage from '@/components/chatMessage/chatMessage';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [loading, setLoading] = useState(false);

  const FAQ_QUESTIONS = [
    "What's the library timing?",
    "How to apply for leave?",
    "Exam schedule details",
    "Hostel rules and regulations"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
  
    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
  
    setLoading(true);
  
    try {
      const res = await fetch('http://localhost:5000/api/chat/dialogflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId }),
      });
  
      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [
          ...prev,
          { text: data.text, isBot: true, timestamp: new Date().toISOString() }
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
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8">
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        {/* QR Code Download */}
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

        {/* Chat History */}
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
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
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
          <div className="grid grid-cols-2 gap-2 mb-4">
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