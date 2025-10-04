'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import demoImage from '../../../public/dance_fundraiser.png';
import { TiShoppingCart } from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/appSlice';

const AllFlavorsSection = ({ products, productsLoading, productsError, pagination, onLoadMore }) => {
  const dispatch = useDispatch();
  // Get global settings from Redux
  const { globalSettings } = useSelector(state => state.app);
  
  // Use only API data
  const allFlavors = products || [];

  // Format price with currency
  const formatPrice = (price) => {
    const currency = globalSettings?.currency || '$';
    return `${currency}${price}`;
  };

  const handleMoreInfo = (flavor) => {
    // Use the slug from the API data if available, otherwise generate from name
    const slug = flavor.slug || flavor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    // Navigate to new page
    window.location.href = `/flavors/${slug}`;
  };

  const handleAddToCart = (flavor) => {
    dispatch(addToCart(flavor));
  };

  // Simple pagination logic: show Load More if we don't have all records yet
  const hasMore = pagination && allFlavors && allFlavors.length < pagination.totalRecords;

  // Show loading state
  if (productsLoading) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-splash text-black mb-4">
              ALL FLAVORS
            </h2>
            <div className="w-48 h-1 bg-[#ffc222] mx-auto rounded-full"></div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffc222]"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (productsError) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-splash text-black mb-4">
              ALL FLAVORS
            </h2>
            <div className="w-48 h-1 bg-[#ffc222] mx-auto rounded-full"></div>
          </div>
          <div className="text-center py-20">
            <p className="text-red-600 text-lg">Error loading products: {productsError}</p>
            <p className="text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="main_heading font-splash text-black mb-4">
            ALL FLAVORS
          </h2>
          <div className="w-48 h-1 bg-[#ffc222] mx-auto rounded-full"></div>
        </div>

        {/* Flavors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {allFlavors && allFlavors.length > 0 ? allFlavors.map((flavor, index) => (
            <div
              key={flavor.id}
              className="group bg-white rounded-2xl shadow-lg transition-all duration-500 transform overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-50 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-100/30"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="w-96 h-64 relative">
                      <Image
                        src={flavor.image && typeof flavor.image === 'string' && flavor.image.trim() !== '' ? flavor.image : '/pop_packet.png'}
                        alt={flavor.name || flavor.title || 'Popcorn Flavor'}
                        fill
                        className="object-contain drop-shadow-2xl w-full h-full transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/pop_packet.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Category Badge */}
                <span className="inline-block px-4 py-1.5 bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {flavor.product_categories?.[0]?.category?.name || flavor.type || 'FLAVOR'}
                </span>

                {/* Title and Price */}
                <div className="flex items-start justify-between py-1">
                  <h3 className="text-xl lg:text-[22px] font-bold text-black transition-colors duration-300 flex-1 pr-4">
                    {flavor.name || flavor.title || 'Popcorn Flavor'}
                  </h3>
                  <span className="text-xl lg:text-[22px] font-semibold text-black flex-shrink-0">
                    {formatPrice(flavor.price || '0.00')}
                  </span>
                </div>

                {/* Description */}
                <div
                  className="text-black text-[16px] font-normal leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: flavor.description || '' }}
                />

                {/* Action Buttons */}
                <div className='flex items-center gap-4'>
                  <button
                    onClick={() => handleMoreInfo(flavor)}
                    className="w-full inline-flex items-center gap-3 justify-center mt-6 bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none"
                  >
                    More Info
                  </button>
                  <button 
                    onClick={() => handleAddToCart(flavor)}
                    className="w-full inline-flex items-center whitespace-nowrap gap-3 justify-center mt-6 bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none">
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 11-1 9" />
                      <path d="m19 11-4-7" />
                      <path d="M2 11h20" />
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                      <path d="M4.5 15.5h15" />
                      <path d="m5 11 4-7" />
                      <path d="m9 11 1 9" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none"></div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 text-lg">No products available</p>
            </div>
          )}
        </div>

        {/* Load More Button - Show if we don't have all records yet */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={onLoadMore}
              disabled={productsLoading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-black text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {productsLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllFlavorsSection;