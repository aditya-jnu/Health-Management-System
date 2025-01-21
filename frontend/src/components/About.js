import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Supabase client

const About = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Full name for signup
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login Logic
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        alert('Logged in successfully!');
        navigate('/home'); // Redirect to Home page
      } else {
        // Signup Logic
        const { data: user, error: signupError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signupError) throw signupError;

        // Add user details to the Supabase "userDetails" table
        const { error: insertError } = await supabase
          .from('userDetails')
          .insert({
            id: user.user?.id,
            fullName,
            email,
            profileComplete: false,
          });
        if (insertError) throw insertError;

        alert('Account created successfully!');
        navigate('/home');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side: Services Section */}
      <div className="flex-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-8 md:p-16">
        <img src='/assets/medilogi1.png' alt='logo'/>
        <h2 className="text-4xl font-bold text-center text-white mb-6">What Services We Provide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Service Item 1 */}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
            <img
              src="/assets/service-icon1.jpg"
              alt="Personalized Health Records"
              className="h-12 w-12"
            />
            <p className="text-lg font-medium">Personalized Health Records</p>
          </div>

          {/* Service Item 2 */}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
            <img
              src="/assets/service-icon22.png"
              alt="Appointment Scheduling"
              className="h-12 w-12"
            />
            <p className="text-lg font-medium">Appointment Scheduling</p>
          </div>

          {/* Service Item 3 */}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
            <img
              src="/assets/service-icon3.jpg"
              alt="Real-Time Health Monitoring"
              className="h-12 w-12"
            />
            <p className="text-lg font-medium">Real-Time Health Monitoring</p>
          </div>

          {/* Service Item 4 */}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
            <img
              src="/assets/service-icon4.png"
              alt="24/7 Consultation Services"
              className="h-12 w-12"
            />
            <p className="text-lg font-medium">24/7 Consultation Services</p>
          </div>

          {/* Service Item 5 */}
          {/* <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
            <img
              src="/assets/service-icon5.png"
              alt="Health Insights & Analytics"
              className="h-12 w-12"
            />
            <p className="text-lg font-medium">Health Insights & Analytics</p>
          </div> */}
        </div>
      </div>

      {/* Right Side: Login / Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-7 text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <>
                {/* Full Name Input Field */}
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            )}

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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
