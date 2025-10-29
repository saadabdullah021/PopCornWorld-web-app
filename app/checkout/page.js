"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  X,
  ArrowLeft,
  Check,
  Lock,
  Shield,
  CreditCard,
  Truck,
  User,
  Mail,
  Phone,
  MapPin,
  Gift,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createOrder, sendOTP, verifyOTP } from "../services/api";
import { clearCart, addNotification, setError } from "../store/slices/appSlice";

const mockStates = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
  { value: "IL", label: "Illinois" },
  { value: "PA", label: "Pennsylvania" },
  { value: "OH", label: "Ohio" },
  { value: "GA", label: "Georgia" },
  { value: "NC", label: "North Carolina" },
  { value: "MI", label: "Michigan" },
];

// Enhanced Input Component with Icons
const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  placeholder,
  maxLength,
  icon: IconComponent,
}) => (
  <div className="mb-6">
    <label className="text-sm font-semibold text-black mb-2 flex items-center gap-2">
      {IconComponent && <IconComponent size={16} className="text-gray-500" />}
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border rounded-xl bg-white transition-all duration-300 placeholder-gray-600 focus:ring-0 outline-black focus:outline-1 text-black font-medium  ${error
          ? "border-red-400 focus:border-red-500  focus:ring-4 focus:ring-red-100"
          : "border-gray-200"
          } ${disabled
            ? "bg-gray-50 cursor-not-allowed border-gray-100 text-gray-500"
            : "hover:border-gray-300"
          }`}
      />
      {disabled && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <Check size={18} className="text-green-500" />
        </div>
      )}
    </div>
    {error && (
      <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const Dropdown = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  disabled = false,
  icon: IconComponent,
}) => (
  <div className="mb-6">
    <label className="text-sm font-semibold text-black mb-2 flex items-center gap-2">
      {IconComponent && <IconComponent size={16} className="text-gray-500" />}
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`w-full px-4 py-3.5 border rounded-xl bg-white transition-all duration-300 text-black font-medium shadow-sm focus:outline-1 outline-black focus:ring-0 hover:shadow-sm  ${error
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-gray-200 "
        } ${disabled
          ? "bg-gray-50 cursor-not-allowed border-gray-100 text-gray-500"
          : "hover:border-gray-300"
        }`}
    >
      <option value="" className="text-gray-400">
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-red-500 font-semibold text-sm mt-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const TextArea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  rows = 4,
  icon: IconComponent,
}) => (
  <div className="mb-6">
    <label className="text-sm font-semibold text-black mb-2 flex items-center gap-2">
      {IconComponent && <IconComponent size={16} className="text-gray-500" />}
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 border rounded-xl bg-white transition-all focus:outline-1 outline-black focus:ring-0 duration-300 placeholder-gray-400 text-black font-medium  resize-none ${error
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-gray-200 "
        }`}
    />
    {error && (
      <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const Checkbox = ({ checked, onChange, label, icon: IconComponent }) => (
  <div className="flex items-center mb-6">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer ${checked
          ? "bg-[#3333cb] border-[#3333cb]"
          : "border-gray-300 hover:border-blue-400"
          }`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <Check size={14} className="text-white absolute right-0.5 top-0.5" />
        )}
      </div>
    </div>
    <label
      className="ml-3 text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
      onClick={() => onChange(!checked)}
    >
      {IconComponent && <IconComponent size={14} className="text-gray-500" />}
      {label}
    </label>
  </div>
);

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  loading = false,
  size = "lg",
}) => {
  const baseClasses =
    "font-semibold rounded-full bg-[#8ac24a] transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-95 shadow-lg hover:shadow-xl";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const variantClasses = {
    primary:
      "bg-[#8ac24a] text-white disabled:from-blue-300 disabled:to-blue-400",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black disabled:from-gray-100 disabled:to-gray-200 border border-gray-300",
    outline:
      "border-2 border-[#3333cb] text-[#3333cb] hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]
        } ${className} ${disabled || loading
          ? "cursor-not-allowed opacity-60 transform-none"
          : ""
        }`}
    >
      {loading && (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#ffc222] border-b-transparent"></div>
      )}
      {children}
    </button>
  );
};

// Enhanced OTP Modal
const OTPModal = ({ isOpen, onClose, onVerify, loading, phone, onResend }) => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let interval;
    if (isOpen && !resendAvailable && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown <= 0) {
      setResendAvailable(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOpen, resendAvailable, countdown]);

  const handleResend = () => {
    onResend(() => {
      setCountdown(60);
      setResendAvailable(false);
      setOtpCode(["", "", "", "", ""]);
      setError("");
    });
  };

  const handleChange = (element, index) => {
    const val = element.value;
    if (isNaN(val)) return;
    const newCode = [...otpCode];
    newCode[index] = val;
    setOtpCode(newCode);

    if (val && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (otpCode[index] === "") {
        const prev = e.target.previousSibling;
        if (prev) prev.focus();
      } else {
        const newCode = [...otpCode];
        newCode[index] = "";
        setOtpCode(newCode);
      }
    }
  };

  const handleSubmit = () => {
    const code = otpCode.join("");
    if (code.length !== 5) {
      setError("Please enter complete OTP");
      return;
    }
    setVerifying(true);
    onVerify(code, (success, errorMsg) => {
      setVerifying(false);
      if (!success) setError(errorMsg || "Invalid OTP, please try again.");
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
              <Shield size={20} className="text-[#8BC34A]" />
            </div>
            <h3 className="text-xl font-bold text-black">Verify OTP</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          Enter the 5-digit verification code sent to your phone number
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {otpCode.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className="w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-xl font-bold transition-all duration-200 hover:border-gray-300"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm font-semibold text-center mb-6">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            size="md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={verifying}
            className="flex-1"
            size="md"
          >
            Verify Code
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Didn't receive the code?{" "}
          {!resendAvailable ? (
            <span className="text-gray-600">Resend in {countdown} seconds</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-[#3333cb] font-medium hover:underline"
            >
              Resend
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

const Breadcrumb = ({ steps, currentStep }) => (
  <div className="flex items-center gap-2 mb-8 py-4 overflow-x-auto hide-scrollbar">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center flex-shrink-0">
        <span
          className={`text-sm sm:text-base leading-7 font-medium uppercase tracking-wide whitespace-nowrap transition-all duration-300
              ${index === currentStep
              ? "text-gray-900"
              : index < currentStep
                ? "text-gray-500"
                : "text-gray-400"
            }`}
        >
          {step}
        </span>

        {index < steps.length - 1 && (
          <ChevronRight
            size={20}
            className={`mx-0 sm:mx-3 transition-all duration-300
                ${index < currentStep ? "text-gray-500" : "text-gray-400"}`}
          />
        )}
      </div>
    ))}
  </div>
);

// Enhanced Order Summary
const OrderSummary = ({ items, subtotal, tax, shipping, total }) => (
  <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-6 rounded-2xl shadow-xl border border-blue-100/50">
    <div className="flex items-center gap-3 mb-6">
      <h3 className="sub_heading font-bold text-black">Order Summary</h3>
    </div>

    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mb-6 border border-green-100">
      <p className="text-sm font-medium text-green-800 flex items-center gap-2">
        <Gift size={20} />
        Support kids while you shop — 50% of each purchase benefits the Popcorn
        World Kids Foundation.
      </p>
    </div>

    <div className="space-y-4 mb-6 overflow-y-auto h-[300px] hide-scrollbar">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={
                item.image &&
                  typeof item.image === "string" &&
                  !item.image.includes("/api/placeholder")
                  ? item.image
                  : item.images?.[0] &&
                    typeof item.images[0] === "string" &&
                    !item.images[0].includes("/api/placeholder")
                    ? item.images[0]
                    : "/pop_packet.png"
              }
              alt={item.name || item.title || "Product"}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/pop_packet.png";
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold leading-7 text-[16px] text-black">
                  {item.name || item.title}
                </h4>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="font-semibold leading-7 text-[16px] text-black">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs font-semibold leading-5 text-[#757575]">
                Qty: {item.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="space-y-3 text-sm bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-normal text-[16px]">Subtotal</span>
        <span className="text-[16px] font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-normal text-[16px]">Tax</span>
        <span className="text-[16px] font-medium">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-normal text-[16px] flex items-center gap-1">
          <Truck size={14} />
          Shipping
        </span>
        <span className="text-[16px] font-medium">${shipping.toFixed(2)}</span>
      </div>
      <div className="border-t-2 border-gray-100 pt-3 flex justify-between items-center">
        <span className="sub_heading font-bold text-black">Total</span>
        <span className="text-xl font-bold text-[#8BC34A]">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

// Enhanced Payment Modal
const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  onPaymentError,
  setFullScreenLoading,
  orderTotal,
  formData,
  cartItems,
  subtotal,
  tax,
  shipping,
  dispatch, // Added dispatch prop
}) => {
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    cardType: "",
    expiryDate: "",
    cvv: "",
    billingZip: "",
  });

  const [paymentErrors, setPaymentErrors] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const cardTypes = [
    { value: "Visa", label: "Visa" },
    { value: "Mastercard", label: "Mastercard" },
    { value: "American Express", label: "American Express" },
    { value: "Discover", label: "Discover" },
    { value: "JCB", label: "JCB" },
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const detectCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, "");
    if (/^4/.test(number)) return "Visa";
    if (/^5[1-5]/.test(number)) return "Mastercard";
    if (/^3[47]/.test(number)) return "American Express";
    if (/^6/.test(number)) return "Discover";
    if (/^35/.test(number)) return "JCB";
    return "";
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
      const detectedType = detectCardType(formattedValue);
      setPaymentData((prev) => ({
        ...prev,
        cardNumber: formattedValue,
        cardType: detectedType,
      }));
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
      setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
      setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "cardName") {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, "");
      setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
    }

    if (paymentErrors[name]) {
      setPaymentErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePayment = () => {
    const errors = {};

    if (!paymentData.cardName.trim()) {
      errors.cardName = "Cardholder name is required";
    }

    const cardNumber = paymentData.cardNumber.replace(/\s/g, "");
    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      errors.cardNumber = "Invalid card number length";
    }

    if (!paymentData.cardType) {
      errors.cardType = "Card type is required";
    }

    const expiry = paymentData.expiryDate.replace(/\D/g, "");
    if (!expiry || expiry.length !== 4) {
      errors.expiryDate = "Invalid expiry date (MM/YY)";
    } else {
      const month = parseInt(expiry.substring(0, 2));
      const year = parseInt("20" + expiry.substring(2, 4));
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if (month < 1 || month > 12) {
        errors.expiryDate = "Invalid month";
      } else if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        errors.expiryDate = "Card has expired";
      }
    }

    if (!paymentData.cvv) {
      errors.cvv = "Security code is required";
    } else if (paymentData.cvv.length !== 3) {
      errors.cvv = "CVV must be exactly 3 digits";
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = async () => {
    if (!validatePayment()) return;

    setPaymentLoading(true);
    setFullScreenLoading(true);

    try {
      const orderData = {
        cardNumber: paymentData.cardNumber.replace(/\s/g, ""),
        cardExpiration: paymentData.expiryDate,
        cardSecurityCode: paymentData.cvv,
        cardType: paymentData.cardType,
        cardName: paymentData.cardName,

        email: formData.email,
        name: formData?.name,
        phone_number: formData.phone.replace(/\D/g, ""),
        products: cartItems.map((item) => ({
          id: item.id.toString(),
          price: item.price.toString(),
          quantity: item.quantity.toString(),
          type: item.type || "product",
          link_code: item.link_code || "",
        })),

        shipping_first_name: formData.shippingFirstName,
        shipping_last_name: formData.shippingLastName,
        shipping_address: formData.shippingAddress,
        shipping_city: formData.shippingCity,
        shipping_state: formData.shippingState,
        shipping_zipcode: formData.shippingZip,
        shipping_apartment: formData.shippingApartment || "",

        billing_first_name: formData.billingIsSame
          ? formData.shippingFirstName
          : formData.billingFirstName,
        billing_last_name: formData.billingIsSame
          ? formData.shippingLastName
          : formData.billingLastName,
        billing_address: formData.billingIsSame
          ? formData.shippingAddress
          : formData.billingAddress,
        billing_city: formData.billingIsSame
          ? formData.shippingCity
          : formData.billingCity,
        billing_state: formData.billingIsSame
          ? formData.shippingState
          : formData.billingState,
        billing_zipcode: formData.billingIsSame
          ? formData.shippingZip
          : formData.billingZip,
        link_code: cartItems[0]?.link_code || "",

        tax: tax.toFixed(2),
        shipping_charges: shipping.toFixed(2),
        total_amount: orderTotal.toFixed(2),
      };
      createOrder(
        orderData,
        (response) => {
          setPaymentLoading(false);
          setFullScreenLoading(false);
          dispatch(clearCart());

          dispatch(
            addNotification({
              message:
                response?.data?.message ||
                "Payment successful! Your order has been placed and you will receive a confirmation email shortly.",
              type: "success",
            })
          );

          // Extract and clean order ID
          let rawOrderId =
            response?.data?.order_id ||
            response?.order_id ||
            "txn_" + Math.random().toString(36).substr(2, 9);

          // Remove '#' if present
          const cleanOrderId = rawOrderId.replace(/^#/, "");

          onPaymentSuccess({
            success: true,
            transactionId: cleanOrderId,
            amount: orderTotal,
            orderData: response?.data || response,
          });

          onClose();
        },
        (error) => {
          setPaymentLoading(false);
          setFullScreenLoading(false);
          const errorMsg =
            error?.response?.data?.message ||
            error?.message ||
            "Payment processing failed. Please try again.";
          setPaymentErrors({ general: errorMsg });
          dispatch(addNotification({ message: errorMsg, type: "error" }));
          if (onPaymentError) onPaymentError();
        }
      );



      // Mock success
      setPaymentLoading(false);
      setFullScreenLoading(false);
      dispatch(clearCart());
      dispatch(
        addNotification({
          message:
            "Payment successful! Your order has been placed and you will receive a confirmation email shortly.",
          type: "success",
        })
      );
      onPaymentSuccess({
        success: true,
        transactionId: response?.data?.order_id || response?.data?.order_number ||
          "txn_" + Math.random().toString(36).substr(2, 9),
        amount: orderTotal,
        orderData: mockResponse?.data,
      });
      onClose();
    } catch (error) {
      setPaymentLoading(false);
      setFullScreenLoading(false);
      setPaymentErrors({
        general: "Payment processing failed. Please try again.",
      });
      if (onPaymentError) onPaymentError();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full hide-scrollbar max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-200 bg-[#3333cb] text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="sub_heading font-bold">Secure Payment</h2>
                <p className="text-blue-100 text-sm">
                  Complete your order safely
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total Amount</span>
              <span className="text-3xl font-bold text-[#3333cb]">
                ${orderTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Cardholder Name*"
              name="cardName"
              value={paymentData.cardName}
              onChange={handlePaymentInputChange}
              onFocus={() => setFocusedField("cardName")}
              error={paymentErrors.cardName}
              placeholder="John Doe"
              icon={User}
            />

            <div className="relative">
              <Input
                label="Card Number*"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handlePaymentInputChange}
                onFocus={() => setFocusedField("cardNumber")}
                error={paymentErrors.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                icon={CreditCard}
              />
              {paymentData.cardType && (
                <div className="absolute right-4 top-10 flex items-center">
                  <span className="text-xs font-bold text-[#3333cb] bg-blue-100 px-3 py-1 rounded-full">
                    {paymentData.cardType}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Dropdown
                label="Card Type*"
                name="cardType"
                value={paymentData.cardType}
                onChange={handlePaymentInputChange}
                options={cardTypes}
                error={paymentErrors.cardType}
              />

              <Input
                label="Expiry Date*"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handlePaymentInputChange}
                onFocus={() => setFocusedField("expiryDate")}
                error={paymentErrors.expiryDate}
                placeholder="MM/YY"
                maxLength={5}
              />

              <Input
                label="CVV* (3 digits)"
                name="cvv"
                value={paymentData.cvv}
                onChange={handlePaymentInputChange}
                onFocus={() => setFocusedField("cvv")}
                error={paymentErrors.cvv}
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>

          {paymentErrors.general && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm font-medium">
                {paymentErrors.general}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/50">
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={paymentLoading}
              size="md"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePaymentSubmit}
              loading={paymentLoading}
              className="flex-1 bg-[#8ac24a]"
              size="md"
            >
              {paymentLoading
                ? "Processing Payment..."
                : `Pay ${orderTotal.toFixed(2)}`}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <Lock size={12} />
            <span>Powered by industry-leading security standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Checkout Component
const CheckoutPageInner = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart, globalSettings } = useSelector((state) => state.app);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const params = useSearchParams();
  const [otpVerifying, setOtpVerifying] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otpVerified: false,
    shippingFirstName: "",
    shippingLastName: "",
    shippingAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    billingIsSame: true,
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    isGift: false,
    giftNote: "",
  });

  const cartItems = cart || [];
  const campaignInfo = cartItems[0]?.campaign_info;

  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     router.push("/shop");
  //   }
  // }, [cartItems.length, router]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 pt-32 lg:pt-40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8BC34A] border-b-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const getConfigValue = (key, defaultValue) => {
    if (!globalSettings || !Array.isArray(globalSettings)) return defaultValue;
    const config = globalSettings.find((item) => item.config_key === key);
    return config ? parseFloat(config.config_value) : defaultValue;
  };

  const taxRate = getConfigValue("product_tax", 7);
  const tax = subtotal * (taxRate / 100);
  const shipping = getConfigValue("shipping_charges", 15);
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Updated validatePhone function
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) return false;
    if (cleaned.startsWith("0") || cleaned.startsWith("1")) return false;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(
      6,
      10
    )}`;
  };

  const handlePhoneChange = (e) => {
    let numbers = e.target.value.replace(/\D/g, "");
    if (numbers.length > 10) numbers = numbers.slice(0, 10);
    if (numbers.startsWith("0") || numbers.startsWith("1")) {
      // Optionally prevent update or show error; here we'll just format what's allowed
      numbers = numbers.replace(/^0|1/g, "");
    }
    let formatted = "";
    if (numbers.length > 0) formatted += numbers.slice(0, 3);
    if (numbers.length >= 4) formatted += "-" + numbers.slice(3, 6);
    if (numbers.length >= 7) formatted += "-" + numbers.slice(6, 10);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (formData.phone && !validatePhone(formData.phone)) {
        newErrors.phone = "Invalid phone number. It must be 10 digits in the format xxx-xxx-xxxx.";
      }
    }

    if (step === 1) {
      if (!formData.shippingFirstName)
        newErrors.shippingFirstName = "First name is required";
      if (!formData.shippingLastName)
        newErrors.shippingLastName = "Last name is required";
      if (!formData.shippingAddress)
        newErrors.shippingAddress = "Address is required";
      if (!formData.shippingCity) newErrors.shippingCity = "City is required";
      if (!formData.shippingState)
        newErrors.shippingState = "State is required";
      if (!formData.shippingZip) newErrors.shippingZip = "Zip code is required";

      if (!formData.billingIsSame) {
        if (!formData.billingFirstName)
          newErrors.billingFirstName = "First name is required";
        if (!formData.billingLastName)
          newErrors.billingLastName = "Last name is required";
        if (!formData.billingAddress)
          newErrors.billingAddress = "Address is required";
        if (!formData.billingCity) newErrors.billingCity = "City is required";
        if (!formData.billingState)
          newErrors.billingState = "State is required";
        if (!formData.billingZip) newErrors.billingZip = "Zip code is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = (callback) => {
    if (!validateStep(0)) return;

    setLoading(true);

    sendOTP(
      formData.phone.replace(/\D/g, ""),
      "order",
      (response) => {
        setLoading(false);
        const apiMessage = response?.data?.message || response?.message || response?.msg || "OTP sent successfully to your phone number";
        if (!showOTPModal) setShowOTPModal(true);
        dispatch(
          addNotification({
            message: apiMessage,
            type: "success",
          })
        );
        if (callback) callback();
      },
      (error) => {
        setLoading(false);
        const errorMsg = error?.response?.data?.message || error?.response?.data?.error || error?.message || error?.error || error || "Failed to send OTP. Please try again.";
        dispatch(
          addNotification({
            message: errorMsg,
            type: "error",
          })
        );
      }
    );
  };

  const handleVerifyPhone = () => {
    handleSendOTP();
  };

  const handleOTPVerify = (otpCode, callback) => {
    setOtpVerifying(true);
    verifyOTP(
      formData.phone.replace(/\D/g, ""),
      otpCode,
      "order",
      (res) => {
        setOtpVerifying(false);
        const apiMessage = res?.data?.message || res?.message || res?.msg || "Phone verified!";
        setShowOTPModal(false);
        setFormData((prev) => ({ ...prev, otpVerified: true }));
        setCurrentStep(1);
        dispatch(
          addNotification({ message: apiMessage, type: "success" })
        );
        callback(true);
      },
      (err) => {
        setOtpVerifying(false);
        const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || err?.error || err || "Invalid OTP";
        dispatch(addNotification({ message: msg, type: "error" }));
        callback(false, msg);
      }
    );
  };

  const handleContinueToPayment = () => {
    if (validateStep(1)) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (paymentResult) => {
    // Note: clearCart and notification moved to modal for direct access to dispatch
    router.push(`/order-success?order=${paymentResult.transactionId}`);
  };

  const handlePaymentError = () => {
    setFullScreenLoading(false);
    dispatch(
      addNotification({
        message: "Payment failed. Please try again.",
        type: "error",
      })
    );
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setFullScreenLoading(false);
    dispatch(
      addNotification({
        message: "Payment was cancelled. Please try again.",
        type: "error",
      })
    );
  };

  const handleBackToCampaign = () => {
    router.push(`/campaigns/${params.slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 pt-32 lg:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {campaignInfo && (
          <div
            className="pt-4 w-full max-w-[300px] lg:w-auto lg:max-w-[300px] mr-auto mb-6 cursor-pointer"
            onClick={handleBackToCampaign}
          >
            <div className="bg-white rounded-2xl border border-[#d6d6d6] hover:border-transparent px-4 py-2">
              <div className="flex items-center gap-4">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-1 border-gray-200">
                  <Image
                    src={
                      campaignInfo.campaign_thumbnail?.startsWith("uploads")
                        ? `https://onebigmediacompany.online/${campaignInfo.campaign_thumbnail}`
                        : campaignInfo.campaign_thumbnail || "/pop_packet.png"
                    }
                    alt={campaignInfo.campaign_name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/pop_packet.png")}
                    fill
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-normal text-[#757575] leading-5 mb-0.5">
                    You're supporting
                  </p>
                  <h2 className="text-[16px] font-medium leading-7 text-[#323232] truncate">
                    {campaignInfo.campaign_name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div>
                  <h1 className="sub_heading font-bold text-black">Checkout</h1>
                  <p className="text-gray-600">Complete your secure purchase</p>
                </div>
              </div>

              <Breadcrumb
                steps={["INFORMATION", "PAYMENT METHOD"]}
                currentStep={currentStep}
              />

              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-semibold text-black">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name*"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    disabled={formData.otpVerified}
                    placeholder="Enter your full name"
                    icon={User}
                  />
                  <Input
                    label="Email Address*"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    disabled={formData.otpVerified}
                    placeholder="your.email@example.com"
                    icon={Mail}
                  />
                </div>
                <Input
                  label="Phone Number*"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  error={errors.phone}
                  placeholder="xxx-xxx-xxxx"
                  disabled={formData.otpVerified}
                  icon={Phone}
                />

                {!formData.otpVerified && (
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleVerifyPhone}
                      loading={loading}
                      size="md"
                    >
                      <Shield size={18} />
                      Verify Phone Number
                    </Button>
                  </div>
                )}
              </div>

              {formData.otpVerified && (
                <>
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-xl font-bold text-black">
                        Shipping Address
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Input
                        label="First Name*"
                        name="shippingFirstName"
                        value={formData.shippingFirstName}
                        onChange={handleInputChange}
                        error={errors.shippingFirstName}
                        placeholder="First name"
                        icon={User}
                      />
                      <Input
                        label="Last Name*"
                        name="shippingLastName"
                        value={formData.shippingLastName}
                        onChange={handleInputChange}
                        error={errors.shippingLastName}
                        placeholder="Last name"
                        icon={User}
                      />
                    </div>
                    <Input
                      label="Street Address*"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      error={errors.shippingAddress}
                      placeholder="123 Main Street"
                      icon={MapPin}
                    />
                    <Input
                      label="Apartment / Suite / Unit"
                      name="shippingApartment"
                      value={formData.shippingApartment}
                      onChange={handleInputChange}
                      placeholder="Apt 4B (optional)"
                    />
                    <Input
                      label="City*"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      error={errors.shippingCity}
                      placeholder="City"
                      icon={MapPin}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Dropdown
                        label="State*"
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleInputChange}
                        options={mockStates}
                        error={errors.shippingState}
                        icon={MapPin}
                      />
                      <Input
                        label="Zip Code*"
                        name="shippingZip"
                        value={formData.shippingZip}
                        onChange={handleInputChange}
                        error={errors.shippingZip}
                        maxLength={10}
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-xl font-bold text-black">
                        Billing Address
                      </h2>
                    </div>

                    <Checkbox
                      checked={formData.billingIsSame}
                      onChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingIsSame: checked,
                        }))
                      }
                      label="Same as Shipping Address"
                    />

                    {!formData.billingIsSame && (
                      <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <Input
                            label="First Name*"
                            name="billingFirstName"
                            value={formData.billingFirstName}
                            onChange={handleInputChange}
                            error={errors.billingFirstName}
                            placeholder="First name"
                            icon={User}
                          />
                          <Input
                            label="Last Name*"
                            name="billingLastName"
                            value={formData.billingLastName}
                            onChange={handleInputChange}
                            error={errors.billingLastName}
                            placeholder="Last name"
                            icon={User}
                          />
                        </div>
                        <Input
                          label="Street Address*"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          error={errors.billingAddress}
                          placeholder="123 Main Street"
                          icon={MapPin}
                        />
                        <Input
                          label="Apartment / Suite / Unit"
                          name="billingApartment"
                          value={formData.billingApartment}
                          onChange={handleInputChange}
                          placeholder="Apt 4B (optional)"
                        />
                        <Input
                          label="City*"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                          error={errors.billingCity}
                          placeholder="City"
                          icon={MapPin}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Dropdown
                            label="State*"
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleInputChange}
                            options={mockStates}
                            error={errors.billingState}
                            icon={MapPin}
                          />
                          <Input
                            label="Zip Code*"
                            name="billingZip"
                            value={formData.billingZip}
                            onChange={handleInputChange}
                            error={errors.billingZip}
                            maxLength={10}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-xl font-bold text-black">
                        Gift Options
                      </h2>
                    </div>

                    <Checkbox
                      checked={formData.isGift}
                      onChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isGift: checked }))
                      }
                      label="This order is a gift"
                    />

                    {formData.isGift && (
                      <div className="mt-6">
                        <TextArea
                          label="Gift Message"
                          name="giftNote"
                          value={formData.giftNote}
                          onChange={handleInputChange}
                          placeholder="Write your heartfelt message here..."
                          rows={4}
                          icon={Gift}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleContinueToPayment} size="lg">
                      <Lock size={20} />
                      Continue to Secure Payment
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:col-span-2">
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentModalClose}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        setFullScreenLoading={setFullScreenLoading}
        orderTotal={total}
        formData={formData}
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        dispatch={dispatch} // Pass dispatch
      />

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerify}
        loading={otpVerifying}
        phone={formData.phone}
        onResend={handleSendOTP}
      />

      {fullScreenLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8BC34A] border-b-transparent mb-4" />
          <p className="text-gray-700 font-semibold">
            Processing your payment…
          </p>
        </div>
      )}
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 pt-32 lg:pt-40 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8BC34A] border-b-transparent mx-auto mb-4"></div><p className="text-gray-600 font-semibold">Loading...</p></div>}>
      <CheckoutPageInner />
    </Suspense>
  );
};

export default CheckoutPage;