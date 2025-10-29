'use client'
import React, { useState } from 'react';
import AllFlavorsSection from '../ShopComponents/AllFlavorsSection';
import CollectionsSection from '../ShopComponents/CollectionsSection';

const ShopToggleSection = ({
  products, productsLoading, productsError, productsPagination, onLoadMoreProducts,
  collections, collectionsLoading, collectionsError, collectionsPagination, onLoadMoreCollections,
  link_code
}) => {
  const [activeTab, setActiveTab] = useState('flavors');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    setIsTransitioning(true);

    // Smooth transition delay
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  const tabs = [
    { id: 'flavors', label: 'All Flavors' },
    { id: 'collections', label: 'Collections' }
  ];

  const getActiveComponent = () => {
    if (activeTab === 'flavors') {
      return (
        <AllFlavorsSection
          products={products}
          productsLoading={productsLoading}
          productsError={productsError}
          pagination={productsPagination}
          onLoadMore={onLoadMoreProducts}
          link_code={link_code}
        />
      );
    } else {
      return (
        <CollectionsSection
          collections={collections}
          collectionsLoading={collectionsLoading}
          collectionsError={collectionsError}
          pagination={collectionsPagination}
          onLoadMore={onLoadMoreCollections}
          link_code={link_code}
        />
      );
    }
  };

  return (
    <section className="bg-white">
      {/* Header Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center my-8">

            <h2 className="main_heading font-splash font-medium text-black leading-tight">
              The most delicious way to support.
            </h2>
          </div>

          {/* Shop By Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-black font-semibold text-sm sm:text-lg">Shop By</span>
            </div>

            <div className="relative bg-gray-100 p-1 rounded-full flex">
              {/* Background slider */}
              <div
                className={`absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${activeTab === 'flavors'
                    ? 'left-1 right-1/2'
                    : 'left-1/2 right-1'
                  }`}
              ></div>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative z-10 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ease-in-out transform  focus:outline-none  ${activeTab === tab.id
                      ? 'text-black shadow-sm'
                      : 'text-gray-600 hover:text-black'
                    }`}
                  disabled={isTransitioning}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Smooth Transitions */}
      <div className="relative overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${isTransitioning
              ? 'opacity-0 transform translate-y-4'
              : 'opacity-100 transform translate-y-0'
            }`}
        >
          {getActiveComponent()}
        </div>
      </div>


    </section>
  );
};

export default ShopToggleSection;