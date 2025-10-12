"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import SharePopup from '../Store-demoComponents/SharePopup';
import Image from "next/image";
import ProjectSharePopup from "../ui/ProjectSharePopup";

const ExploreProjectsSlider = ({ campaigns, campaignsLoading, campaignsError, globalSettings }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  console.log('ExploreProjectsSlider received:', { campaigns, campaignsLoading, campaignsError });

  // Get currency from global settings
  const getCurrency = () => {
    if (!globalSettings) return '$';
    const currencySetting = globalSettings.find(setting => setting.config_key === 'campaign_currency');
    return currencySetting?.config_value || '$';
  };

  const transformCampaigns = (campaignsData) => {
    if (!campaignsData) return [];

    const currency = getCurrency();

    return campaignsData.map(campaign => {
      const collectedAmount = parseFloat(campaign.collected_amount) || 0;
      const raiseAmount = parseFloat(campaign.raise_amount) || 1;
      const percentage = Math.floor((collectedAmount / raiseAmount) * 100);

      // Format numbers with k suffix for thousands
      const formatNumber = (num) => {
        if (num >= 1000) {
          return (num / 1000).toFixed(0) + 'k';
        }
        return num.toString();
      };

      return {
        id: campaign.id,
        slug: campaign.slug,
        title: campaign.campaign_title,
        author: campaign.fundraiser?.name || "Unknown",
        category: campaign.campaign_categories?.[0]?.campaign_category?.name || "Campaign",
        categoryColor: "bg-[#8bc34a]",
        image: campaign.galleries?.[0]?.image 
          ? (campaign.galleries[0].image.startsWith('uploads') 
              ? `https://onebigmediacompany.online/${campaign.galleries[0].image}`
              : campaign.galleries[0].image)
          : campaign.campaign_image?.trim()
            ? (campaign.campaign_image.trim().startsWith('uploads')
                ? `https://onebigmediacompany.online/${campaign.campaign_image.trim()}`
                : campaign.campaign_image.trim())
            : '/pop_packet.png',
        raised: `${currency}${formatNumber(raiseAmount)}`,
        goal: `${currency}${formatNumber(raiseAmount)}`,
        percentage: Math.min(percentage, 100),
        date: new Date(campaign.campaign_time).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };
    });
  };

  const originalProjects = transformCampaigns(campaigns);
  const shouldShowSlider = originalProjects.length >= 4;

  // ✅ Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // ✅ Items per view
  const itemsPerView = isMobile ? 1 : 7;

  // ✅ Clone projects for infinite loop (only if using slider)
  const projects = shouldShowSlider ? [
    ...originalProjects.slice(-itemsPerView), // Last items at start
    ...originalProjects,
    ...originalProjects.slice(0, itemsPerView), // First items at end
  ] : originalProjects;

  // ✅ Start from first real slide (after cloned items)
  useEffect(() => {
    if (shouldShowSlider) {
      setCurrentSlide(itemsPerView);
    } else {
      setCurrentSlide(0);
    }
  }, [itemsPerView, shouldShowSlider]);

  // ✅ Handle transition end for seamless loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // Jump to real start/end if at clones
    if (currentSlide === 0) {
      setCurrentSlide(originalProjects.length);
    } else if (currentSlide >= originalProjects.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  // ✅ Next Slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // ✅ Previous Slide
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };
const [shareProject, setShareProject] = useState(null);
const [openShare, setOpenShare] = useState(false);
const imageLoader = ({ src, width }) => `${src}?w=${width}`;

const ProjectCard = ({ project }) => (
  <div
    className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-[450px]"  
    onClick={() => (window.location.href = `/campaigns/${project.slug}`)}
  >
    {/* Image wrapper – relative so share icon can sit on top-right */}
    <div className="relative h-48 overflow-hidden">
      <Image
        src={project.image || '/pop_packet.png'}
        alt={project.title}
        fill
        className="object-fill object-center group-hover:scale-105 transition-transform duration-500"
        loader={imageLoader}
        onError={(e) => {
          e.target.src = '/pop_packet.png';
        }}
      />

      {/* Share icon – top-right corner over image */}
      <div
        className="absolute top-2 right-2 z-10 bg-white/70 backdrop-blur-sm cursor-pointer rounded-full p-2 shadow-md hover:bg-white transition-colors"
  onClick={(e) => {
    e.stopPropagation();
    setShareProject(project);   // ← data save
    setOpenShare(true);         // ← popup open
  }}
        //  onClick={() => setShowSharePopup(true)}
        aria-label="Share"
      >
        {/* HeroIcons outline share icon – replace with your own if needed */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.316l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
      </div>
    </div>

    <div className="p-6 relative">
      <div className="absolute -top-3 left-4">
        <span
          className={`px-4 shadow-2xl py-2 text-white text-sm font-medium ${project.categoryColor}`}
        >
          {project.category}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-6 mb-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-500" />
        </div>
        <span className="text-sm font-semibold text-gray-600">{project.author}</span>
      </div>

      <h3 className="sub_heading mt-3 font-semibold text-gray-800 mb-4 line-clamp-2 group-hover:text-[#8bc34a] transition-colors">
        {project.title}
      </h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Raised of {project.raised}
          </span>
          <span className="text-sm font-bold text-gray-800">
            {project.percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 h-1">
          <div
            className="bg-[#8bc34a] h-1 transition-all duration-300"
            style={{ width: `${project.percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>{project.date}</span>
      </div>
    </div>

  </div>
);

  // Shimmer component for loading state
  const ShimmerCard = () => (
    <div className="bg-white rounded shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="absolute -top-3 left-4">
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2 mt-6 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full h-1 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Show loading state with shimmer
  if (campaignsLoading) {
    return (
      <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Shimmer */}
          <div className="hidden md:block container w-full mx-12 py-4">
            <div className="flex gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-1/4 flex-shrink-0">
                  <ShimmerCard />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Shimmer */}
          <div className="md:hidden relative">
            <div className="overflow-hidden pb-2">
              <div className="flex">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <ShimmerCard />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (campaignsError) {
    return (
      <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400 text-xl">Error loading campaigns: {campaignsError}</div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state only when not loading and no campaigns
  if (!campaignsLoading && !campaignsError && (!campaigns || campaigns.length === 0)) {
    return (
      <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">No campaigns available</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-black relative overflow-hidden ">
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
        {shouldShowSlider ? (
          <>
            {/* ✅ Desktop Infinite Slider */}
            <div className="hidden md:block container w-full mx-12 py-4">
              <div
                ref={sliderRef}
                className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
                onTransitionEnd={handleTransitionEnd}

              >
                {projects.map((project, index) => (
                  <div key={`${project.id}-${index}`} className="w-1/4 flex-shrink-0">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Mobile Infinite Slider */}
            <div className="md:hidden relative">
              <div className="overflow-hidden pb-2 ">
                <div
                  className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTransitionEnd={handleTransitionEnd}

                >
                  {projects.map((project, index) => (
                    <div key={`${project.id}-${index}`} className="w-full flex-shrink-0 px-2">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ✅ Grid Layout for less than 4 campaigns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {originalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
   {/* popup */}
{shareProject && (
  <ProjectSharePopup
    isOpen={openShare}
    onClose={() => {
      setOpenShare(false);
      setShareProject(null);   // cleanup
    }}
    project={shareProject}
  />
)}
    </section>
  );
};

export default ExploreProjectsSlider;