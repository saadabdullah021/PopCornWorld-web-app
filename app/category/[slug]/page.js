// app/category/[slug]/page.js
'use client'

import { categories } from '../../lib/data'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowLeft, Star, Clock, Zap } from 'lucide-react'

export default function CategoryDetailsPage({ params }) {
    const router = useRouter();
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const foundCategory = categories.find(cat => cat.slug === params.slug);

        if (!foundCategory && !isLoading) {
            router.push('/');
            return;
        }

        setCategory(foundCategory);
        setIsLoading(false);
    }, [params.slug, router, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gradient-to-r from-gray-200 to-orange-50 rounded-xl w-1/3 mx-auto mb-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-16"></div>

                        <div className="max-w-md mx-auto mb-12">
                            <div className="h-14 bg-white rounded-2xl shadow-lg"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg h-64">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 lg:pt-48 lg:pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Category Not Found</h2>
                    <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-[#8BC34A] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        )
    }

    const filteredFlavors = category.flavors.filter(flavor =>
        flavor.name.toLowerCase().includes(search.toLowerCase()) ||
        flavor.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="min-h-screen bg-gray-50  pt-6 lg:pt-24 lg:pb-12">
            {/* Header */}
            <div className="pt-32 pb-16 relative overflow-hidden">

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Categories
                    </button>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
                            <Zap className="w-6 h-6 text-[#8BC34A]" />
                            <span className="text-sm font-semibold text-black">Popular Category</span>
                        </div>
                        <h1 className="font-splash main_heading text-black bg-clip-text  mb-4 lg:mb-8">
                            {category.title}
                        </h1>
                        <p className="main_description max-w-2xl mx-auto leading-relaxed">
                            Discover our premium collection of {category.title.toLowerCase()} flavors, carefully crafted for exceptional taste experiences.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search campaigns by title, author, or category..."
                                className="block w-full pl-12 pr-12 py-4 text-base border-gray-200 rounded-full shadow-xl border focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-black"
                            />

                        </div>

                    </div>
                </div>
            </div>

            {/* Flavors Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-24">
                <div className="flex items-center justify-between  mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl lg:text-2xl font-bold text-black">
                            Available Flavors
                            <span className="ml-3 bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium">
                                {filteredFlavors.length} {filteredFlavors.length === 1 ? 'item' : 'items'}
                            </span>
                        </h2>
                    </div>

                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            Clear search
                        </button>
                    )}
                </div>

                {filteredFlavors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredFlavors.map((flavor) => (
                            <div
                                key={flavor.id}
                                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 relative overflow-hidden"
                            >
                                {/* Premium Badge */}
                                {flavor.tags.includes('premium') && (
                                    <div className="absolute top-4 right-4 bg-[#ffc222] text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                                        PREMIUM
                                    </div>
                                )}


                                <div className="relative z-10">
                                    {/* Flavor Header */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-black transition-colors duration-300 line-clamp-2">
                                            {flavor.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium text-gray-600">4.8</span>
                                            </div>
                                            <span className="text-gray-300">•</span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-gray-600" />
                                                <span className="text-sm text-gray-900">Quick Prep</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <p className="text-2xl font-bold  bg-clip-text text-black">
                                            {flavor.price}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {flavor.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-black rounded-full text-xs font-medium border border-gray-200/50 group-hover:border-gray-300 transition-colors duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>


                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center jusify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-gray-700" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No flavors found</h3>
                        <p className="text-black mb-8 max-w-md mx-auto">
                            We couldn't find any flavors matching "<span className="font-semibold text-gray-800">{search}</span>". Try different keywords or browse all flavors.
                        </p>
                        <button
                            onClick={() => setSearch('')}
                            className="bg-[#8BC34A] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Show All Flavors
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}