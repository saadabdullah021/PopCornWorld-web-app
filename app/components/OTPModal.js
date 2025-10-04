// components/OTPModal.jsx
"use client";
import { useState, useEffect } from "react";
import { FaTimes, FaRedo, FaCheck, FaShieldAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../services/api';
import { setAuthLoading, setAuthError, loginSuccess } from '../store/slices/appSlice';

const OTPModal = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  onResend, 
  phoneNumber, 
  otp, 
  onOtpChange, 
  onOtpKeyDown, 
  otpError, 
  isLoading,
  otpRefs 
}) => {
  const dispatch = useDispatch();
  const { authLoading, authError, phoneNumber: storedPhone } = useSelector(state => state.app);

  const handleVerifyOTP = () => {
    const otpCode = otp.join('');
    if (!otpCode || otpCode.length !== 5) {
      dispatch(setAuthError('Please enter the complete OTP'));
      return;
    }

    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    verifyOTP(
      storedPhone || phoneNumber,
      otpCode,
      'signin', // OTP type for signin
      (response) => {
        // Success
        dispatch(loginSuccess({ phone: storedPhone || phoneNumber }));
        dispatch(setAuthLoading(false));
        onVerify && onVerify();
        onClose();
      },
      () => {
        // Fail
        dispatch(setAuthError('Invalid OTP. Please try again.'));
        dispatch(setAuthLoading(false));
      }
    );
  };
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Reset timer and focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(300);
      setCanResend(false);
      // Focus first input after a small delay
      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen, otpRefs]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(300);
    setCanResend(false);
  };

  if (!isOpen) return null;

  return (


   
    <div className="fixed inset-0 flex items-center justify-center z-[70] ">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-modal p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-[#3333cb] text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">Verify OTP</h3>
              <p className="text-sm text-gray-600">Secure verification</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 text-center text-sm leading-relaxed">
          Enter the 5-digit verification code sent to 
          <br />
          <span className="font-semibold text-black">{phoneNumber}</span>
        </p>
        
        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) => onOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => onOtpKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              className={`
               w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-xl font-bold  transition-all duration-200 hover:border-gray-300
              `}
              autoComplete="one-time-code"
            />
          ))}
        </div>
        
        {/* Error Message */}
        {(otpError || authError) && (
          <div className="flex items-center justify-center gap-2 text-red-500 text-sm mb-6 bg-red-50 p-3 rounded-lg border border-red-200">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{otpError || authError}</span>
          </div>
        )}

        {/* Timer */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 px-4 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Code expires in {formatTime(timeLeft)}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleVerifyOTP}
            disabled={authLoading || isLoading || otp.join('').length !== 5}
            className={`
              flex-1 py-3 px-4 font-medium rounded-full transition-all duration-200 active:scale-95
              ${(authLoading || isLoading) || otp.join('').length !== 5
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-[#8bc34a]  text-white shadow-lg hover:shadow-xl'
              }
            `}
          >
            {(authLoading || isLoading) ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaCheck className="text-sm" />
                <span>Verify Code</span>
              </div>
            )}
          </button>
        </div>
        
        {/* Resend Code */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              disabled={!canResend || isLoading}
              className={`
                font-medium transition-all duration-200
                ${!canResend || isLoading
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-[#3333cb] hover:text-[#2a2ab3] hover:underline'
                }
              `}
            >
              {canResend ? (
                <span className="flex items-center justify-center gap-1">
                  <FaRedo className="text-xs" />
                  Resend Code
                </span>
              ) : (
                `Resend available in ${formatTime(timeLeft)}`
              )}
            </button>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center">
            🔒 This code helps keep your account secure. Never share it with anyone.
          </p>
        </div>
      </div>
      

    </div>
  );
};

export default OTPModal;