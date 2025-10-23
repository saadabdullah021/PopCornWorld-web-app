'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCampaign } from '../../../services/api';
import { fetchProducts, fetchCollections, addToCart } from '../../../store/slices/appSlice';
import { ArrowLeft, User } from 'lucide-react';
import Image from 'next/image';
import AllFlavorsSection from '../../../components/ShopComponents/AllFlavorsSection';
import CollectionsSection from '../../../components/ShopComponents/CollectionsSection';

const SupportCampaignPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const { products, productsLoading, productsError, productsPagination, collections, collectionsLoading, collectionsError, collectionsPagination } = useSelector(state => state.app);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flavors');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (params.slug) {
      setLoading(true);
      getSingleCampaign(
        params.slug,
        (data) => {
          setCampaign(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    }
  }, [params.slug]);

  useEffect(() => {
    if (!products && !productsLoading) {
      dispatch(fetchProducts({ page: 1, per_page: 6 }));
    }
    if (!collections && !collectionsLoading) {
      dispatch(fetchCollections({ page: 1, per_page: 6 }));
    }
  }, [dispatch, products, productsLoading, collections, collectionsLoading]);

  const handleLoadMoreProducts = () => {
    const nextPage = productsPagination.currentPage + 1;
    dispatch(fetchProducts({ 
      page: nextPage, 
      per_page: productsPagination.perPage,
      append: true 
    }));
  };

  const handleLoadMoreCollections = () => {
    const nextPage = collectionsPagination.currentPage + 1;
    dispatch(fetchCollections({ 
      page: nextPage, 
      per_page: collectionsPagination.perPage,
      append: true 
    }));
  };

  const handleBackToCampaign = () => {
    router.push(`/campaigns/${params.slug}`);
  };

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
    { id: 'flavors', label: 'All Flavours' },
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
          onLoadMore={handleLoadMoreProducts}
          link_code={campaign?.link?.link_code}
          campaignData={campaign}
        />
      );
    } else {
      return (
        <CollectionsSection 
          collections={collections}
          collectionsLoading={collectionsLoading}
          collectionsError={collectionsError}
          pagination={collectionsPagination}
          onLoadMore={handleLoadMoreCollections}
          link_code={campaign?.link?.link_code}
          campaignData={campaign}
        />
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
           <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8ac24a] mx-auto mb-4"></div>
          <p className="text-black font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Not Found</h2>
          <button
            onClick={() => router.back()}
            className="bg-[#8BC34A] text-white px-6 py-3 rounded-full hover:bg-[#7CB342] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get campaign image from galleries with proper URL validation
  const getValidImageUrl = (imageUrl) => {
    if (!imageUrl) return '/pop_packet.png';
    
    try {
      // If it's already a full URL, return as is
      if (imageUrl.startsWith('http')) {
        return imageUrl;
      }
      
      // If it starts with uploads, prepend the base URL
      if (imageUrl.startsWith('uploads')) {
        return `https://onebigmediacompany.online/${imageUrl}`;
      }
      
      // If it's a relative path, prepend the base URL
      if (imageUrl.startsWith('/')) {
        return `https://onebigmediacompany.online${imageUrl}`;
      }
      
      // Default fallback
      return '/pop_packet.png';
    } catch (error) {
      console.error('Invalid image URL:', imageUrl, error);
      return '/pop_packet.png';
    }
  };

  const campaignImage = getValidImageUrl(
    campaign.galleries?.[0]?.image || campaign.campaign_image
  );

  return (
    <section className="bg-white pt-32 mt-5">


     {/* Supporting Organization Section */}
      <div className="pt-4 w-auto max-w-md mx-auto mb-6 px-4 sm:px-6 lg:px-8 cursor-pointer"
       onClick={handleBackToCampaign}>
      <div className="bg-white rounded-2xl border border-[#d6d6d6] hover:border-transparent p-4 ">
        <div className="flex items-center gap-4">
     
            <ArrowLeft className="w-6 h-6 text-gray-700" />
     

          {/* Organization Logo */}
          <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-1 border-gray-200">
            <Image
               src={campaignImage}
                  alt={campaign?.campaign_title}
              fill
              className="object-cover"
              sizes="64px"
                   onError={(e) => {
                    e.currentTarget.src = '/pop_packet.png';
                  }}
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-normal text-[#757575] leading-5 mb-0.5">
              You're supporting
            </p>
            <h2 className="text-[16px] font-medium leading-7 text-[#323232] truncate">
          {campaign?.campaign_title}
            </h2>
          </div>
        </div>
      </div>
    </div>

      {/* Header Section - Exact copy from ShopToggleSection */}
      <div className="bg-white pb-12 pt-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
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
                className={`absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                  activeTab === 'flavors' 
                    ? 'left-1 right-1/2' 
                    : 'left-1/2 right-1'
                }`}
              ></div>
              
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative z-10 px-6  py-3 rounded-full font-bold text-sm transition-all duration-300 ease-in-out transform  focus:outline-none  ${
                    activeTab === tab.id
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

      {/* Content Section with Smooth Transitions - Exact copy from ShopToggleSection */}
      <div className="relative overflow-hidden">
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isTransitioning 
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

export default SupportCampaignPage;
