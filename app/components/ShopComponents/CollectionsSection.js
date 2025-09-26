'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import demoImage from '../../../public/dance_fundraiser.png';
import { TiShoppingCart } from "react-icons/ti";

const CollectionsSection = () => {
  // Sample data - replace with your API data
  const [allCollections] = useState([
    {
      id: 1,
      name: "The Work",
      price: 98.00,
      category: "THE WORK",
      description: "It's total package.",
      image: demoImage
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

  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate API loading time
    setTimeout(() => {
      setVisibleCount(allCollections.length);
      setIsLoading(false);
    }, 500);
  };

  const visibleCollections = allCollections.slice(0, visibleCount);
  const hasMore = visibleCount < allCollections.length;

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-splash  text-black mb-4">
            Collections
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8BC34A] to-[#ffc222] mx-auto rounded-full"></div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleCollections.map((collection, index) => (
            <div 
              key={collection.id}
              className="group bg-white rounded-2xl shadow-lg transition-all duration-500 transform overflow-hidden hover:shadow-xl"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-100/30"></div>
                <div className="relative h-full flex items-center justify-center ">
                  {/* Collection Package Visualization */}
                  <div className="relative w-full h-full">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-contain drop-shadow-2xl w-full h-full transition-transform duration-500 "
                    />
                  </div>
                </div>
                
                
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1.5 bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {collection.category}
                </span>

                {/* Title and Price */}
                <div className="flex items-start justify-between pt-1">
                  <h3 className="text-xl lg:text-[22px] font-bold text-blacktransition-colors duration-300 flex-1 pr-4">
                    {collection.name}
                  </h3>
                  <span className="text-xl lg:text-[22px] font-semibold text-black flex-shrink-0">
                    ${collection.price.toFixed(0)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-black text-[16px] font-normal leading-relaxed">
                  {collection.description}
                </p>

                {/* Action Button */}
                  <button className="inline-flex items-center gap-3 justify-center w-full mt-6 bg-[#8BC34A]  text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform  hover:shadow-lg focus:outline-none ">
                  Add to Cart
                  <TiShoppingCart />

                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-black text-white font-bold rounded-full transition-all duration-300 transform  hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Load More
                
                </>
              )}
            </button>
          </div>
        )}


      </div>
    </section>
  );
};

export default CollectionsSection;