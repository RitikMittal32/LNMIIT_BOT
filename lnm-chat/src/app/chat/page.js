'use client';
import { useState, useEffect } from 'react';
import { UserCircleIcon, ArrowPathIcon, XMarkIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FAQ } from '@/components/FAQ/faq';
import axios from '@/config/axiosConfig';
import Image from 'next/image';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { toast } from 'react-toastify';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ChatInterface() {
  const { messages, sessionId, addMessage, startNewChat } = useChat();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const router = useRouter();

  useAuthRedirect();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast("LogOut Successfully!"); 
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const FAQ_QUESTIONS = [
    "Can I get info about {Professor_Name}",
    "Who works in {field_Name}",
    "Important Announcements",
    "Can you get the {Book_Name}?"
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to Firebase
    await addMessage({ text: input, isBot: false });
    setLoading(true);

    try {
      const res = await axios.post('/api/chat/dialogflow', 
        { message: input, sessionId }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
    
      if (res.data.success) {
        // Add bot response to Firebase
        await addMessage({ 
          text: res.data.text, 
          isBot: true, 
          timestamp: new Date().toISOString() 
        });
      } else {
        await addMessage({ 
          text: "Error processing your request.", 
          isBot: true 
        });
      }
    } catch (error) {
      await addMessage({ 
        text: "Server error. Please try again.", 
        isBot: true 
      });
    }
    
    setLoading(false);
    setInput('');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
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
            className="absolute top-4 right-2 p-1 hover:bg-gray-100 rounded-full z-10"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XMarkIcon className="h-8 w-8 text-gray-500" />
          </button>
        )}

        {/* Profile Section */}
        <div 
          className="flex items-center gap-3 mb-8 relative"
          onClick={() => setShowProfileOptions(!showProfileOptions)}
        >
          {user?.photoURL ? (
            <Image 
              src={user.photoURL} 
              alt="Profile" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
          ) : (
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
          )}

          <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
            <h3 className="font-semibold">{user?.displayName || 'User'}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

        </div>

        {/* New Chat Button */}
        
          <button
            onClick={startNewChat}
            className={`mb-4   text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${isSidebarOpen ? 'bg-blue-600 mt-2  hover:bg-blue-700 p-2' : 'mt-20'}`}
          >
            <Image 
            src='chat.png'
            alt="Profile" 
              width={28} 
              height={28} 
             />
           {isSidebarOpen ? (<p>New Chat</p>) : ("") }
          </button>
        

         {/* Action Buttons - Always visible but change appearance based on sidebar state */}
         <div className="mt-auto mb-6 space-y-4 flex flex-col justify-center items-center">
          {/* Settings Button */}
          <button
            onClick={() => {/* Add settings navigation here */}}
            className={`flex items-center w-full  rounded-lg transition-colors
              ${isSidebarOpen ? ' text-white font-bold justify-center bg-blue-500 p-1  hover:bg-blue-700' : 'justify-center hover:bg-gray-100'}`}
          > 
            <Cog6ToothIcon className="h-8 w-8" />
            {isSidebarOpen && <span className="ml-2">SETTINGS</span>}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`flex items-center w-full  rounded-lg transition-colors
              ${isSidebarOpen ? 'text-white font-bold justify-center  bg-blue-500 p-1  hover:bg-blue-700' : 'justify-center hover:bg-gray-100'}`}
          >
              <ArrowLeftOnRectangleIcon className="h-8 w-8" />
            {isSidebarOpen && <span className="ml-2">LOGOUT</span>}
          </button>
        </div>
        {/* Collapse Button (desktop) */}
        {!isMobile && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${isSidebarOpen? 'absolute top-5 right-4 p-1 hover:bg-gray-100 rounded-lg self-start' : 'absolute top-20 p-1 hover:bg-gray-100 rounded-lg self-start'}`}
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
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-2 left-2 z-10 p-2 hover:bg-gray-100 rounded-lg"
          >
            <img src='/RightSideBar.svg' className="h-8 w-8 text-gray-500" />
          </button>
        )}

        <ChatMessages messages={messages} loading={loading} />
        <ChatInput 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          FAQ_QUESTIONS={FAQ_QUESTIONS} 
        />
      </div>
    </div>
  );
}