
// 'use client'
// import FundraiserSection from "../components/Store-demoComponents/FundraiserSection";
// import ShopToggleSection from "../components/Store-demoComponents/ShopToggleSection";
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchCollections, fetchGlobalSettings } from '../store/slices/appSlice';

// export default function storeDemo() {
//   const dispatch = useDispatch();
//   const { products, productsLoading, productsError, productsPagination, collections, collectionsLoading, collectionsError, collectionsPagination, globalSettings } = useSelector(state => state.app);
  
//   useEffect(() => {
//     if (!products && !productsLoading) {
//       dispatch(fetchProducts({ page: 1, per_page: 6 }));
//     }
//     if (!collections && !collectionsLoading) {
//       dispatch(fetchCollections({ page: 1, per_page: 6 }));
//     }
//   }, [dispatch]);

//   const handleLoadMoreProducts = () => {
//     const nextPage = productsPagination.currentPage + 1;
//     dispatch(fetchProducts({ 
//       page: nextPage, 
//       per_page: productsPagination.perPage,
//       append: true 
//     }));
//   };

//   const handleLoadMoreCollections = () => {
//     const nextPage = collectionsPagination.currentPage + 1;
//     dispatch(fetchCollections({ 
//       page: nextPage, 
//       per_page: collectionsPagination.perPage,
//       append: true 
//     }));
//   };

//   return (
//     <div>
//       <FundraiserSection/>
//       <ShopToggleSection 
//         products={products}
//         productsLoading={productsLoading}
//         productsError={productsError}
//         productsPagination={productsPagination}
//         onLoadMoreProducts={handleLoadMoreProducts}
//         collections={collections}
//         collectionsLoading={collectionsLoading}
//         collectionsError={collectionsError}
//         collectionsPagination={collectionsPagination}
//         onLoadMoreCollections={handleLoadMoreCollections}
//       />
//     </div>
//   );
// }
