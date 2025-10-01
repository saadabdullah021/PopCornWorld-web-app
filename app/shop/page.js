'use client'
import AllFlavorsSection from "../components/ShopComponents/AllFlavorsSection";
import CollectionsSection from "../components/ShopComponents/CollectionsSection";
import PopcornWorldSection from "../components/ShopComponents/PopcornWorldSection";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCollections } from '../store/slices/appSlice';

export default function shop() {
  const dispatch = useDispatch();
  const { products, productsLoading, productsError, productsPagination, collections, collectionsLoading, collectionsError, collectionsPagination } = useSelector(state => state.app);

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
    console.log('Load More Products clicked:', {
      currentPage: productsPagination.currentPage,
      nextPage: nextPage,
      perPage: productsPagination.perPage,
      totalPages: productsPagination.totalPages
    });
    dispatch(fetchProducts({ 
      page: nextPage, 
      per_page: productsPagination.perPage,
      append: true 
    }));
  };

  const handleLoadMoreCollections = () => {
    const nextPage = collectionsPagination.currentPage + 1;
    console.log('Load More Collections clicked:', {
      currentPage: collectionsPagination.currentPage,
      nextPage: nextPage,
      perPage: collectionsPagination.perPage,
      totalPages: collectionsPagination.totalPages
    });
    dispatch(fetchCollections({ 
      page: nextPage, 
      per_page: collectionsPagination.perPage,
      append: true 
    }));
  };

  return (
    <div>
      <PopcornWorldSection/>
      <AllFlavorsSection 
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        pagination={productsPagination}
        onLoadMore={handleLoadMoreProducts}
      />
      <CollectionsSection 
        collections={collections}
        collectionsLoading={collectionsLoading}
        collectionsError={collectionsError}
        pagination={collectionsPagination}
        onLoadMore={handleLoadMoreCollections}
      />
    </div>
  );
}
