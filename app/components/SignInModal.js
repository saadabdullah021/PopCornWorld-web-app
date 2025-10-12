// components/SignInModal.jsx
"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP } from "../services/api";
import {
  setAuthLoading,
  setAuthError,
  setPhoneNumber,
  setOTPSent,
} from "../store/slices/appSlice";

const SignInModal = ({
  isOpen,
  onClose,
  onSendCode,
  phoneNumber,
  onPhoneChange,
  phoneError,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { authLoading, authError } = useSelector((state) => state.app);

  // ✅ Format function for (123) 456-7890
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/\D/g, ""); // remove non-numeric
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // ✅ Handle input change with formatting
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // only digits
    if (input.length <= 10) {
      const formatted = formatPhoneNumber(input);
      onPhoneChange({ target: { value: formatted } });
    }
  };

  // ✅ Send OTP with 10-digit validation
  const handleSendOTP = () => {
    const cleanedNumber = phoneNumber.replace(/\D/g, ""); // remove formatting

    if (!cleanedNumber.trim()) {
      dispatch(setAuthError("Please enter your phone number"));
      return;
    }

    if (cleanedNumber.length !== 10) {
      dispatch(setAuthError("Phone number must be exactly 10 digits"));
      return;
    }

    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    sendOTP(
      cleanedNumber,
      "signin",
      () => {
        dispatch(setPhoneNumber(cleanedNumber));
        dispatch(setOTPSent(true));
        dispatch(setAuthLoading(false));
        onSendCode && onSendCode();
      },
      () => {
        dispatch(setAuthError("Failed to send OTP. Please try again."));
        dispatch(setAuthLoading(false));
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-modal">
        <div className="flex items-start justify-between px-6 pt-6 border-b border-gray-100">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-5">
            Please sign in to continue
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-6">
            <p className="text-black font-splash text-2xl md:text-3xl text-center mt-3 lg:mt-6">
              Enter your mobile phone number
            </p>
            <p className="text-black main_description max-w-xs md:max-w-md mx-auto">
              You’ll receive a text message to verify your number. Standard
              messaging and data rates may apply.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-200 ${
                  phoneError || authError ? "border-red-500" : "border-gray-800"
                }`}
                maxLength={14} // includes () and -
              />
              {(phoneError || authError) && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  {phoneError || authError}
                </p>
              )}
            </div>

            <button
              onClick={handleSendOTP}
              disabled={authLoading || isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
                authLoading || isLoading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-[#8bc34a] active:scale-95"
              } text-white shadow-lg`}
            >
              {authLoading || isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#8BC34A] border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
