'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getSingleCollection } from '../../services/api';
import { addToCart, addNotification } from '../../store/slices/appSlice';


const CollectionDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Get slug from URL params
        const slug = params?.slug;

        if (slug) {
            // Fetch collection data from API
            getSingleCollection(
                slug,
                (data) => {
                    // Success callback
                    setCollection(data);
                    setLoading(false);
                },
                () => {
                    // Fail callback
                    setLoading(false);
                    router.push('/404');
                }
            );
        } else {
            setLoading(false);
        }
    }, [params?.slug, router]);




    const handleBack = () => {
        router.push('/shop');
    };


    const handleAddToCart = () => {
        if (!collection) return;

        // Add collection to cart
        dispatch(addToCart({ product: collection }));

        // Show success notification
        dispatch(addNotification({
            message: `${collection.name} has been added to your cart!`,
            type: 'success'
        }));

        // Redirect to checkout page
        // router.push('/checkout');
    };

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8ac24a] mx-auto mb-4"></div>
                    <p className="text-black font-semibold">Loading collection details...</p>
                </div>
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-4">Collection Not Found</h1>
                    <p className="text-gray-600 mb-8">The collection you're looking for doesn't exist.</p>
                    <button
                        onClick={handleBack}
                        className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                    >
                        Back to All Collections
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 pt-32  lg:pt-48 xl:pt-54  lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="mb-8 inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
                >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Collections
                </button>

                {/* Breadcrumbs */}
                <nav className="mb-8" aria-label="Breadcrumb">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <button
                            onClick={handleBack}
                            className="hover:text-black transition-colors"
                        >
                            All Collections
                        </button>
                        <span>/</span>
                        <span className="text-black font-medium">{collection.name || collection.title || 'Collection'}</span>
                    </div>
                </nav>

                {/* Flavor Detail Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative h-72 lg:h-[300px] ">
                            <Image
                                src={
                                    collection?.collection_images?.[selectedImageIndex]?.image
                                        ? collection.collection_images[selectedImageIndex].image.startsWith('http')
                                            ? collection.collection_images[selectedImageIndex].image
                                            : `https://onebigmediacompany.online/${collection.collection_images[selectedImageIndex].image.trim()}`
                                        : collection.image || collection.images?.[selectedImageIndex] || '/pop_packet.png'
                                }
                                alt={collection.name || collection.title || 'Collection'}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                                className="object-fill drop-shadow-2xl transition-all duration-300"
                                onError={(e) => {
                                    e.currentTarget.src = '/pop_packet.png';
                                }}
                            />

                        </div>

                        {/* Thumbnail Images */}
                        {collection.collection_images && collection.collection_images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto px-2 py-2">
                                {collection.collection_images.map((item, index) => {
                                    const imageUrl = item?.image
                                        ? item.image.startsWith('http')
                                            ? item.image
                                            : `https://onebigmediacompany.online/${item.image.trim()}`
                                        : '/pop_packet.png';
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === index
                                                ? 'border-[#8bc34a] shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                                                }`}
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt={`${collection.name || collection.title} ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/pop_packet.png';
                                                }}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                    </div>

                    {/* Right Side - Details */}
                    <div className="space-y-6">



                        <div>
                            {/* Category */}
                            <span className="inline-block text-[#757575] text-xs font-medium leading-4 uppercase  ">


                                {collection.product_categories?.[0]?.category?.name || collection.type || collection.category || 'COLLECTION'}
                            </span>

                            <div className='flex items-center justify-between'>
                                {/* Flavor Name */}
                                <h1 className="text-[16px] leading-7 font-semibold text-black ">
                                    {collection.name || collection.title || 'Collection'}
                                </h1>



                                {/* Price */}
                                <div className="text-[16px] leading-7 font-semibold text-black flex-shrink-0 ">
                                    ${collection.price || '0.00'}
                                </div>
                            </div>

                        </div>





                        {/* Description */}
                        <div
                            className="text-black text-[16px] font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: collection.description || '' }}
                        />

                        {/* Static Line with Icon */}
                        <div className="flex items-center gap-3 py-6 border-t border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8bc34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffc222] flex-shrink-0">
                                <path d="m7.5 4.27 9 5.15" />
                                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                                <path d="m3.3 7 8.7 5 8.7-5" />
                                <path d="M12 22V12" />
                            </svg>
                            <p className="text-black font-medium">
                                Each order is handcrafted and ships anywhere in the USA.
                            </p>
                        </div>


                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full inline-flex items-center gap-3 justify-center bg-[#8bc34a] text-white font-bold py-3 px-8 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none text-lg"
                        >
                            Add to Cart   ${collection.price || '0.00'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 11-1 9" />
                                <path d="m19 11-4-7" />
                                <path d="M2 11h20" />
                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                                <path d="M4.5 15.5h15" />
                                <path d="m5 11 4-7" />
                                <path d="m9 11 1 9" />
                            </svg>
                        </button>


                    </div>
                </div>


            </div>
        </section>
    );
};

export default CollectionDetailsPage;