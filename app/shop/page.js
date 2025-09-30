'use client'
import AllFlavorsSection from "../components/ShopComponents/AllFlavorsSection";
import CollectionsSection from "../components/ShopComponents/CollectionsSection";
import PopcornWorldSection from "../components/ShopComponents/PopcornWorldSection";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCollections } from '../store/slices/appSlice';

export default function shop() {
  const dispatch = useDispatch();
  const { products, productsLoading, productsError, collections, collectionsLoading, collectionsError } = useSelector(state => state.app);

  useEffect(() => {
    if (!products && !productsLoading) {
      dispatch(fetchProducts());
    }
    if (!collections && !collectionsLoading) {
      dispatch(fetchCollections());
    }
  }, [dispatch]);

  return (
    <div>
      <PopcornWorldSection/>
      <AllFlavorsSection 
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
      />
      <CollectionsSection 
        collections={collections}
        collectionsLoading={collectionsLoading}
        collectionsError={collectionsError}
      />
    </div>
  );
}
