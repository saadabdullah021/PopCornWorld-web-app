'use client'
import AllFlavorsSection from "../components/ShopComponents/AllFlavorsSection";
import CollectionsSection from "../components/ShopComponents/CollectionsSection";
import PopcornWorldSection from "../components/ShopComponents/PopcornWorldSection";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCollections, fetchGlobalSettings } from '../store/slices/appSlice';

export default function Shop() {
  const dispatch = useDispatch();
  const { globalSettings, products, productsLoading, productsError, productsPagination, collections, collectionsLoading, collectionsError, collectionsPagination } = useSelector(state => state.app);

  // ------- Toggle State -------
  const [activeTab, setActiveTab] = useState('flavors');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!products && !productsLoading) {
      dispatch(fetchProducts({ page: 1, per_page: 6 }));
    }
    if (!collections && !collectionsLoading) {
      dispatch(fetchCollections({ page: 1, per_page: 6 }));
    }
  }, [dispatch]);

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

  // ------- Toggle Helpers -------
  const tabs = [
    { id: 'flavors', label: 'All Flavors' },
    { id: 'collections', label: 'Collections' }
  ];

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  const getActiveComponent = () => {
    if (activeTab === 'flavors') {
      return (
        <AllFlavorsSection
          products={products}
          productsLoading={productsLoading}
          productsError={productsError}
          pagination={productsPagination}
          onLoadMore={handleLoadMoreProducts}
        />
      );
    }
    return (
      <CollectionsSection
        collections={collections}
        collectionsLoading={collectionsLoading}
        collectionsError={collectionsError}
        pagination={collectionsPagination}
        onLoadMore={handleLoadMoreCollections}
      />
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Header / Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-52">

        <div className="flex items-center justify-center space-x-4">
          <span className="text-black font-semibold text-lg">Shop By</span>
          <div className="relative bg-gray-100 p-1 rounded-full flex">
            {/* sliding bg */}
            <div
              className={`absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${activeTab === 'flavors' ? 'left-1 right-1/2' : 'left-1/2 right-1'
                }`}
            />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative z-10 px-6  py-3 rounded-full font-bold text-sm transition-all duration-300 ease-in-out transform  focus:outline-none ${activeTab === tab.id ? 'text-black shadow' : 'text-gray-600 hover:text-black'
                  }`}
                disabled={isTransitioning}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content with smooth transition */}
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
    </div>
  );
}