"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { HeaderShoppingCart, ShoppingCartIcon } from './HeaderShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/slices/appSlice';
// ✅ React Icons
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaAngleDown,
    FaArrowRight,
    FaBars,
    FaTimes,
    FaPhone,
    FaUser,
    FaShoppingBag,
    FaSignOutAlt,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import logo from '../../public/fundraiserLogo.webp'

import Image from "next/image";
import { usePathname } from "next/navigation";
import SignInModal from "./SignInModal";
import OTPModal from "./OTPModal";

const Header = () => {
    const dispatch = useDispatch();
    const [sticky, setSticky] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const timeoutRef = useRef(null);
    const pathname = usePathname();
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Get cart count and auth state from Redux
    const { cart, isAuthenticated, customerInfo } = useSelector(state => state.app);
    const cartItemCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

    // Sign-in related states
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');

    const otpRefs = useRef([]);
    const profileDropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 80) {
                setSticky(true);
                setScrolled(true);
            } else {
                setSticky(false);
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? "" : menu);
    };

    const handleMouseEnter = (menu) => {
        clearTimeout(timeoutRef.current);
        setOpenDesktopMenu(menu);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDesktopMenu(null);
        }, 300);
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setActiveDropdown("");
    };

    // Phone number validation for 11-digit numbers
    const validateUSPhone = (phone) => {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        return cleanPhone.length === 11;
    };

    // Format phone number as user types
    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        if (phoneNumberLength < 10) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        }
        if (phoneNumberLength < 11) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}-${phoneNumber.slice(10, 11)}`;
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneNumber(formatted);
        if (phoneError) setPhoneError('');
    };

    const handleSignInClick = () => {
        setShowSignInModal(true);
        setPhoneNumber('');
        setPhoneError('');
    };

    const handleSendVerificationCode = () => {
        if (!phoneNumber.trim()) {
            setPhoneError('Phone number is required');
            return;
        }

        if (!validateUSPhone(phoneNumber)) {
            setPhoneError('Please enter a valid 11-digit phone number');
            return;
        }

        setIsLoading(true);

        // Generate random 5-digit OTP
        const newOTP = Math.floor(10000 + Math.random() * 90000).toString();
        setGeneratedOTP(newOTP);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setShowSignInModal(false);
            setShowOTPModal(true);
            setOtp(['', '', '', '', '']);
            setOtpError('');
            // Focus first OTP input when modal opens
            setTimeout(() => {
                if (otpRefs.current[0]) {
                    otpRefs.current[0].focus();
                }
            }, 100);
            // In real app, you would send SMS here
            console.log(`OTP sent to ${phoneNumber}: ${newOTP}`);
        }, 1500);
    };

    const handleOtpChange = (index, value) => {
        // Only allow single digit numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (otpError) setOtpError('');

        // Auto-focus next input when a digit is entered
        if (value && index < 4) {
            setTimeout(() => {
                otpRefs.current[index + 1]?.focus();
            }, 10);
        }
    };

    const handleOtpKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // If current field is empty, move to previous field
                setTimeout(() => {
                    otpRefs.current[index - 1]?.focus();
                }, 10);
            }
        }

        // Handle arrow keys for navigation
        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            setTimeout(() => {
                otpRefs.current[index - 1]?.focus();
            }, 10);
        }

        if (e.key === 'ArrowRight' && index < 4) {
            e.preventDefault();
            setTimeout(() => {
                otpRefs.current[index + 1]?.focus();
            }, 10);
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join('');

        if (enteredOTP.length !== 5) {
            setOtpError('Please enter complete 5-digit code');
            return;
        }

        if (enteredOTP !== generatedOTP) {
            setOtpError('Invalid verification code');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowOTPModal(false);
            
            // Mock successful login response - replace with actual API call
            const mockResponse = {
                access_token: "14|gOlAYJ8zbYrHt0rQvdFdJS2c5GVcjzM1rEin22CR10184077",
                customer_info: {
                    id: 3,
                    name: null,
                    email: "mubeenhussain8@gmail.com",
                    customer_id: "17596739",
                    phone_no: phoneNumber.replace(/\D/g, ''),
                    email_verified_at: null,
                    role: "customer",
                    profile_img: null,
                    status: "1",
                    created_at: "2025-10-05T14:18:29.000000Z",
                    updated_at: "2025-10-05T14:18:29.000000Z"
                }
            };
            
            // Dispatch login success to Redux
            dispatch(loginSuccess(mockResponse));
            
            // Reset all states
            setPhoneNumber('');
            setOtp(['', '', '', '', '']);
            setGeneratedOTP('');
        }, 1000);
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowProfileDropdown(false);
        setPhoneNumber('');
        setOtp(['', '', '', '', '']);
        setGeneratedOTP('');
    };

    const closeModals = () => {
        setShowSignInModal(false);
        setShowOTPModal(false);
        setPhoneError('');
        setOtpError('');
        setPhoneNumber('');
        setOtp(['', '', '', '', '']);
    };

    return (
        <>
            {/* Mobile Menu Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Modal Backdrop */}
            {(showSignInModal || showOTPModal) && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-all duration-300"
                    onClick={closeModals}
                />
            )}

            <header
                className={`w-full z-50 transition-all duration-500 ease-in-out
                    fixed top-0 left-0 bg-white/90 shadow-md`}
            >
                {/* === Enhanced Topbar === */}
                <div className={`hidden lg:block bg-black text-white transition-all duration-300 ease-in-out py-4`}>
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-center font-light text-xs">
                            <div className="flex space-x-8">
                                <a
                                    href="tel:219-427-1806"
                                    className="group flex items-center hover:text-[#ffc222] transition-all duration-300"
                                >
                                    <FaPhone className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                             219-427-1806
                                </a>

                                <a
                                    href="mailto:orders@doingtheworldaflavor.com"
                                    className="group flex items-center hover:text-[#ffc222] transition-all duration-300"
                                >
                                    <FaEnvelope className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    orders@doingtheworldaflavor.com
                                </a>

                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center hover:text-[#ffc222] transition-all duration-300"
                                >
                                    <FaMapMarkerAlt className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                               2560 Garfield St Suite 3, Gary, IN 46404
                                </a>
                            </div>

                            <div className="flex items-center space-x-4">
                                {!isAuthenticated && (
                                <Link href='/track-an-order' className="text-sm font-semibold cursor-pointer hover:text-[#ffc222] text-white mr-3">
                                    Track Order
                                </Link>
                                )}

                                {/* Sign In / Profile Section */}
                                {isAuthenticated ? (
                                    <div className="relative" ref={profileDropdownRef}>
                                        <button
                                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                            onMouseEnter={() => setShowProfileDropdown(true)}
                                            className="flex items-center justify-center w-8 h-8 bg-[#8BC34A] rounded-full hover:bg-[#7CB342] transition-all duration-300 transform"
                                        >
                                            <FaUser className="text-white text-sm" />
                                        </button>

                                        {/* Profile Dropdown */}
                                        {showProfileDropdown && (
                                            <div
                                                className="absolute right-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 transform animate-dropdown"
                                                onMouseLeave={() => setShowProfileDropdown(false)}
                                                style={{
                                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)'
                                                }}
                                            >

                                                <div className="py-2">
                                                    {/* Profile */}
                                                    <Link
                                                        href="/profile"
                                                        className="group flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:bg-white/50 hover:shadow-sm mx-2 rounded-xl"
                                                        onClick={() => setShowProfileDropdown(false)}
                                                    >
                                                        <div className="relative p-2 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors duration-300 mr-3">
                                                            <FaUser className="text-blue-600 group-hover:text-white transition-colors duration-300 text-sm" />
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold block">My Profile</span>
                                                            <span className="text-xs text-gray-500 group-hover:text-gray-600">
                                                                {customerInfo?.name || customerInfo?.email || 'Personal settings'}
                                                            </span>
                                                        </div>

                                                    </Link>

                                                    {/* Orders */}
                                                    <Link
                                                        href="/orders"
                                                        className="group flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:bg-white/50 hover:shadow-sm mx-2 rounded-xl"
                                                        onClick={() => setShowProfileDropdown(false)}
                                                    >
                                                        <div className="relative p-2 bg-green-100 rounded-lg group-hover:bg-green-500 transition-colors duration-300 mr-3">
                                                            <FaShoppingBag className="text-green-600 group-hover:text-white transition-colors duration-300 text-sm" />
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold block">My Orders</span>
                                                            <span className="text-xs text-gray-500 group-hover:text-gray-600">Order history</span>
                                                        </div>

                                                    </Link>



                                                    {/* Logout */}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="group inline-flex  w-[94%]  items-center pl-4 pr-8 py-3 text-gray-700 hover:text-red-700 transition-all duration-300 hover:bg-red-50/50 hover:shadow-sm mx-2 rounded-xl"
                                                    >
                                                        <div className="relative p-2 bg-red-100 rounded-lg group-hover:bg-red-500 transition-colors duration-300 mr-3">
                                                            <FaSignOutAlt className="text-red-600 group-hover:text-white transition-colors duration-300 text-sm" />
                                                        </div>
                                                        <div className="flex flex-col items-start">
                                                            <span className="font-semibold block">Logout</span>
                                                            <span className="text-xs text-gray-500 group-hover:text-red-600">Sign out safely</span>
                                                        </div>

                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleSignInClick}
                                        className="text-sm font-semibold bg-gray-200 px-3 py-1 outline-none ring-none rounded-full text-black cursor-pointer mr-3 hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Sign In
                                    </button>
                                )}

                                <ShoppingCartIcon
                                    itemCount={cartItemCount}
                                    onClick={() => setIsCartOpen(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === Enhanced Navbar === */}
                <div className={`w-full transition-all duration-300 bg-[#3333cb] text-white ease-in-out ${sticky ? 'py-4' : 'py-4'}`}>
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-center">
                            {/* Enhanced Logo */}
                            <Link href="/" className="group flex items-center transform transition-all duration-300">
                                <Image
                                    src={logo}
                                    alt="popcorn world"
                                    className={`transition-all object-contain duration-300 w-full ease-in-out h-12 lg:h-14 group-hover:brightness-110`}
                                />
                            </Link>

                            {/* Enhanced Desktop Menu */}
                            <nav className="hidden lg:flex items-center space-x-8 font-semibold text-[16px] capitalize text-white">
                                {/* Home */}
                                <div className="relative group">
                                    <Link href='/fundraising' className="flex items-center py-2 hover:text-[#ffc222] transition-colors duration-300 group relative">
                                        Fundraising
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </Link>
                                </div>

                                {/* Project */}
                                <div className="relative group">
                                    <Link href='/shop' className="flex items-center py-2 hover:text-[#ffc222] transition-colors duration-300 group relative">
                                        Shop Popcorn
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </Link>
                                </div>

                                <Link
                                    href="/about-us"
                                    className="py-2 hover:text-[#ffc222] transition-colors duration-300 group relative"
                                >
                                    About
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                </Link>

                                <Link
                                    href="/contact-us"
                                    className="py-2 hover:text-[#ffc222] transition-colors duration-300 group relative"
                                >
                                    Contact
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                </Link>
                            </nav>



                            {/* Enhanced Donate + Mobile Toggle */}
                            <div className="flex items-center space-x-4">
                                {pathname === "/store-demo" && !isAuthenticated  ? (
                                    <Link
                                        href="/get-started"
                                        className="group relative hidden bg-[#8BC34A] text-white px-6 py-3 rounded-full transition-all duration-300 transform lg:flex items-center font-medium overflow-hidden"
                                    >
                                        <span className="relative z-10">SET UP A FUNDRAISER</span>
                                    </Link>
                                ) : (
                                    !isAuthenticated && (
                                    <Link
                                        href="/store-demo"
                                        className="group relative hidden bg-[#8BC34A] text-white px-6 py-3 rounded-full transition-all duration-300 transform lg:flex items-center font-medium overflow-hidden"
                                    >
                                        <span className="relative z-10">Get Started</span>
                                    </Link>
                                ))}

                                <button
                                    className="lg:hidden p-3 rounded-xl border border-gray-200 hover:border-[#8BC34A] hover:bg-blue-50 transition-all duration-300 transform"
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                >
                                    <FaBars className="text-white hover:text-[#8BC34A] transition-colors duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* === Enhanced Mobile Menu === */}
            <div className={`fixed top-0 left-0 w-80 h-screen bg-white z-50 transform transition-all duration-500 ease-in-out lg:hidden shadow-2xl ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-black">
                    <Link href="/" onClick={closeMobileMenu}>
                        <Image src={logo} alt="popcorn world" className="h-8 object-contain w-full transition-transform duration-300" />
                    </Link>
                    <button
                        onClick={closeMobileMenu}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                    >
                        <FaTimes className="text-white text-xl" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="overflow-y-auto h-full pb-20">
                    <ul className="p-6 space-y-2 capitalize">
                        {/* Home */}
                        <li className="border-b border-gray-100 pb-2">
                            <Link href='/fundraising'
                                onClick={closeMobileMenu}
                                className="w-full flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >
                                Fundraising
                            </Link>
                        </li>

                        {/* Project */}
                        <li className="border-b border-gray-100 pb-2">
                            <Link href='/shop'
                                onClick={closeMobileMenu}
                                className="w-full flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >
                                Shop Popcorn
                            </Link>
                        </li>

                        <li className="border-b border-gray-100 pb-2">
                            <Link
                                href="/about-us"
                                onClick={closeMobileMenu}
                                className="block py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >
                                About
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/contact-us"
                                onClick={closeMobileMenu}
                                className="block py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {/* Sign In / Profile Section - Mobile */}
                    <li className="pt-2 ">
                        {isAuthenticated ? (
                            <div className="space-y-2 border-t px-4 pt-3">
                                <Link
                                    href="/profile"
                                    onClick={() => {
                                        closeMobileMenu();
                                        setShowProfileDropdown(false);
                                    }}
                                    className="flex items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                                >
                                    <FaUser className="mr-3 text-blue-600" />
                                    My Profile
                                </Link>

                                <Link
                                    href="/orders"
                                    onClick={() => {
                                        closeMobileMenu();
                                        setShowProfileDropdown(false);
                                    }}
                                    className="flex items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                                >
                                    <FaShoppingBag className="mr-3 text-green-600" />
                                    My Orders
                                </Link>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMobileMenu();
                                    }}
                                    className="flex items-center py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 text-black font-semibold w-full text-left"
                                >
                                    <FaSignOutAlt className="mr-3 text-red-600" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    closeMobileMenu();
                                    handleSignInClick();
                                }}
                                className=" mx-6 group w-[85%] btn-primary transition-all duration-300 flex items-center justify-center font-medium transform shadow-lg"
                            >
                                Sign In
                            </button>
                        )}
                    </li>

                    {/* Mobile Donate Button */}
                    <div className="p-6">
                        {pathname === "/store-demo" ? (
                            !isAuthenticated &&
                            <Link
                                href="/get-started"
                                onClick={closeMobileMenu}
                                className="group w-full btn-primary transition-all duration-300 flex items-center justify-center font-medium transform shadow-lg"
                            >
                                SET UP A FUNDRAISER 
                            </Link>
                        ) : (
                            <Link
                                href="/store-demo"
                                onClick={closeMobileMenu}
                                className="group w-full btn-primary transition-all duration-300 flex items-center justify-center font-medium transform shadow-lg"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* === Sign In Modal === */}
            <SignInModal
                isOpen={showSignInModal}
                onClose={closeModals}
                onSendCode={handleSendVerificationCode}
                phoneNumber={phoneNumber}
                onPhoneChange={handlePhoneChange}
                phoneError={phoneError}
                isLoading={isLoading}
            />

            {/* === OTP Modal === */}
            <OTPModal
                isOpen={showOTPModal}
                onClose={closeModals}
                onVerify={handleVerifyOTP}
                onResend={() => {
                    setShowOTPModal(false);
                    setShowSignInModal(true);
                    setOtp(['', '', '', '', '']);
                    setOtpError('');
                }}
                phoneNumber={phoneNumber}
                otp={otp}
                onOtpChange={handleOtpChange}
                onOtpKeyDown={handleOtpKeyDown}
                otpError={otpError}
                isLoading={isLoading}
                otpRefs={otpRefs}
            />

            <HeaderShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};

export default Header;