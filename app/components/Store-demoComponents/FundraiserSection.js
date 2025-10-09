'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import coachImage from '../../../public/leftImage.jpg'; // Replace with actual image path
import SharePopup from './SharePopup';

// Main Fundraiser Component
const FundraiserSection = ({ campaign }) => {
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Use campaign data if provided, otherwise use default data
  const fundraiserData = campaign ? {
    title: campaign.campaign_title || "Campaign Pop-Up Store",
    description: campaign.description || "Support our campaign by purchasing delicious popcorn products!",
    benefitText: "50% of each purchase benefits this fundraiser.",
    currentAmount: parseFloat(campaign.collected_amount) || 0,
    goalAmount: parseFloat(campaign.raise_amount) || 1000,
    daysToGo: campaign.remaining_time === "Expired" ? 0 : 30,
    coachImage: campaign.campaign_image ? `https://onebigmediacompany.online/${campaign.campaign_image}` : coachImage
  } : {
    title: "Coach Kim's Pop-Up Store",
    description: "Our Track team is doing a fundraiser for the upcoming season to offset the cost of travel and equipment. Help us reach our goal! Thank you for the support!",
    benefitText: "50% of each purchase benefits this fundraiser.",
    currentAmount: 475,
    goalAmount: 600,
    daysToGo: 4,
    coachImage: coachImage
  };

  const progressPercentage =
    (fundraiserData.currentAmount / fundraiserData.goalAmount) * 100;

  // === STATES ===
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedAmount, setAnimatedAmount] = useState(0);

  // === Animate Progress Bar ===
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidth(progressPercentage);
    }, 300); // thoda delay for smoothness
    return () => clearTimeout(timeout);
  }, [progressPercentage]);

  // === Animate Number Counting ===
  useEffect(() => {
    let start = 0;
    const end = fundraiserData.currentAmount;
    const duration = 1500; // 1.5s
    const stepTime = 20;

    const increment = end / (duration / stepTime);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setAnimatedAmount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(counter);
  }, [fundraiserData.currentAmount]);

  return (
    <>
      <section className="bg-[#3333cb] pt-32 pb-16 lg:pt-48 lg:pb-12  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Content Section */}
            <div className=" space-y-6 lg:space-y-8 text-white">
              {/* Title */}
              <h1 className="main_heading font-splash   leading-tight">
                {fundraiserData.title}
              </h1>

              {/* Description */}
              <div className="space-y-4">
                <p className="main_description leading-relaxed">
                  {fundraiserData.description}
                </p>
                <p className="text-base sm:text-lg font-medium">
                  {fundraiserData.benefitText}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-white bg-opacity-20 h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-1000 ease-out"
                    style={{ width: `${animatedWidth}%` }}
                  ></div>
                </div>

                {/* Progress Info */}
                <div className="flex items-center justify-between text-lg sm:text-xl font-medium">
                  <div>
                    <span className="font-bold text-xl sm:text-2xl">
                      ${animatedAmount}
                    </span>{" "}
                    <span className="font-normal">
                      sold of ${fundraiserData.goalAmount} goal!
                    </span>
                  </div>

                  <span>{fundraiserData.daysToGo} days to go</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => setShowSharePopup(true)}
                  className="bg-[#8ac24a] text-white font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 transform  hover:shadow-xl focus:outline-none  flex items-center space-x-2"
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
              <div className="relative aspect-[4/5] lg:aspect-[24/23] w-full max-w-md mx-auto lg:max-w-full">

                {/* Main Image Container */}
                <div className="relative rounded-2xl overflow-hidden h-full ">

                  {/* Person Image */}
                  <div className="absolute inset-0 flex items-center justify-center ">

                    <div className="relative w-full h-full">
                      <Image
                        src={fundraiserData.coachImage}
                        alt="Happy person holding various popcorn products from Popcorn World"
                        fill
                        className="object-fill h-full w-full object-center rounded-lg"
                        unoptimized
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