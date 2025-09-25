'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiShoppingBag4Fill } from 'react-icons/ri';

// Quantity Counter Component
const QuantityCounter = ({ quantity, onIncrease, onDecrease, min = 1 }) => {
  return (
    <div className="flex items-center space-x-3">
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
      
      <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
      
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
      <RiShoppingBag4Fill size={20} />
      
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
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "The Perfect 10",
      description: "2 Flavor Set",
      price: 297,
      quantity: 3,
      image: "/api/placeholder/80/80",
      type: "product"
    },
    {
      id: 2,
      name: "Make a Donation",
      description: "",
      price: 10,
      quantity: 1,
      image: null,
      type: "donation",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      )
    },
    {
      id: 3,
      name: "The Work",
      description: "2 Flavor Set",
      price: 98,
      quantity: 1,
      image: "/api/placeholder/80/80",
      type: "product"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
         isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <svg           className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Continue Shopping</span>
            </button>
          </div>

          {/* Foundation Message */}
          <div className="px-6 py-4 bg-yellow-50 border-b border-green-100">
            <p className="text-sm text-gray-700">
              50% of each purchase benefits the Popcorn World Kids Foundation
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 group">
                  {/* Item Image/Icon */}
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <div className="w-16 h-16 bg-blue-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      item.icon
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-gray-400 hover:text-red-500 mt-2 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-gray-900">${item.price * item.quantity}</p>
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
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiShoppingBag4Fill className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-2">Add some delicious popcorn to get started!</p>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform  focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 flex items-center justify-center space-x-3"
                onClick={() => {
                  console.log('Checkout clicked', { totalAmount, totalItems });
                  // Add your checkout logic here
                }}
              >
                <span>Checkout</span>
                <span className="font-black">${totalAmount}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { HeaderShoppingCart, ShoppingCartIcon };