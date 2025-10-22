'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../../store/slices/appSlice';

const AllFlavorsSection = ({ products, productsLoading, productsError, pagination, onLoadMore, link_code, campaignData }) => {
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
  const imageUrl =
    flavor?.product_images?.[0]?.thumbnail?.trim() ||
    '/pop_packet.png';

  const campaignInfo = campaignData ? {
    campaign_name: campaignData?.campaign_title,
    campaign_slug: campaignData?.slug,
    campaign_thumbnail: campaignData?.galleries?.[0]?.image || campaignData.campaign_image
  } : null;

  dispatch(
    addToCart({
      product: {
        ...flavor,
        image: imageUrl,
        campaign_info: campaignInfo
      },
      link_code: link_code
    })
  );
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8ac24a]"></div>
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
                    onClick={() => handleMoreInfo(flavor)}
              className="group  transition-all duration-500 cursor-pointer transform overflow-hidden flex flex-col h-full"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-56  p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-100/30"></div>
                <div className="relative h-full flex items-center justify-center">
                 
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          flavor?.product_images?.[0]?.thumbnail && flavor.product_images[0].thumbnail.trim() !== ''
                            ? flavor.product_images[0].thumbnail
                            : '/pop_packet.png'
                        }
                        alt={flavor?.name || flavor?.title || 'Popcorn Flavor'}
                        fill
                                   sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-fill object-center drop-shadow-2xl w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          e.currentTarget.src = '/pop_packet.png';
                        }}
                      />

                    </div>
              
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-2 flex flex-col flex-grow">
                {/* Category Badge */}
                <div className="flex flex-wrap gap-2">
                  {flavor?.product_categories?.length > 0 ? (
                    flavor.product_categories.map((catObj) => (
                      <span
                        key={catObj.id}
                        className="inline-block text-[#757575] text-xs font-medium leading-4 uppercase "
                      >
                        {catObj.category?.name || flavor.type || 'FLAVOR'}
                      </span>
                    ))
                  ) : (
                    <span className="inline-block text-[#757575] text-xs font-medium leading-6 uppercase ">
                      {flavor.type || 'FLAVOR'}
                    </span>
                  )}
                </div>


                {/* Title and Price */}
                <div className="flex items-start justify-between py-1">
                  <h3 className="text-[16px] leading-7 text-[#000] font-semibold transition-colors duration-300 flex-1 pr-4">
                    {flavor.name || flavor.title || 'Popcorn Flavor'}
                  </h3>
                  <span className="text-[16px] leading-7 text-[#000] font-semibold flex-shrink-0">
                    {formatPrice(flavor.price || '0.00')}
                  </span>
                </div>

                {/* Description */}
                {/* <div
                  className="text-[#323232] text-[16px] font-extralight leading-7  flex-grow"
                  dangerouslySetInnerHTML={{ __html: flavor.description || '' }}
                /> */}

                {/* Action Buttons */}
                <div className='flex items-center gap-4  mt-auto pt-4'>
                  {/* <button
                    onClick={() => handleMoreInfo(flavor)}
                    className="w-full inline-flex items-center gap-3 justify-center  bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none"
                  >
                    More Info
                  </button> */}
             <button
  onClick={(e) => {
    e.stopPropagation(); // 🧱 prevent parent click events
    handleAddToCart(flavor); // your main function
  }}
  className="w-full inline-flex items-center whitespace-nowrap gap-3 justify-center bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none"
>
  Add to Cart
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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
              className="inline-flex items-center px-6 py-3 bg-[#8BC34A]  text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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