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
    <div className='flex justify-center w-full mt-1  bg-blue-600 p-3 text-white rounded-lg hover:bg-blue-700 transition'>
      <button 
        onClick={handleGoogleSignIn}
        style={{
          width: "100%",
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <img 
          src="/GoogleLogo.svg" 
          alt="Google logo" 
          style={{ width: '20px', height: '20px' }}
        />
        Sign in with Google 
      </button>
    </div>
  );
};

export default GoogleSignIn;