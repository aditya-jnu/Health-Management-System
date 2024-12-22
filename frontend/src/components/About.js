import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const About = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
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
    <div className="flex h-screen">
      {/* Left Side: About Section */}
      <div className="flex-1 bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold">About Us</h2>
        <p className="mt-4">Welcome to our Healthcare Portal. Log in to manage your health records easily.</p>
      </div>

      {/* Right Side: Login / Signup Form */}
      <div className="flex-1 bg-white p-8">
        <h2 className="text-3xl font-semibold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
