//behroz checkout
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiShoppingBag4Fill } from 'react-icons/ri';
import donation_checkout from '../../public/donation_checkout.webp'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity, addToCart } from '../store/slices/appSlice';
// Quantity Counter Component
const QuantityCounter = ({ quantity, onIncrease, onDecrease, min = 1 }) => {
  return (
    <div className="flex items-center space-x-0">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <span className="w-8 text-center font-semibold text-black">{quantity}</span>

      <button
        onClick={onIncrease}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

// Shopping Cart Icon Component for Header
const ShoppingCartIcon = ({ itemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative text-sm font-medium outline-none ring-none rounded-full cursor-pointer text-white mr-3  transition-transform duration-200 focus:outline-none "
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className='w-8 mt-2 lg:mt-0 h-8 lg:w-5 lg:h-5' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 11-1 9" />
        <path d="m19 11-4-7" />
        <path d="M2 11h20" />
        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
        <path d="M4.5 15.5h15" />
        <path d="m5 11 4-7" />
        <path d="m9 11 1 9" />
      </svg>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

// Main Shopping Cart Component
const HeaderShoppingCart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  // Get cart and global settings from Redux
  const { cart, globalSettings } = useSelector(state => state.app);
  const cartItems = cart || [];

  // Format price with currency
  const formatPrice = (price) => {
    const getConfigValue = (key, defaultValue) => {
      if (!globalSettings || !Array.isArray(globalSettings)) return defaultValue;
      const config = globalSettings.find(item => item.config_key === key);
      return config ? config.config_value : defaultValue;
    };

    const currency = getConfigValue('campaign_currency', '$');
    return `${currency}${price}`;
  };

  // Cart functions using Redux actions
  const updateQuantity = (id, newQuantity) => {
    dispatch(updateCartQuantity({ id, quantity: newQuantity }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const isValidSrc = (src) => {
    if (!src || typeof src !== 'string') return false;

    try {
      new URL(src); // absolute URL
      return true;
    } catch {

      return src.startsWith('/') || src.startsWith('uploads/');
    }
  };




  const customLoader = ({ src, width }) => {
    return `${src}?w=${width}`;
  };
  // Add donation to cart function
  const addDonationToCart = () => {
    const donationItem = {
      id: Date.now(), // Generate unique ID
      name: "Make a Popcorn Donation",
      description: "Sent to essential workers",
      price: 10,
      quantity: 1,
      image: donation_checkout,
      type: "donation",

    };

    dispatch(addToCart({ product: donationItem }));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close on escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`; // prevent layout shift
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);


  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-full  hover:text-gray-600 text-black transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Continue Shopping</span>
            </button>
          </div>

          {/* Foundation Message */}
          <div className="px-6 py-4 bg-yellow-50 border-b border-green-100">
            <p className="text-[16px] text-gray-700">
              Support kids while you shop — 50% of each purchase benefits the Popcorn World Kids Foundation.
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 group  border-b border-gray-200 pb-2 lg:pb-4">

                  {/* Item Image/Icon */}
                  <div className="flex-shrink-0">
                    {isValidSrc(item.image) ? (
                      <div className="w-24 h-24 bg-blue-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name || item.title || 'Product'}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain object-center"
                          loader={customLoader}
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/pop_packet.png"
                          alt="Default"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain object-center"
                          loader={customLoader}
                        />
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold leading-7 text-[16px] text-black">{item.name || item.title || 'Product'}</h4>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-800 hover:text-red-500 mt-2 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-[16px] text-black">{formatPrice((item.price * item.quantity).toFixed(2))}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-4">
                      <QuantityCounter
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      />
                    </div>
                  </div>

                </div>

              ))}

              {/* Empty Cart State */}
              {cartItems.length === 0 && (
                <div className="flex flex-col flex-1 justify-between">
                  {/* Empty message – center mein */}
                  <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <RiShoppingBag4Fill className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add some delicious popcorn to get started!</p>
                  </div>

                  {/* Disabled checkout – bottom pe fixed */}
                  <div className="border-t border-gray-200 p-6 bg-white">
                    <p className="text-gray-500 text-[16px] mb-2 text-center">
                      You haven't reached the $100 order minimum.
                    </p>
                    <button
                      disabled
                      className="w-full bg-blue-100 text-gray-400 font-bold py-3 px-6 rounded-3xl cursor-not-allowed"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}


            </div>
            {/* NEW LINE - Donation Section */}
            {/* <div className="mt-8 border border-gray-200 rounded-xl p-6 shadow-sm text-left max-w-md mx-auto">
              <p className="text-gray-600 text-sm font-medium mb-3">Increase your impact</p>
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image
                    src={donation_checkout}
                    alt="Donation Icon"
                    width={56}
                    height={56}
                    className="w-8 h-8 text-gray-600"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Make a Popcorn Donation</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sent to essential workers</li>
                    <li>• No extra shipping cost</li>
                  </ul>
                  <p className="font-semibold text-black mt-2">$10</p>
                  <button
                    onClick={addDonationToCart}
                    className="mt-3 w-full bg-gray-900 text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div> */}
          </div>

          {/* Checkout Button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <Link href='/checkout'>
                <button
                  className="w-full bg-[#8ac24a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform  focus:outline-none  flex items-center justify-center space-x-3"
                  onClick={onClose}
                >
                  <span>Checkout</span>
                  <span className="font-black">{formatPrice(totalAmount.toFixed(2))}</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { HeaderShoppingCart, ShoppingCartIcon };