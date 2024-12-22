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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Left Side: About Section */}
      <div className="flex-1 bg-blue-200 p-8 md:p-16">
        <h2 className="text-3xl font-semibold">About Us</h2>
        <p className="mt-4">Welcome to our Healthcare Portal. Log in to manage your health records easily.</p>
      </div>

      {/* Right Side: Login / Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-7 text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
          <form onSubmit={handleAuth} className="space-y-6">
            {/* Email Input Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {emailFocused && !email && (
                <div className="mt-2 text-red-500 text-sm">
                  You need to enter your email
                </div>
              )}
            </div>

            {/* Password Input Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {passwordFocused && !password && (
                <div className="mt-2 text-red-500 text-sm">
                  You need to enter your password
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => alert('Forgot Password clicked!')} // Replace with actual forgot password logic
              >
                Forgot Password?
              </button>
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
            <p className="text-md text-black-600">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    className="text-blue-600 hover:underline"
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
