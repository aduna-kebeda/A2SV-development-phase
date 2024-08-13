"use client";
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const { status, data: session } = useSession();
  // console.log("Session:", );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        // Handle errors from NextAuth
        setError(result.error);
      } else if (result?.ok) {
        // Redirect to home page if sign-in was successful
        router.push('/');
      } else {
        // Handle unexpected cases
        setError('Unexpected response');
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Login error:", error); // Log login error
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/', redirect: true });
  };

  return (
    <div className="container w-3/5 mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl text-blue-900 font-bold text-center mb-6">Welcome Back,</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex justify-center mb-6">
        <button 
          onClick={handleGoogleSignIn} 
          className="mt-1 p-2 border border-gray-300 rounded-lg w-[408px] text-center text-blue-900 text-xl bg-white hover:bg-gray-100 cursor-pointer transition duration-300"
        >
          <img src='/assets/google.png' className="w-6 h-6 inline-block mr-2" alt="Google logo" />
          Sign In with Google
        </button>
      </div>
      <div className="flex justify-center my-4">
        <div className="w-[408px] flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or Sign In with Email</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4 w-[408px]">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
            placeholder='Enter Email Address'
          />
        </div>
        <div className="mb-4 w-[408px]">
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
            placeholder='Enter Password'
          />
        </div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-900 text-white rounded-[20px] hover:bg-blue-950 w-[408px] transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-gray-700">
        Don't have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign Up</a>
      </p> 
    </div>
  );
};

export default SignIn;