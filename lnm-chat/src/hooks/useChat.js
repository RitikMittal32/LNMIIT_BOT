'use client';
import { useState, useEffect } from 'react';
import { database } from '@/config/firebase';
import { ref, push, set, onValue, off, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

  // Initialize chat listener when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setupChatListener(user.uid);
      } else {
        setUserId(null);
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const setupChatListener = (userId) => {
    const chatRef = ref(database, `userChats/${userId}/currentChat/messages`);
    
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.values(data);
        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => off(chatRef);
  };

  const addMessage = async (messageData) => {
    if (!userId) return;
    
    const messagesRef = ref(database, `userChats/${userId}/currentChat/messages`);
    const newMessageRef = push(messagesRef);
    
    await set(newMessageRef, {
      ...messageData,
      timestamp: new Date().toISOString()
    });
  };

  const startNewChat = async () => {
    if (!userId) return;
    
    const chatRef = ref(database, `userChats/${userId}/currentChat`);
    await set(chatRef, {
      messages: {},
      createdAt: new Date().toISOString(),
      active: true
    });
  };

  const clearChat = async () => {
    if (!userId) return;
    await startNewChat();
  };

  return {
    messages,
    sessionId,
    addMessage,
    startNewChat,
    clearChat
  };
};