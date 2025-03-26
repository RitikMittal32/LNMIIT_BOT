// app/(auth)/login/page.
'use client';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GoogleSignIn from '@/components/signIn/google';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  useAuthRedirect(false, '/chat');
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-8">LNMIIT Login</h2>
        <select className="w-full p-3 mb-4 border rounded-lg">
          <option>Student</option>
          <option>Faculty</option>
          <option>Guest</option>
        </select>
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg" />
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full p-3 mb-4 border rounded-lg pr-10"
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4"
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
        
          <GoogleSignIn />
        
      </div>
    </div>
  );
}