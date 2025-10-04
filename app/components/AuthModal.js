'use client'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, verifyOTP } from '../services/api';
import { setAuthLoading, setAuthError, setPhoneNumber, setOTPSent, loginSuccess } from '../store/slices/appSlice';

const AuthModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { authLoading, authError, phoneNumber, otpSent } = useSelector(state => state.app);
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'

  const handleSendOTP = () => {
    if (!phone.trim()) {
      dispatch(setAuthError('Please enter your phone number'));
      return;
    }

    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    sendOTP(
      phone,
      'signin', // OTP type for signin
      (response) => {
        // Success
        dispatch(setPhoneNumber(phone));
        dispatch(setOTPSent(true));
        setStep('otp');
        dispatch(setAuthLoading(false));
      },
      () => {
        // Fail
        dispatch(setAuthError('Failed to send OTP. Please try again.'));
        dispatch(setAuthLoading(false));
      }
    );
  };

  const handleVerifyOTP = () => {
    if (!otp.trim()) {
      dispatch(setAuthError('Please enter the OTP'));
      return;
    }

    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    verifyOTP(
      phoneNumber,
      otp,
      'signin', // OTP type for signin
      (response) => {
        // Success
        dispatch(loginSuccess({ phone: phoneNumber }));
        dispatch(setAuthLoading(false));
        onClose();
        // Reset form
        setPhone('');
        setOtp('');
        setStep('phone');
      },
      () => {
        // Fail
        dispatch(setAuthError('Invalid OTP. Please try again.'));
        dispatch(setAuthLoading(false));
      }
    );
  };

  const handleBack = () => {
    setStep('phone');
    setOtp('');
    dispatch(setAuthError(null));
  };

  const handleClose = () => {
    setPhone('');
    setOtp('');
    setStep('phone');
    dispatch(setAuthError(null));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {step === 'phone' ? 'Sign In' : 'Verify OTP'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 'phone' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8bc34a] focus:border-transparent outline-none"
                disabled={authLoading}
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{authError}</p>
              </div>
            )}

            <button
              onClick={handleSendOTP}
              disabled={authLoading}
              className="w-full bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#7ab33a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8bc34a] focus:border-transparent outline-none text-center text-lg tracking-widest"
                disabled={authLoading}
              />
              <p className="text-sm text-gray-500 mt-2">
                OTP sent to {phoneNumber}
              </p>
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{authError}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                disabled={authLoading}
                className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleVerifyOTP}
                disabled={authLoading}
                className="flex-1 bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#7ab33a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
