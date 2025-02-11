// // app/(auth)/register/page.jsx
// import { GoogleButton } from '@/components';
// import { useGoogleLogin } from '@react-oauth/google';

export default function Register() {
  // const googleLogin = useGoogleLogin({
  //   onSuccess: tokenResponse => {
  //     // Handle Google auth and fetch user data
  //   },
  // });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Guest Registration</h2>
        {/* <GoogleButton onClick={() => googleLogin()} /> */}
        
        <form className="mt-6 space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Email" disabled className="w-full p-3 border rounded-lg bg-gray-100" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          <input type="date" className="w-full p-3 border rounded-lg" />
          <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}