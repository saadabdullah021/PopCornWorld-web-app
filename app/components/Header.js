"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { HeaderShoppingCart, ShoppingCartIcon } from './HeaderShoppingCart';
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
import { RiShoppingBag4Fill } from "react-icons/ri";
import logo from '../../public/fundraiserLogo.png'
import { Home, News, Pages, Project } from "./Menus";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
    const [sticky, setSticky] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const timeoutRef = useRef(null);
    const pathname = usePathname();
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sign-in related states
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [isSignedIn, setIsSignedIn] = useState(false);
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

    // Phone number validation for US numbers
    const validateUSPhone = (phone) => {
        const phoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    // Format phone number as user types
    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
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
            setPhoneError('Please enter a valid US phone number');
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
            // In real app, you would send SMS here
            console.log(`OTP sent to ${phoneNumber}: ${newOTP}`);
        }, 1500);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple digits
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        if (otpError) setOtpError('');

        // Auto-focus next input
        if (value && index < 4) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        // Handle backspace to focus previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
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
            setIsSignedIn(true);
            // Reset all states
            setPhoneNumber('');
            setOtp(['', '', '', '', '']);
            setGeneratedOTP('');
        }, 1000);
    };

    const handleLogout = () => {
        setIsSignedIn(false);
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
                        <div className="flex justify-between items-center font-medium text-sm">
                            <div className="flex space-x-8">
                                <a
                                    href="tel:+012345678933"
                                    className="group flex items-center hover:text-[#8BC34A] transition-all duration-300"
                                >
                                    <FaPhone className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    +012(345) 67 89
                                </a>

                                <a
                                    href="mailto:support@gmail.com"
                                    className="group flex items-center hover:text-[#8BC34A] transition-all duration-300"
                                >
                                    <FaEnvelope className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    support@gmail.com
                                </a>

                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center hover:text-[#8BC34A] transition-all duration-300"
                                >
                                    <FaMapMarkerAlt className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    250 Main Street, USA
                                </a>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link href='/track-an-order' className="text-sm font-semibold cursor-pointer text-white mr-3">
                                    Track Order
                                </Link>
                                
                                {/* Sign In / Profile Section */}
                                {isSignedIn ? (
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
                                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 transform animate-dropdown"
                                                onMouseLeave={() => setShowProfileDropdown(false)}
                                            >
                                                <div className="py-2">
                                                    <Link 
                                                        href="/profile"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                        onClick={() => setShowProfileDropdown(false)}
                                                    >
                                                        <FaUser className="mr-3 text-gray-400" />
                                                        Profile
                                                    </Link>
                                                    <Link 
                                                        href="/orders"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                        onClick={() => setShowProfileDropdown(false)}
                                                    >
                                                        <FaShoppingBag className="mr-3 text-gray-400" />
                                                        Orders
                                                    </Link>
                                                    <hr className="my-1 border-gray-100" />
                                                    <button 
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                    >
                                                        <FaSignOutAlt className="mr-3" />
                                                        Logout
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
                                    itemCount={5}
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
                                    alt="Funden"
                                    className={`transition-all object-contain duration-300 w-full ease-in-out h-12 lg:h-14 group-hover:brightness-110`}
                                />
                            </Link>

                            {/* Enhanced Desktop Menu */}
                            <nav className="hidden lg:flex items-center space-x-8 font-semibold capitalize text-white">
                                {/* Home */}
                                <div className="relative group">
                                    <Link href='/fundraising' className="flex items-center py-2 hover:text-[#8BC34A] transition-colors duration-300 group relative">
                                        Fundraising
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8BC34A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </Link>
                                </div>

                                {/* Project */}
                                <div className="relative group">
                                    <Link href='/shop' className="flex items-center py-2 hover:text-[#8BC34A] transition-colors duration-300 group relative">
                                        Shop Popcorn
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8BC34A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </Link>
                                </div>

                                <Link
                                    href="/about-us"
                                    className="py-2 hover:text-[#8BC34A] transition-colors duration-300 group relative"
                                >
                                    About
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8BC34A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                </Link>

                                <Link
                                    href="/contact-us"
                                    className="py-2 hover:text-[#8BC34A] transition-colors duration-300 group relative"
                                >
                                    Contact
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8BC34A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                </Link>
                            </nav>

                            {/* Enhanced Donate + Mobile Toggle */}
                            <div className="flex items-center space-x-4">
                                {pathname === "/store-demo" ? (
                                    <Link
                                        href="/get-started"
                                        className="group relative hidden bg-[#8BC34A] text-white px-6 py-3 rounded-full transition-all duration-300 transform lg:flex items-center font-medium overflow-hidden"
                                    >
                                        <span className="relative z-10">SET UP A FUNDRAISER</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href="/store-demo"
                                        className="group relative hidden bg-[#8BC34A] text-white px-6 py-3 rounded-full transition-all duration-300 transform lg:flex items-center font-medium overflow-hidden"
                                    >
                                        <span className="relative z-10">Get Started</span>
                                    </Link>
                                )}

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
                        <Image src={logo} alt="Funden" className="h-8 object-contain w-full transition-transform duration-300" />
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
                    <ul className="p-6 space-y-2">
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

                    {/* Mobile Donate Button */}
                    <div className="p-6">
                        {pathname === "/store-demo" ? (
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
            {showSignInModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-modal">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 pt-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                            <button
                                onClick={closeModals}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <FaTimes className="text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            <div className="text-center space-y-6">
                              
                                <p className="text-black font-splash text-3xl lg:text-5xl text-left ">Enter your mobile phone number</p>
                                <p className="text-black font-medium text-lg ">We’ll text you to confirm your number. Standard message and data rates apply.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        placeholder="(555) 123-4567"
                                        className={`w-full px-4 py-3 border rounded-xl  outline-none transition-all duration-200 ${
                                            phoneError ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        maxLength={14}
                                    />
                                    {phoneError && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <span className="mr-1">⚠️</span>
                                            {phoneError}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleSendVerificationCode}
                                    disabled={isLoading}
                                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
                                        isLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#000]  active:scale-95'
                                    } text-white shadow-lg`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Sending...
                                        </div>
                                    ) : (
                                        'Send Verification Code'
                                    )}
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                By continuing, you agree to our Terms of Service
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* === OTP Modal === */}
            {showOTPModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-modal">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800">Verify Code</h2>
                            <button
                                onClick={closeModals}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <FaTimes className="text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            <div className="text-center">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#8BC34A] to-[#7CB342] rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <div className="text-white text-xl font-bold">🔒</div>
                                </div>
                                <p className="text-gray-600">
                                    We've sent a 5-digit code to<br />
                                    <span className="font-semibold text-gray-800">{phoneNumber}</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                        Enter Verification Code
                                    </label>
                                    
                                    {/* OTP Input Fields */}
                                    <div className="flex justify-center space-x-3">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (otpRefs.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl  outline-none transition-all duration-200 ${
                                                    otpError ? 'border-red-500' : 'border-gray-300'
                                                } ${digit ? ' bg-green-50' : ''}`}
                                                maxLength={1}
                                            />
                                        ))}
                                    </div>
                                    
                                    {otpError && (
                                        <p className="mt-3 text-sm text-red-600 text-center flex items-center justify-center">
                                            <span className="mr-1">⚠️</span>
                                            {otpError}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleVerifyOTP}
                                    disabled={isLoading}
                                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
                                        isLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#000]'
                                    } text-white shadow-lg`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Verifying...
                                        </div>
                                    ) : (
                                        'Verify Code'
                                    )}
                                </button>

                                {/* Resend Code */}
                                <div className="text-center">
                                    <button
                                        onClick={() => {
                                            setShowOTPModal(false);
                                            setShowSignInModal(true);
                                            setOtp(['', '', '', '', '']);
                                            setOtpError('');
                                        }}
                                        className="text-[#000] hover:text-[#7CB342] font-medium transition-colors duration-200"
                                    >
                                        Didn't receive code? Resend
                                    </button>
                                </div>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                Code expires in 5 minutes
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <HeaderShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

        </>
    );
};

export default Header;