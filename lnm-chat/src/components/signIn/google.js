"use client"
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { auth } from '@/config/firebase';

const GoogleSignIn = () => {
const router = useRouter();
const [error, setError] = useState(null);

const handleGoogleSignIn = async () => {
          setError(null);
          const provider = new GoogleAuthProvider();
          
          try {
                    const result = await signInWithPopup(auth, provider);
                    const user = result.user;
                    
                    // Domain restriction
                    if (!user.email?.endsWith('@lnmiit.ac.in')) {
                      await auth.signOut();
                      toast("Not authorised!");
                      throw new Error('Only @lnmiit.ac.in emails are allowed');
                    }
                    
                    // Successful login - redirect or handle user
                    // console.log('Logged in user:', user);
                    router.push('/chat'); // Uncomment if using Next.js navigation
          
          } catch (err) {
                    setError(err.message);
                    console.error('Login error:', err);
          }
};

  return (
<div className='flex justify-center w-full mt-1 p-3 rounded-2xl  transition border-2 border-white'>
  <button 
    onClick={handleGoogleSignIn}
    className="w-full"
    style={{
      color: '#3c4043',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      backgroundColor: 'transparent',
      border: 'none'
    }}
  >
    <img 
      src="/GoogleLogo.svg" 
      alt="Google logo" 
      style={{ width: '25px', height: '25px' }}
    />
    <span className="hidden sm:inline text-white font-semibold">Sign in with Google</span>
  </button>
</div>
  );
};

export default GoogleSignIn;