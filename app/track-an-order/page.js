'use client'
import React, { useState } from 'react';

const TrackOrderPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email address is required');
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call - replace with your actual tracking logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful tracking request here
      console.log('Tracking order for email:', email);
      
      // You would typically redirect to tracking results or show success message
      alert(`Tracking information will be sent to ${email}`);
      
    } catch (error) {
      setError('Unable to process your request. Please try again.');
      console.error('Tracking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <section className="min-h-screen bg-[#3333cb] lg:pt-40 lg:pb-12  flex items-center justify-center py-16 px-4">
      <div className="max-w-7xl w-full">
        {/* Header Content */}
        <div className="text-center mb-12">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-splash  text-white mb-8 leading-tight">
            <span className="text-yellow-400">TRACK</span>{' '}
            <span className="text-white">AN ORDER</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Stay joyfully informed. We've got you covered every step of the way with our 'Track 
            an Order' feature. Easily monitor the status and whereabouts of your delivery.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Email Input Section */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-gray-900 font-semibold text-lg mb-4"
              >
                Enter your email address*
              </label>
              
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="ex. Janedoe@gmail.com"
                  className={`w-full px-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none  transition-all duration-300 ${
                    error ? 'border-red-300 focus:ring-red-300 focus:border-red-500' : 'border-gray-200'
                  }`}
                  disabled={isLoading}
                />
                
                {/* Error State Icon */}
                {error && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Error Message */}
              {error && (
                <p className="mt-2 text-sm text-red-600 opacity-0 animate-fadeIn">
                  {error}
                </p>
              )}
            </div>

            {/* Helper Text */}
            <p className="text-sm text-gray-900 leading-relaxed">
              Please enter the email used when you placed the order.
            </p>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="lg:w-32 w-full lg:ml-auto bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform  hover:shadow-lg focus:outline-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </button>
          </div>

    
        </div>

   
      </div>


    </section>
  );
};

export default TrackOrderPage;