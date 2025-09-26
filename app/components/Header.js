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
} from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import logo from '../../public/fundraiserLogo.png'
import { Home, News, Pages, Project } from "./Menus";
import Image from "next/image";

const Header = () => {
    const [sticky, setSticky] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const timeoutRef = useRef(null);

    const [isCartOpen, setIsCartOpen] = useState(false);
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

    return (
        <>
            {/* Mobile Menu Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
                    onClick={closeMobileMenu}
                />
            )}

            <header
                className={`w-full z-50 transition-all duration-500 ease-in-out
                    fixed top-0 left-0 bg-white/90   shadow-md
                   
                    `}
            >
                {/* === Enhanced Topbar === */}
                <div className={`hidden lg:block bg-black text-white transition-all duration-300  ease-in-out ${scrolled ? 'py-3' : 'py-3'
                    }`}>
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-center font-medium text-sm">
                            <div className="flex space-x-8">
                                <a
                                    href="tel:+012345678933"
                                    className="group flex items-center hover:text-yellow-200 transition-all duration-300"
                                >
                                    <FaPhone className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    +012(345) 67 89
                                </a>

                                <a
                                    href="mailto:support@gmail.com"
                                    className="group flex items-center hover:text-yellow-200 transition-all duration-300"
                                >
                                    <FaEnvelope className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    support@gmail.com
                                </a>

                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center hover:text-yellow-200 transition-all duration-300"
                                >
                                    <FaMapMarkerAlt className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                                    250 Main Street, USA
                                </a>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link href='/track-an-order' className="text-sm font-semibold  cursor-pointer text-white mr-3">Tracke an Order</Link >
                                <button className="text-sm font-semibold  bg-gray-200 px-3 py-1 outline-none ring-none rounded-full text-black cursor-pointer  mr-3">Sign In</button>
                                <ShoppingCartIcon
                                    itemCount={5} 
                                    onClick={() => setIsCartOpen(true)}
                                />

                            </div>
                        </div>
                    </div>
                </div>

                {/* === Enhanced Navbar === */}
                <div
                    className={`w-full transition-all duration-300 bg-[#3333cb]  text-white ease-in-out ${sticky ? 'py-4' : 'py-4'
                        }`}>
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-center">
                            {/* Enhanced Logo */}
                            <Link href="/" className="group flex items-center transform transition-all duration-300 ">
                                <Image
                                    src={logo}
                                    alt="Funden"
                                    className={`transition-all object-contain duration-300 w-full  ease-in-out h-12 lg:h-14
                                     group-hover:brightness-110`}
                                />
                            </Link>

                            {/* Enhanced Desktop Menu */}
                            <nav className="hidden lg:flex items-center space-x-8 font-semibold capitalize text-white">
                                {/* Home */}
                                <div
                                    className="relative group"
                                    // onMouseEnter={() => handleMouseEnter("home")}
                                    // onMouseLeave={handleMouseLeave}
                                >
                                    <Link href='/fundraising' className="flex items-center py-2 hover:text-[#ffc222] transition-colors duration-300 group relative">
                                        Fundrasing
                                        {/* <FaAngleDown className={`ml-1 text-xs transform transition-transform duration-300 ${openDesktopMenu === "home" ? 'rotate-180' : ''
                                            }`} /> */}
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </Link>
                                    {/* {openDesktopMenu === "home" && (
                                        <div
                                            className="absolute left-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden transform animate-dropdown"
                                            onMouseEnter={() => clearTimeout(timeoutRef.current)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="px-6 py-4  space-y-4">
                                                {Home}
                                            </div>
                                        </div>
                                    )} */}
                                </div>

                                {/* Project */}
                                <div
                                    className="relative group"
                                    // onMouseEnter={() => handleMouseEnter("project")}
                                    // onMouseLeave={handleMouseLeave}
                                >
                                    <Link href='/shop' className="flex items-center py-2 hover:text-[#ffc222] transition-colors duration-300 group relative">
                                        Shop Popcorn
                                        {/* <FaAngleDown className={`ml-1 text-xs transform transition-transform duration-300 ${openDesktopMenu === "project" ? 'rotate-180' : ''
                                            }`} /> */}
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </Link>
                                    {/* {openDesktopMenu === "project" && (
                                        <div
                                            className="absolute left-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden transform animate-dropdown"
                                            onMouseEnter={() => clearTimeout(timeoutRef.current)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="px-6 py-4  space-y-4">
                                                {Project}
                                            </div>
                                        </div>
                                    )} */}
                                </div>

                                <Link
                                    href="/about-us"
                                    className="py-2 hover:text-[#ffc222] transition-colors duration-300 group relative"
                                >
                                    About
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                </Link>

                                {/* News */}
                                {/* <div
                                    className="relative group"
                                    onMouseEnter={() => handleMouseEnter("news")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button className="flex items-center py-2 hover:text-[#ffc222] transition-colors duration-300 group relative">
                                        News
                                        <FaAngleDown className={`ml-1 text-xs transform transition-transform duration-300 ${openDesktopMenu === "news" ? 'rotate-180' : ''
                                            }`} />
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </button>
                                    {openDesktopMenu === "news" && (
                                        <div
                                            className="absolute left-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden transform animate-dropdown"
                                            onMouseEnter={() => clearTimeout(timeoutRef.current)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="px-6 py-4  space-y-4">
                                                {News}
                                            </div>
                                        </div>
                                    )}
                                </div> */}

                                {/* Pages */}
                                {/* <div
                                    className="relative group"
                                    onMouseEnter={() => handleMouseEnter("pages")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button className="flex items-center py-2 hover:text-[#ffc222] transition-colors duration-300 group relative">
                                        Pages
                                        <FaAngleDown className={`ml-1 text-xs transform transition-transform duration-300 ${openDesktopMenu === "pages" ? 'rotate-180' : ''
                                            }`} />
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc222] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform [transform:translateZ(0)]"></div>
                                    </button>
                                    {openDesktopMenu === "pages" && (
                                        <div
                                            className="absolute left-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden transform animate-dropdown"
                                            onMouseEnter={() => clearTimeout(timeoutRef.current)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="px-6 py-4  space-y-4">
                                                {Pages}
                                            </div>
                                        </div>
                                    )}
                                </div> */}

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
                                <Link
                                    href="/store-demo"
                                    className="group relative hidden bg-[#8BC34A] text-white px-6 py-3 rounded-full  transition-all duration-300 transform   lg:flex items-center font-medium overflow-hidden"
                                >

                                    <span className="relative z-10">Get Started</span>
                                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                                </Link>

                                <button
                                    className="lg:hidden p-3 rounded-xl border border-gray-200 hover:border-[#ffc222] hover:bg-blue-50 transition-all duration-300 transform "
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                >
                                    <FaBars className="text-white hover:text-[#ffc222] transition-colors duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* === Enhanced Mobile Menu === */}
            <div
                className={`fixed top-0 left-0 w-80 h-screen bg-white z-50 transform transition-all duration-500 ease-in-out lg:hidden shadow-2xl ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-black">
                    <Link href="/" onClick={closeMobileMenu}>
                        <Image src={logo} alt="Funden" className="h-8  object-contain w-full transition-transform duration-300" />
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

                                Fundrasing


                            </Link>
                            {/* {activeDropdown === "home" && (
                                <div className="pl-4 mt-2 space-y-1 animate-slideDown">
                                    {Home}
                                </div>
                            )} */}
                        </li>

                        {/* Project */}
                        <li className="border-b border-gray-100 pb-2">
                            <Link href='/shop'
                                onClick={closeMobileMenu}
                                className="w-full flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >

                                Shop Popcorn


                            </Link >
                            {/* {activeDropdown === "project" && (
                                <div className="pl-4 mt-2 space-y-1 animate-slideDown">
                                    {Project}
                                </div>
                            )} */}
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

                        {/* News */}
                        {/* <li className="border-b border-gray-100 pb-2">
                            <button
                                onClick={() => toggleDropdown("news")}
                                className="w-full flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >
                                <span>News</span>
                                <FaAngleDown className={`transform transition-transform duration-300 ${activeDropdown === "news" ? 'rotate-180 text-[#ffc222]' : ''
                                    }`} />
                            </button>
                            {activeDropdown === "news" && (
                                <div className="pl-4 mt-2 space-y-1 animate-slideDown">
                                    {News}
                                </div>
                            )}
                        </li> */}

                        {/* Pages */}
                        {/* <li className="border-b border-gray-100 pb-2">
                            <button
                                onClick={() => toggleDropdown("pages")}
                                className="w-full flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-black font-semibold"
                            >
                                <span>Pages</span>
                                <FaAngleDown className={`transform transition-transform duration-300 ${activeDropdown === "pages" ? 'rotate-180 text-[#ffc222]' : ''
                                    }`} />
                            </button>
                            {activeDropdown === "pages" && (
                                <div className="pl-4 mt-2 space-y-1 animate-slideDown">
                                    {Pages}
                                </div>
                            )}
                        </li> */}

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
                        <Link
                            href="/store-demo"
                            onClick={closeMobileMenu}
                            className="group w-full btn-primary  transition-all duration-300 flex items-center justify-center font-medium transform  shadow-lg"
                        >
                            Get Started
                            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

            <HeaderShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};

export default Header;