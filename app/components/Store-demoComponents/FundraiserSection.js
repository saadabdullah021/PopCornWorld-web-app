'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Clock, Users, X, Calendar, MapPin, Tag, Share2, Heart } from 'lucide-react';
import SharePopup from './SharePopup';
import { clearCart } from '../../store/slices/appSlice';
import coach_Image from '../../../public/leftImage.webp';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Assuming shadcn/ui or similar for tooltips

export default function FundraiserSection({ campaign }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showAllSupporters, setShowAllSupporters] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [liked, setLiked] = useState(false); // Added for interactive like button

  // Format numbers with k suffix for thousands
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toLocaleString();
  };

  // Shorten name like "Saad A." or "Anonymous"
  const shortName = (name) => {
    if (!name) return 'Anonymous';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`
      : parts[0];
  };

  // Get initials from name (e.g., "SA" for "Saad Abdullah")
  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  // Format date for "time ago" display
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Format full date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle Support click
  const handleSupportClick = () => {
    dispatch(clearCart());
    if (campaign?.slug) {
      router.push(`/campaigns/${campaign.slug}/support-campaign`);
    }
  };

  // Toggle like
  const toggleLike = () => {
    setLiked(!liked);
    // Here you could add API call to save like, but for demo it's local
  };

  // Campaign data with defaults
  const fundraiserData = {
    title: campaign.campaign_title || 'Untitled Campaign',
    description: campaign.description || 'No description available.',
    currentAmount: parseFloat(campaign?.collected_amount) || 0,
    goalAmount: parseFloat(campaign?.raise_amount) || 0,
    supporters: campaign.supporters?.length || 0,
    createdTime: formatTimeAgo(campaign.campaign_time),
    createdDate: formatDate(campaign.campaign_time),
    endTime: formatDate(campaign.end_time),
    remainingTime: campaign.remaining_time || '',
    location: campaign.location || '',
    categories: campaign.campaign_categories?.map(cc => cc.campaign_category?.name).filter(Boolean) || [],
    shareCode: campaign.share_code || '',
    qrCode: campaign.link?.qr_code || '',
    coachImage: campaign.galleries?.[0]?.image || coach_Image,
    images: campaign.galleries?.map(g => g.image) || [],
    recentSupporters: campaign.supporters?.map(s => ({
      name: s.customer?.name || 'Anonymous',
      amount: parseFloat(s.amount) || 0,
      time: formatTimeAgo(s.created_at),
      initial: getInitials(s.customer?.name || 'Anonymous'),
      message: s.message || '',
    })) || [],
    created_by: shortName(campaign?.fundraiser?.name),
  };

  // Calculate progress percentage
  const progressPercentage = fundraiserData.goalAmount > 0
    ? Math.min((fundraiserData.currentAmount / fundraiserData.goalAmount) * 100, 100)
    : 0;

  const imageLoader = ({ src }) => src;

  // Visible supporters (first 4)
  const visibleSupporters = fundraiserData.recentSupporters.slice(0, 4);
  const allSupporters = fundraiserData.recentSupporters;

  // Animate progress bar
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidth(progressPercentage);
    }, 300);
    return () => clearTimeout(timeout);
  }, [progressPercentage]);

  // Animate amount raised
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
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 sm:pt-24 md:pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Left Side - Images and Info */}
            <div className="space-y-6">
              {/* Campaign Image */}
              <div className="relative rounded-2xl overflow-hidden h-[400px] sm:h-[450px] lg:h-[500px] shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                <Image
                  src={fundraiserData.images.length > 0 ? fundraiserData.images[selectedImage] : fundraiserData.coachImage}
                  alt={fundraiserData.title}
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                  loader={imageLoader}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Thumbnail Carousel */}
              {fundraiserData.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {fundraiserData.images.map((img, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setSelectedImage(idx)}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === idx
                            ? 'border-[#8ac24a] ring-2 ring-[#8ac24a] scale-105'
                            : 'border-gray-200 hover:border-[#8ac24a] hover:scale-105'
                            }`}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View this image</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}

              {/* Campaign Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Overview</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-[#8ac24a] flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Started:</strong> {fundraiserData.createdTime} on {fundraiserData.createdDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-[#8ac24a] flex-shrink-0" />
                    <span className="text-sm">
                      <strong>By:</strong> {fundraiserData.created_by}
                    </span>
                  </div>
                  {fundraiserData.endTime && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-[#8ac24a] flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Ends in:</strong> {fundraiserData.remainingTime} ({fundraiserData.endTime})
                      </span>
                    </div>
                  )}
                  {fundraiserData.location && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-[#8ac24a] flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Location:</strong> {fundraiserData.location}
                      </span>
                    </div>
                  )}
                  {fundraiserData.categories.length > 0 && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <Tag className="w-5 h-5 text-[#8ac24a] flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Categories:</strong> {fundraiserData.categories.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Side - Campaign Details */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {fundraiserData.title}
                </h1>
                <div className="flex gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={toggleLike}
                        className={`p-2.5 rounded-full transition-all duration-200 ${liked ? 'bg-[#8ac24a] text-white' : 'bg-white shadow-md hover:bg-gray-50'
                          }`}
                        aria-label="Like campaign"
                      >
                        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{liked ? 'Unlike' : 'Like this campaign'}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
                        onClick={() => setShowSharePopup(true)}
                        aria-label="Share campaign"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share with friends</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-lg font-semibold text-gray-700">
                  {progressPercentage >= 100 ? 'Goal Achieved! 🎉' : `On Track: ${Math.floor(progressPercentage)}% Funded`}
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#8ac24a] to-[#bada55] transition-all duration-1000 ease-out"
                    style={{ width: `${animatedWidth}%` }}
                  ></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-base sm:text-lg font-medium text-gray-900">
                  <div>
                    <span className="font-bold text-[#8ac24a]">${formatNumber(animatedAmount)}</span>
                    <span className="text-gray-600"> raised towards </span>
                    <span className="font-bold">${formatNumber(fundraiserData.goalAmount)}</span>
                    <span className="text-gray-600"> goal</span>
                  </div>
                  {fundraiserData.supporters > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setShowAllSupporters(true)}
                          className="text-[#8ac24a] hover:text-[#6b9a2a] font-semibold underline transition-colors duration-200"
                        >
                          {fundraiserData.supporters} Supporter{fundraiserData.supporters !== 1 ? 's' : ''}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>See who’s supporting this cause</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>

              <button
                onClick={handleSupportClick}
                className="w-full bg-[#8ac24a] text-white font-semibold py-3.5 px-6 rounded-full text-lg transition-all duration-300 hover:bg-[#6b9a2a] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8ac24a] focus:ring-offset-2"
              >
                Join the Cause - Buy Now
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">The Story Behind This Campaign</h2>
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="whitespace-pre-wrap">{fundraiserData.description}</p>
              </div>
            </div>
          </div>

          {/* Supporters Section */}
          {fundraiserData.supporters > 0 && (
            <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl p-6 sm:p-8 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#8ac24a] rotate-45"></div>
                  <div className="w-3 h-3 bg-[#8ac24a] rotate-45"></div>
                  <div className="w-2 h-2 bg-[#8ac24a] rotate-45"></div>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Meet Our Amazing Supporters</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#8ac24a] rotate-45"></div>
                  <div className="w-3 h-3 bg-[#8ac24a] rotate-45"></div>
                  <div className="w-2 h-2 bg-[#8ac24a] rotate-45"></div>
                </div>
              </div>
              <div className="space-y-4">
                {visibleSupporters.map((supporter, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                      <span className="text-gray-700 font-semibold text-lg">{supporter.initial}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{shortName(supporter.name)}</p>
                      <p className="text-lg font-bold text-[#8ac24a]">${supporter.amount.toLocaleString()}</p>
                      {supporter.message && <p className="text-sm text-gray-600 italic mt-1">{supporter.message}</p>}
                      {supporter.time && <p className="text-xs text-gray-500 mt-1">{supporter.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
              {allSupporters.length > 4 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllSupporters(true)}
                    className="text-[#8ac24a] font-semibold hover:text-[#6b9a2a] underline transition-colors duration-200"
                  >
                    Discover All {allSupporters.length} Supporters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Share Popup */}
      <SharePopup
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        title={fundraiserData.title}
        shareCode={fundraiserData.shareCode}
      />

      {/* All Supporters Modal */}
      {showAllSupporters && fundraiserData.supporters > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#8ac24a] rotate-45"></div>
                  <div className="w-3 h-3 bg-[#8ac24a] rotate-45"></div>
                  <div className="w-2 h-2 bg-[#8ac24a] rotate-45"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">All Supporters ({allSupporters.length})</h3>
              </div>
              <button
                onClick={() => setShowAllSupporters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {allSupporters.map((supporter, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                    <span className="text-gray-700 font-semibold text-lg">{supporter.initial}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{shortName(supporter.name)}</p>
                    <p className="text-lg font-bold text-[#8ac24a]">${supporter.amount.toLocaleString()}</p>
                    {supporter.message && <p className="text-sm text-gray-600 italic mt-1">{supporter.message}</p>}
                    {supporter.time && <p className="text-xs text-gray-500 mt-1">{supporter.time}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={() => setShowAllSupporters(false)}
                className="w-full bg-[#8ac24a] text-white font-semibold py-3 rounded-full transition-all duration-200 hover:bg-[#6b9a2a] hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
}