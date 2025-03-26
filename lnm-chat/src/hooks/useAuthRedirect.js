// hooks/useAuthRedirect.js
'use client'
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { toast } from 'react-toastify';
export function useAuthRedirect(requiredAuth = true, redirectPath = '/login') {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (requiredAuth && !user) {
        toast("🔒 Please login first to access the chat!");
        router.push(redirectPath);
      } else if (!requiredAuth && user) {
        toast("User already logged In!"); 
        router.push(redirectPath);
      }
    });

    return () => unsubscribe();
  }, [router, requiredAuth, redirectPath]);
}