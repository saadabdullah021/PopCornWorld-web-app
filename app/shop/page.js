'use client'
import AllFlavorsSection from "../components/ShopComponents/AllFlavorsSection";
import CollectionsSection from "../components/ShopComponents/CollectionsSection";
import PopcornWorldSection from "../components/ShopComponents/PopcornWorldSection";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/appSlice';

export default function shop() {
  const dispatch = useDispatch();
  const { products, productsLoading, productsError } = useSelector(state => state.app);

  useEffect(() => {
    if (!products && !productsLoading) {
      dispatch(fetchProducts());
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
      <CollectionsSection/>
    </div>
  );
}
