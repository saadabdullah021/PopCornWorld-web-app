'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Clock, Users, X } from 'lucide-react';
import SharePopup from './SharePopup';
import { clearCart } from '../../store/slices/appSlice';
import coach_Image from '../../../public/leftImage.webp';
import Image from 'next/image';

export default function FundraiserSection({ campaign, showShopSection, onBuyNowClick }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showAllSupporters, setShowAllSupporters] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedAmount, setAnimatedAmount] = useState(0);

  // Format numbers with k suffix for thousands
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  // Handle Buy Now click
  const handleBuyNowClick = () => {
    dispatch(clearCart());
    if (campaign?.slug) {
      router.push(`/campaigns/${campaign.slug}/support-campaign`);
    }
  };

  // Handle Buy button click - clear cart and show shop section
  const handleBuyClick = () => {
    dispatch(clearCart());
    if (onBuyNowClick) {
      onBuyNowClick();
    }
  };

  // Use campaign data if provided, otherwise use default data
  const fundraiserData = {
    title: campaign.campaign_title || "Corn for the Cause: Winfrey's Gala Fundraiser",
    description: campaign.description || "Help us make Pastor Preston R. Winfrey's 44th Anniversary and Retirement Gala a truly unforgettable celebration!",
    currentAmount: parseFloat(campaign.collected_amount) || 0,
    goalAmount: parseFloat(campaign.raise_amount) || 5000,
    supporters: parseInt(campaign.supporters_count) || 12,
    createdTime: campaign.created_at || '2 months',
    location: campaign.location || '315 E. 161st Place South Holland, Illinois',
    organizer: campaign.organizer || 'Retirement G.',
    coachImage: campaign.galleries?.[0]?.image
      ? (campaign.galleries[0].image.startsWith('uploads')
        ? `https://onebigmediacompany.online/${campaign.galleries[0].image}`
        : campaign.galleries[0].image)
      : campaign.campaign_image
        ? (campaign.campaign_image.startsWith('uploads')
          ? `https://onebigmediacompany.online/${campaign.campaign_image}`
          : campaign.campaign_image)
        : coach_Image,
    images: campaign.galleries && campaign.galleries.length > 0
      ? campaign.galleries.map(img => {
        const imageUrl = img.image || img.thumbnail;
        return imageUrl.startsWith('uploads')
          ? `https://onebigmediacompany.online/${imageUrl}`
          : imageUrl;
      })
      : campaign.gallery_images && campaign.gallery_images.length > 0
        ? campaign.gallery_images.map(img => {
          return img.startsWith('uploads')
            ? `https://onebigmediacompany.online/${img}`
            : img;
        })
        : [],
    recentSupporters: campaign.supporters || [],
    created_by: shortName(campaign?.fundraiser?.name)
  };

  function shortName(name) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`
      : parts[0];
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const progressPercentage = (fundraiserData.currentAmount / fundraiserData.goalAmount) * 100;
  const imageLoader = ({ src }) => src;

  // Show only first 4 supporters initially
  const visibleSupporters = fundraiserData.recentSupporters?.slice(0, 4) || [];
  const allSupporters = fundraiserData.recentSupporters || [];

  // === Animate Progress Bar ===
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidth(progressPercentage);
    }, 300);
    return () => clearTimeout(timeout);
  }, [progressPercentage]);

  // === Animate Number Counting ===
  useEffect(() => {
    let start = 0;
    const end = fundraiserData.currentAmount;
    const duration = 1500;
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
      <div className="min-h-screen bg-gray-50 pt-20 sm:pt-28 md:pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left Side - Images */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] lg:aspect-[24/23] h-[400px] w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={fundraiserData.images.length > 0 ? fundraiserData.images[selectedImage] : fundraiserData.coachImage}
                      alt="Happy person holding various popcorn products from Popcorn World"
                      fill
                      className="object-fill rounded-lg"
                      loader={imageLoader}
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>

              {fundraiserData.images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                  {fundraiserData.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                        ? 'border-[#8ac24a] ring-2 ring-[#8ac24a]'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-16 sm:h-20 object-fill" />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-[#fff] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#8ac24a] flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="main_description">
                    <strong>Created:</strong> {fundraiserData.createdTime}
                  </span>
                </div>
                <div className="flex items-start sm:items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#8ac24a] flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="main_description">
                    <strong>Created by:</strong> {fundraiserData?.created_by}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Campaign Details */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className='flex items-start justify-between'>
                  <h1 className="text-[20px] lg:text-[24px] font-bold mb-2 leading-tight">
                    {fundraiserData.title}
                  </h1>
                  <div
                    className="cursor-pointer bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
                    onClick={() => setShowSharePopup(true)}
                    aria-label="Share"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.316l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                </div>
                <p className="text-[16px] lg:text-[20px] font-semibold text-gray-700">
                  Funded: {Math.floor(progressPercentage)}%
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="w-full bg-gray-200 h-2 overflow-hidden rounded-full">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-1000 ease-out" style={{ width: `${animatedWidth}%` }}></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm sm:text-base lg:text-lg font-medium text-gray-900">
                  <div>
                    <span className="font-bold sub_heading">${formatNumber(animatedAmount)}</span>{" "}
                    <span className="font-normal">raised of ${formatNumber(fundraiserData.goalAmount)} goal!</span>
                  </div>
                </div>
                {fundraiserData.supporters > 0 && (
                  <p className="main_description text-gray-600">
                    <span className="font-bold text-gray-900">{fundraiserData.supporters}</span> supporters
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button onClick={handleBuyNowClick} className="w-full bg-[#8ac24a] text-white font-medium py-3 px-6 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:shadow-xl focus:outline-none flex items-center justify-center space-x-2">
                  Buy Now
                </button>
              </div>

     
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-8 sm:mt-12 lg:mt-2">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-12 shadow-sm">
              <div className="max-w-4xl">
                <div className="mb-2 sm:mb-4">
                  <p className="text-black sub_heading">Description</p>
                </div>
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                  <p className="text-black leading-relaxed main_description">{fundraiserData.description}</p>
                </div>
              </div>
            </div>
          </div>
                   {/* NEW SUPPORTERS SECTION - Image Design */}
              {fundraiserData.recentSupporters && fundraiserData.recentSupporters.length > 0 && (
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mt-8 sm:mt-12 lg:mt-6">
                  {/* Header with decorative diamonds */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#8BC34A] rotate-45"></div>
                      <div className="w-4 h-4 bg-[#8BC34A] rotate-45"></div>
                      <div className="w-3 h-3 bg-[#8BC34A] rotate-45"></div>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Supporters</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#8BC34A] rotate-45"></div>
                      <div className="w-4 h-4 bg-[#8BC34A] rotate-45"></div>
                      <div className="w-3 h-3 bg-[#8BC34A] rotate-45"></div>
                    </div>
                  </div>

         

                  {/* Supporters List */}
                  <div className="space-y-4">
                    {visibleSupporters.map((supporter, idx) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-800 font-bold text-lg">
                            {supporter.initial || getInitials(supporter.name)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-base mb-1">{supporter.name}</p>
                          <p className="text-lg font-bold text-gray-900 mb-1">${supporter.amount?.toLocaleString()}</p>
                          {supporter.message && <p className="text-sm text-gray-600 italic">{supporter.message}</p>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Button */}
                  {allSupporters.length > 3 && (
                    <div className="text-center mt-6">
                      <button onClick={() => setShowAllSupporters(true)} className="text-gray-800 font-semibold text-base hover:text-[#8BC34A] underline transition-colors">
                        View all supporters
                      </button>
                    </div>
                  )}
                </div>
              )}
        </div>
      </div>

      {/* Share Popup */}
      <SharePopup isOpen={showSharePopup} onClose={() => setShowSharePopup(false)} title={fundraiserData.title} />

      {/* Modal for All Supporters */}
      {showAllSupporters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8BC34A] rotate-45"></div>
                  <div className="w-3 h-3 bg-[#8BC34A] rotate-45"></div>
                  <div className="w-2 h-2 bg-[#8BC34A] rotate-45"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">All Supporters ({allSupporters.length})</h3>
              </div>
              <button onClick={() => setShowAllSupporters(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {allSupporters.map((supporter, idx) => (
                  <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-800 font-bold text-lg">{supporter.initial || getInitials(supporter.name)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base mb-1">{supporter.name}</p>
                      <p className="text-lg font-bold text-gray-900 mb-1">₹{supporter.amount?.toLocaleString()}</p>
                      {supporter.message && <p className="text-sm text-gray-600 italic">{supporter.message}</p>}
                      {supporter.time && <p className="text-xs text-gray-500 mt-1">{supporter.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button onClick={() => setShowAllSupporters(false)} className="w-full bg-[#8BC34A]  text-white font-semibold py-3 px-6 rounded-full transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}