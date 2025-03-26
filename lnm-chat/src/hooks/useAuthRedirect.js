// hooks/useAuthRedirect.js
'use client'
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

let globalToastShown = false; // Global flag outside component

export function useAuthRedirect(requiredAuth = true, redirectPath = '/login') {
  const router = useRouter();
  const localToastShown = useRef(false);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Skip if any toast was already shown globally
      if (globalToastShown || localToastShown.current) return;
      
      if (requiredAuth && !user) {
        toast.error("🔐 Please login with your LNMIIT account", {
          toastId: 'auth-redirect-error', // Unique ID
          autoClose: 5000
        });
      } else if (!requiredAuth && user) {
        toast.info("Welcome back! Redirecting...", {
          toastId: 'auth-redirect-info', // Unique ID
          autoClose: 3000
        });
      }

      // Mark as shown both locally and globally
      localToastShown.current = true;
      globalToastShown = true;
      
      // Only redirect if needed
      if ((requiredAuth && !user) || (!requiredAuth && user)) {
        router.push(redirectPath);
      }
    });

    return () => {
      unsubscribe();
      // Reset local flag but keep global flag
      localToastShown.current = false;
    };
  }, [router, requiredAuth, redirectPath]);
}