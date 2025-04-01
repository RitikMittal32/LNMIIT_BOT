'use client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

export const ChatMessages = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 pt-12 md:pt-4">
      {messages.map((message, i) => (
        <div key={i} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
          <div className={`max-w-[70%] rounded-lg p-3 ${
            message.isBot 
              ? 'bg-white border border-gray-200'
              : 'bg-blue-600 text-white'
          }`}>
            <p className="text-sm whitespace-pre-line">{message.text}</p>
            {message.timestamp && (
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
          </div>
        </div>
      )}
      
      {/* Empty div at the bottom for auto-scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};