'use client'
import React, { useState } from 'react';
import { trackOrder } from '../services/api';

const TrackOrderPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orders, setOrders] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
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
    
    trackOrder(
      email,
      (response) => {
        setOrders(response.data || []);
        setShowResults(true);
        setIsLoading(false);
      },
      (error) => {
        setError(error || 'Unable to process your request. Please try again.');
        setIsLoading(false);
      }
    );
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
    if (success) setSuccess('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'awaiting_shipment':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <section className="min-h-screen bg-[#3333cb] lg:pt-40 lg:pb-12 flex items-center justify-center py-16 px-4">
      <div className="max-w-7xl w-full">
        {!showResults ? (
          <>
            <div className="text-center mb-12">
              <h1 className="main_heading font-splash text-white mb-8 leading-tight">
                <span className="text-yellow-400">TRACK</span>{' '}
                <span className="text-white">AN ORDER</span>
              </h1>
              
              <p className="main_description text-white max-w-4xl mx-auto">
                Stay joyfully informed. We've got you covered every step of the way with our 'Track 
                an Order' feature. Easily monitor the status and whereabouts of your delivery.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl max-w-4xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-black font-semibold sub_heading mb-4"
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
                      className={`w-full px-4 py-4 bg-gray-50 border rounded-xl text-black placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                        error ? 'border-red-300 focus:ring-red-300 focus:border-red-500' : 'border-gray-200'
                      }`}
                      disabled={isLoading}
                    />
                    
                    {error && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {error && (
                    <p className="mt-2 main_description text-red-600 opacity-0 animate-fadeIn">
                      {error}
                    </p>
                  )}
                </div>

                <p className="main_description text-black leading-relaxed">
                  Please enter the email used when you placed the order.
                </p>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="lg:w-40 w-full lg:ml-auto bg-[#8bc34a] cursor-pointer disabled:bg-gray-700 text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                    <span>Track Order</span>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Orders</h2>
              <p className="text-gray-600">Found {orders.length} order(s) for {email}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Total Amount</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Order Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-800">{order.order_id}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.order_status)}`}>
                          {formatStatus(order.order_status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">${order.total_amount}</td>
                      <td className="py-4 px-4 text-gray-600">{order.created_at}</td>
                      <td className="py-4 px-4 text-gray-600">{order.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  setEmail('');
                  setOrders([]);
                }}
                className="bg-[#8bc34a] text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-colors"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackOrderPage;