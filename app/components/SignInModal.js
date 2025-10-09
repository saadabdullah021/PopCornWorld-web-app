// components/SignInModal.jsx
"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '../services/api';
import { setAuthLoading, setAuthError, setPhoneNumber, setOTPSent } from '../store/slices/appSlice';

const SignInModal = ({ 
  isOpen, 
  onClose, 
  onSendCode, 
  phoneNumber, 
  onPhoneChange, 
  phoneError, 
  isLoading 
}) => {
  const dispatch = useDispatch();
  const { authLoading, authError } = useSelector(state => state.app);

  const handleSendOTP = () => {
    if (!phoneNumber.trim()) {
      dispatch(setAuthError('Please enter your phone number'));
      return;
    }

    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    sendOTP(
      phoneNumber,
      'signin', // OTP type for signin
      (response) => {
        // Success
        dispatch(setPhoneNumber(phoneNumber));
        dispatch(setOTPSent(true));
        dispatch(setAuthLoading(false));
        onSendCode && onSendCode();
      },
      () => {
        // Fail
        dispatch(setAuthError('Failed to send OTP. Please try again.'));
        dispatch(setAuthLoading(false));
      }
    );
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-modal">
        <div className="flex items-center justify-between px-6 pt-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Sign in to access your account</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-6">
            <p className="text-black font-splash text-xl md:text-3xl  text-center mt-3 lg:mt-6">
              Enter your mobile phone number
            </p>
            <p className="text-black main_description max-w-xs md:max-w-md mx-auto">
              We’ll text you to confirm your number. Standard message and data rates apply.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={onPhoneChange}
                placeholder="(555) 123-4567-8"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-200 ${
                  phoneError ? 'border-red-500' : 'border-gray-800'
                }`}
                maxLength={16}
              />
              {(phoneError || authError) && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {phoneError || authError}
                </p>
              )}
            </div>

            <button
              onClick={handleSendOTP}
              disabled={authLoading || isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
                (authLoading || isLoading)
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-[#8bc34a] active:scale-95'
              } text-white shadow-lg`}
            >
              {(authLoading || isLoading) ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#ffc222] border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default SignInModal;