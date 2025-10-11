'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCampaign } from '../../services/api';
import { fetchProducts, fetchCollections } from '../../store/slices/appSlice';
import FundraiserSection from '../../components/Store-demoComponents/FundraiserSection';
import ShopToggleSection from '../../components/Store-demoComponents/ShopToggleSection';

const CampaignDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const { products, productsLoading, productsError, productsPagination, collections, collectionsLoading, collectionsError, collectionsPagination } = useSelector(state => state.app);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShopSection, setShowShopSection] = useState(false);

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

  // Handle Buy Now click to show shop section
  const handleBuyNowClick = () => {
    setShowShopSection(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8BC34A]"></div>
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

  return (
    <div>
      <FundraiserSection 
        campaign={campaign} 
        showShopSection={showShopSection}
        onBuyNowClick={handleBuyNowClick}
      />
      {showShopSection && (
        <ShopToggleSection 
          products={products}
          productsLoading={productsLoading}
          productsError={productsError}
          productsPagination={productsPagination}
          onLoadMoreProducts={handleLoadMoreProducts}
          collections={collections}
          collectionsLoading={collectionsLoading}
          collectionsError={collectionsError}
          collectionsPagination={collectionsPagination}
          onLoadMoreCollections={handleLoadMoreCollections}
          link_code={campaign?.link?.link_code}
        />
      )}
    </div>
  );
};

export default CampaignDetailPage;