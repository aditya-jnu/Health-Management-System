import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const About = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
        navigate('/home'); // After login, redirect to Home page
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
        navigate('/home'); // After signup, redirect to Home page
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side: About Section */}
      <div className="flex-1 bg-gray-100 p-8 md:p-16">
        <h2 className="text-3xl font-semibold">About Us</h2>
        <p className="mt-4">Welcome to our Healthcare Portal. Log in to manage your health records easily.</p>
      </div>

      {/* Right Side: Login / Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-7 text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
          <form onSubmit={handleAuth}>
            {/* Email Input Field */}
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {emailFocused && !email && (
                <span className="text-red-500 text-sm absolute left-0 bottom-[-22px]">
                  You need to enter your email
                </span>
              )}
            </div>

            {/* Password Input Field */}
            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {passwordFocused && !password && (
                <span className="text-red-500 text-sm absolute left-0 bottom-[-22px]">
                  You need to enter your password
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-xl p-3 bg-blue-700 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          
          {/* Switch between Login and Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Log In
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
