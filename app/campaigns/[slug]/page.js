'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCampaign } from '../../services/api';
import { addNotification, fetchProducts, fetchCollections } from '../../store/slices/appSlice';
import { ArrowLeft, Calendar, User, Heart, Share2, DollarSign, Target, Clock } from 'lucide-react';

const CampaignDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const { globalSettings, products, productsLoading, productsError, productsPagination, collections, collectionsLoading, collectionsError, collectionsPagination } = useSelector(state => state.app);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flavors');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const slug = params?.slug;
    
    if (slug) {
      getSingleCampaign(
        slug,
        (data) => {
          setCampaign(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
          router.push('/404');
        }
      );
    } else {
      setLoading(false);
    }
  }, [params?.slug, router]);

  useEffect(() => {
    if (!products && !productsLoading) {
      dispatch(fetchProducts({ page: 1, per_page: 6 }));
    }
    if (!collections && !collectionsLoading) {
      dispatch(fetchCollections({ page: 1, per_page: 6 }));
    }
  }, [dispatch, products, productsLoading, collections, collectionsLoading]);

  const getCurrency = () => {
    if (!globalSettings) return "$";
    const currencySetting = globalSettings.find(
      (setting) => setting.config_key === "campaign_currency"
    );
    return currencySetting?.config_value || "$";
  };

  const handleBack = () => {
    router.push('/campaigns');
  };

  const handleSupport = () => {
    dispatch(addNotification({
      message: 'Thank you for your support!',
      type: 'success'
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign?.campaign_title,
        text: campaign?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(addNotification({
        message: 'Link copied to clipboard!',
        type: 'success'
      }));
    }
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8BC34A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Campaign Not Found</h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-[#8BC34A] text-white rounded-full hover:bg-[#7CB342] transition-colors"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.min((parseFloat(campaign.collected_amount) / parseFloat(campaign.raise_amount)) * 100, 100);
  const currency = getCurrency();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-[#8BC34A] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Campaigns</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-80 md:h-[500px]">
                <Image
                  src={campaign.campaign_image ? `https://onebigmediacompany.online/${campaign.campaign_image}` : '/pop_packet.png'}
                  alt={campaign.campaign_title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = '/pop_packet.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8BC34A] to-[#7CB342] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{campaign.fundraiser?.name}</p>
                    <p className="text-sm text-gray-500">Campaign Organizer</p>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  {campaign.campaign_title}
                </h1>

                <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                  {campaign.description && (
                    <div 
                      className="text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: campaign.description }} 
                    />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4 text-[#8BC34A]" />
                    <span className="text-gray-700 font-medium">Created {new Date(campaign.campaign_time).toLocaleDateString()}</span>
                  </div>
                  {campaign.end_time && (
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-[#8BC34A]" />
                      <span className="text-gray-700 font-medium">Ends {new Date(campaign.end_time).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Support This Campaign</h2>
                <p className="text-gray-600 text-lg">Help make a difference today</p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-800">
                    {currency}{parseFloat(campaign.collected_amount).toLocaleString()}
                  </span>
                  <span className="text-lg font-bold text-[#8BC34A]">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#8BC34A] to-[#7CB342] h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-center text-gray-600 mt-3 font-medium">
                  of {currency}{parseFloat(campaign.raise_amount).toLocaleString()} goal
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <button
                  onClick={handleSupport}
                  className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] text-white py-4 px-6 rounded-full font-bold text-lg hover:from-[#7CB342] hover:to-[#6BA03A] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                >
                  <Heart className="w-6 h-6" />
                  Support Campaign
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-full font-semibold text-lg hover:border-[#8BC34A] hover:text-[#8BC34A] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Share2 className="w-6 h-6" />
                  Share Campaign
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-600 font-medium">Campaign ID</span>
                  <span className="font-bold text-gray-800">#{campaign.id}</span>
                </div>
                {campaign.link?.qr_code && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Scan QR Code</p>
                    <div className="bg-gray-50 p-4 rounded-xl inline-block">
                      <Image
                        src={`https://onebigmediacompany.online/storage/${campaign.link.qr_code}`}
                        alt="QR Code"
                        width={120}
                        height={120}
                        className="mx-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Support with Delicious Popcorn
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most delicious way to support this campaign. Choose from our amazing flavors and collections.
            </p>
          </div>

          {/* Shop By Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <div className="flex items-center space-x-2">
              <span className="text-black font-semibold text-lg">Shop By</span>
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
              
              {[
                { id: 'flavors', label: 'All Flavours' },
                { id: 'collections', label: 'Collections' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative z-10 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ease-in-out transform focus:outline-none ${
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

          {/* Content Section with Smooth Transitions */}
          <div className="relative overflow-hidden">
            <div 
              className={`transition-all duration-300 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 transform translate-y-4' 
                  : 'opacity-100 transform translate-y-0'
              }`}
            >
              {activeTab === 'flavors' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsLoading && (!products || products.length === 0) ? (
                      <div className="col-span-full flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8BC34A]"></div>
                      </div>
                    ) : products && products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={product.product_images?.[0]?.thumbnail || '/pop_packet.png'}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src = '/pop_packet.png';
                              }}
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                            <p className="text-lg font-bold text-[#8BC34A] mb-4">
                              {currency}{product.price}
                            </p>
                            <button
                              onClick={() => window.location.href = `/flavors/${product.slug}`}
                              className="w-full bg-[#8BC34A] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#7CB342] transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-600">No flavors available at the moment.</p>
                      </div>
                    )}
                  </div>

                  {/* Load More Button for Products */}
                  {productsPagination && products && products.length < productsPagination.totalRecords && (
                    <div className="text-center mt-12">
                      <button
                        onClick={handleLoadMoreProducts}
                        disabled={productsLoading}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#8BC34A] to-[#7CB342] hover:from-[#7CB342] hover:to-[#6BA03A] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#8BC34A] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {productsLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Loading...
                          </>
                        ) : (
                          'Load More Flavors'
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collectionsLoading && (!collections || collections.length === 0) ? (
                      <div className="col-span-full flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8BC34A]"></div>
                      </div>
                    ) : collections && collections.length > 0 ? (
                      collections.map((collection) => (
                        <div key={collection.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={collection.collection_images?.[0]?.thumbnail || '/pop_packet.png'}
                              alt={collection.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src = '/pop_packet.png';
                              }}
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{collection.name}</h3>
                            <p className="text-lg font-bold text-[#8BC34A] mb-4">
                              {currency}{collection.price}
                            </p>
                            <button
                              onClick={() => window.location.href = `/collections/${collection.slug}`}
                              className="w-full bg-[#8BC34A] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#7CB342] transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-600">No collections available at the moment.</p>
                      </div>
                    )}
                  </div>

                  {/* Load More Button for Collections */}
                  {collectionsPagination && collections && collections.length < collectionsPagination.totalRecords && (
                    <div className="text-center mt-12">
                      <button
                        onClick={handleLoadMoreCollections}
                        disabled={collectionsLoading}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#8BC34A] to-[#7CB342] hover:from-[#7CB342] hover:to-[#6BA03A] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#8BC34A] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {collectionsLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Loading...
                          </>
                        ) : (
                          'Load More Collections'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignDetailPage;
