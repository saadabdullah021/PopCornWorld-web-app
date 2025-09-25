'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import coachImage from '../../../public/coachKim.jpg'; // Replace with actual image path
import SharePopup from './SharePopup';

// Main Fundraiser Component
const FundraiserSection = () => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  
  // Fundraiser data - replace with your API data
  const fundraiserData = {
    title: "Coach Kim's Pop-Up Store",
    description: "Our Track team is doing a fundraiser for the upcoming season to offset the cost of travel and equipment. Help us reach our goal! Thank you for the support!",
    benefitText: "50% of each purchase benefits this fundraiser.",
    currentAmount: 475,
    goalAmount: 600,
    daysToGo: 4,
    coachImage: coachImage
  };

  const progressPercentage = (fundraiserData.currentAmount / fundraiserData.goalAmount) * 100;

  return (
    <>
      <section className="bg-gradient-to-r from-green-50  to-yellow-100 pt-32 pb-16 lg:pt-48 lg:pb-12  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content Section */}
            <div className=" space-y-6 lg:space-y-8 text-black">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight">
                {fundraiserData.title}
              </h1>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg sm:text-xl leading-relaxed">
                  {fundraiserData.description}
                </p>
                <p className="text-base sm:text-lg font-medium">
                  {fundraiserData.benefitText}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-white bg-opacity-20  h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-500  transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>

                {/* Progress Info */}
                <div className="flex items-center justify-between text-lg sm:text-xl font-bold">
                  <span>${fundraiserData.currentAmount} sold of ${fundraiserData.goalAmount} goal!</span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                    {fundraiserData.daysToGo} days to go
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  onClick={() => setShowSharePopup(true)}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform  hover:shadow-xl focus:outline-none  flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share Pop-Up Store</span>
                </button>
              </div>
            </div>

            {/* Image Section */}

                      <div className="relative">
                        <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full max-w-md mx-auto lg:max-w-full">
                         
                          {/* Main Image Container */}
                          <div className="relative rounded-2xl overflow-hidden h-full ">
                            
                            {/* Person Image */}
                            <div className="absolute inset-0 flex items-center justify-center lg:p-6">
                              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl transform rotate-3 shadow-2xl"></div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={fundraiserData.coachImage}
                                  alt="Happy person holding various popcorn products from Popcorn World"
                                  fill
                                  className="object-cover h-full w-full object-center rounded-lg"
                                 
                                  priority
                                />
                                
                    
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
        </div>
      </section>

      {/* Share Popup */}
      <SharePopup 
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        title={fundraiserData.title}
      />
    </>
  );
};

export default FundraiserSection;