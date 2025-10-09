'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/appSlice';

const CollectionsSection = ({ collections, collectionsLoading, collectionsError, pagination, onLoadMore }) => {
  const dispatch = useDispatch();
  // Get global settings from Redux
  const { globalSettings } = useSelector(state => state.app);

  // Fallback sample data - will be replaced by API data
  const [fallbackCollections] = useState([
    {
      id: 1,
      name: "The Work",
      price: 98.00,
      category: "THE WORK",
      description: "It's total package.",
         image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      name: "The Perfect 10",
      price: 99.00,
      category: "THE PERFECT 10",
      description: "The Supreme set.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      name: "Family Bundle",
      price: 129.00,
      category: "FAMILY PACK",
      description: "Perfect for movie nights and gatherings.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      name: "Office Delight",
      price: 89.00,
      category: "OFFICE PACK",
      description: "Keep your team happy and productive.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      name: "Premium Selection",
      price: 149.00,
      category: "PREMIUM",
      description: "Our finest collection for discerning taste.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 6,
      name: "Holiday Special",
      price: 119.00,
      category: "SEASONAL",
      description: "Celebrate with our festive collection.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 7,
      name: "Gourmet Mix",
      price: 159.00,
      category: "GOURMET",
      description: "Artisanal flavors for the sophisticated palate.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 8,
      name: "Party Pack",
      price: 179.00,
      category: "PARTY",
      description: "Everything you need for the perfect party.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 9,
      name: "Classic Collection",
      price: 79.00,
      category: "CLASSIC",
      description: "Timeless favorites that never go out of style.",
      image: "/api/placeholder/400/300"
    },
    {
      id: 10,
      name: "Gift Box Deluxe",
      price: 199.00,
      category: "GIFT SET",
      description: "The perfect gift for any occasion.",
      image: "/api/placeholder/400/300"
    }
  ]);

  // Use API data if available, otherwise use fallback data
  const allCollections = collections || fallbackCollections;

  // Format price with currency
  const formatPrice = (price) => {
    const currency = globalSettings?.currency || '$';
    return `${currency}${price}`;
  };

  const handleMoreInfo = (collection) => {
    const name = collection.name || collection.title || 'collection';
    const slug = collection.slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    // Navigate to new page
    window.location.href = `/collections/${slug}`;
  };

const handleAddToCart = (collection) => {
  // 1. API image → absolute URL
  const apiImage = collection?.collection_images?.[0]?.image?.trim();
  const imageUrl = apiImage
    ? apiImage.startsWith('http')
      ? apiImage
      : `https://onebigmediacompany.online/${apiImage}`
    : typeof collection.image === 'string'
    ? collection.image.trim()
    : typeof collection.image === 'object' && collection.image?.src
    ? collection.image.src
    : '/pop_packet.png';

  console.log('Dispatching image:', imageUrl); 

  dispatch(
    addToCart({
      ...collection,
      image: imageUrl,
    })
  );
};



  // Simple pagination logic: show Load More if we don't have all records yet
  const hasMore = pagination && allCollections && allCollections.length < pagination.totalRecords;

  // Don't show the section if there are no collections and not loading
  if (!collectionsLoading && (!allCollections || allCollections.length === 0)) {
    return null;
  }

  // Show loading state
  if (collectionsLoading) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-splash text-black mb-4">
              Collections
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
  if (collectionsError) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-splash text-black mb-4">
              Collections
            </h2>
            <div className="w-48 h-1 bg-[#ffc222] mx-auto rounded-full"></div>
          </div>
          <div className="text-center py-20">
            <p className="text-red-600 text-lg">Error loading collections: {collectionsError}</p>
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
          <h2 className="main_heading font-splash  text-black mb-4">
            Collections
          </h2>
          <div className="w-48 h-1 bg-[#ffc222] mx-auto rounded-full"></div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {allCollections && allCollections.length > 0 ? allCollections.map((collection, index) => (
            <div
              key={collection.id}
              className="group bg-white rounded-2xl shadow-lg transition-all duration-500 transform overflow-hidden hover:shadow-xl flex flex-col h-full"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-64  overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-100/30"></div>
                <div className="relative h-full flex items-center justify-center ">
                  {/* Collection Package Visualization */}
                  <div className="relative w-full h-full">
                    <Image
                      src={
                    collection?.collection_images?.[0]?.image
  ? collection.collection_images[0].image.startsWith('http')
    ? collection.collection_images[0].image
    : `https://onebigmediacompany.online/${collection.collection_images[0].image.trim()}`
  : '/pop_packet.png'
                      }
                      alt={collection?.title || 'Popcorn Collection'}
                      fill
                 
                      className="object-fill object-center drop-shadow-2xl w-full h-full transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/pop_packet.png';
                      }}
                    />

                  </div>
                </div>


              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex flex-col flex-grow">
                {/* Category Badge */}
                <span className="inline-block px-3 text-center w-32 py-1.5 bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {collection.category || collection.product_categories?.[0]?.category?.name || 'COLLECTION'}
                </span>

                {/* Title and Price */}
                <div className="flex items-start justify-between pt-1">
                  <h3 className="sub_heading text-black transition-colors duration-300 flex-1 pr-4">
                    {collection.name || collection.title || 'Collection'}
                  </h3>
                  <span className="sub_heading text-black flex-shrink-0">
                    {formatPrice(collection.price || '0.00')}
                  </span>
                </div>

                {/* Description */}
                <div
                  className="text-black text-[16px] font-normal leading-relaxed flex-grow"
                  dangerouslySetInnerHTML={{ __html: collection.description || '' }}
                />
                {/* Action Buttons */}
                <div className='flex items-center gap-4 mt-auto pt-4'>
                  <button
                    onClick={() => handleMoreInfo(collection)}
                    className="w-full inline-flex items-center gap-3 justify-center  bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none"
                  >
                    More Info
                  </button>
                  <button
                    onClick={() => handleAddToCart(collection)}
                    className="w-full inline-flex items-center whitespace-nowrap gap-3 justify-center  bg-[#8bc34a] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none">
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
              <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 text-lg">No collections available</p>
            </div>
          )}
        </div>

        {/* Load More Button - Simple logic: show if current page < total pages */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={onLoadMore}
              disabled={collectionsLoading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-black text-white font-bold rounded-full transition-all duration-300 transform hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {collectionsLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}


      </div>
    </section>
  );
};

export default CollectionsSection;