'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import demoImage from '../../../public/dance_fundraiser.png';
import { TiShoppingCart } from 'react-icons/ti';

const AllFlavorsSection = () => {
  // Sample data - replace with your API data
  const [allFlavors] = useState([
    {
      id: 1,
      name: "Spicy and Savory",
      price: 65.00,
      category: "FLAVOR",
      description: "A blaze of spicy, cheezy perfection with a kick that won't quit.",
      images: [demoImage, "/api/placeholder/400/400", "/api/placeholder/400/401"]
    },
    {
      id: 2,
      name: "Savory and Salty",
      price: 76.00,
      category: "FLAVOR",
      description: "Fluffy, buttery popcorn with a slightly salted to perfection.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/402", "/api/placeholder/400/403"]
    },
    {
      id: 3,
      name: "Savory",
      price: 56.00,
      category: "FLAVOR",
      description: "Tasty popcorn with an elegant coating of creamy white cheddar.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/404"]
    },
    {
      id: 4,
      name: "Sweet Caramel",
      price: 68.00,
      category: "FLAVOR",
      description: "Rich, buttery caramel coating that melts in your mouth.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/405", "/api/placeholder/400/406"]
    },
    {
      id: 5,
      name: "Chocolate Delight",
      price: 72.00,
      category: "FLAVOR",
      description: "Premium chocolate drizzled popcorn for the ultimate treat.",
      images: ["/api/placeholder/300/300"]
    },
    {
      id: 6,
      name: "Mixed Berry",
      price: 70.00,
      category: "FLAVOR",
      description: "A fruity explosion with real berry flavoring and natural colors.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/407"]
    },
    {
      id: 7,
      name: "Truffle Parmesan",
      price: 85.00,
      category: "FLAVOR",
      description: "Gourmet truffle oil with aged parmesan for sophisticated taste.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/408", "/api/placeholder/400/409"]
    },
    {
      id: 8,
      name: "Cinnamon Sugar",
      price: 58.00,
      category: "FLAVOR",
      description: "Classic cinnamon and sugar blend that brings back childhood memories.",
      images: ["/api/placeholder/300/300"]
    }
  ]);

  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(allFlavors.length);
      setIsLoading(false);
    }, 500);
  };

  const handleMoreInfo = (flavor) => {
    const slug = flavor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    // Navigate to new page
    window.location.href = `/flavors/${slug}`;
  };

  const visibleFlavors = allFlavors.slice(0, visibleCount);
  const hasMore = visibleCount < allFlavors.length;

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
          {visibleFlavors.map((flavor, index) => (
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
                        src={flavor.images[0]}
                        alt={flavor.name}
                        fill
                        className="object-contain drop-shadow-2xl w-full h-full transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Category Badge */}
                <span className="inline-block px-4 py-1.5 bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {flavor.category}
                </span>

                {/* Title and Price */}
                <div className="flex items-start justify-between py-1">
                  <h3 className="text-xl lg:text-[22px] font-bold text-black transition-colors duration-300 flex-1 pr-4">
                    {flavor.name}
                  </h3>
                  <span className="text-xl lg:text-[22px] font-semibold text-black flex-shrink-0">
                    ${flavor.price.toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-black text-[16px] font-normal leading-relaxed">
                  {flavor.description}
                </p>

                {/* Action Buttons */}
                <div className='flex items-center gap-4'>
                  <button 
                    onClick={() => handleMoreInfo(flavor)}
                    className="w-full inline-flex items-center gap-3 justify-center mt-6 bg-[#000] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none"
                  >
                    More Info
                  </button>
                  <button className="w-full inline-flex items-center whitespace-nowrap gap-3 justify-center mt-6 bg-[#000] text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none">
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 11-1 9"/>
                      <path d="m19 11-4-7"/>
                      <path d="M2 11h20"/>
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/>
                      <path d="M4.5 15.5h15"/>
                      <path d="m5 11 4-7"/>
                      <path d="m9 11 1 9"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-black text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AllFlavorsSection;