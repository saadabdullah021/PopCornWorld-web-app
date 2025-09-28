'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import demoImage from '../../../public/dance_fundraiser.png';

const FlavorDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [flavor, setFlavor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with your API data
  const allFlavors = [
    {
      id: 1,
      name: "Spicy and Savory",
      slug: "spicy-and-savory",
      price: 65.00,
      category: "FLAVOR",
      description: "A blaze of spicy, cheezy perfection with a kick that won't quit.",
      images: [demoImage, "/api/placeholder/400/400", "/api/placeholder/400/401"]
    },
    {
      id: 2,
      name: "Savory and Salty",
      slug: "savory-and-salty",
      price: 76.00,
      category: "FLAVOR",
      description: "Fluffy, buttery popcorn with a slightly salted to perfection.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/402", "/api/placeholder/400/403"]
    },
    {
      id: 3,
      name: "Savory",
      slug: "savory",
      price: 56.00,
      category: "FLAVOR",
      description: "Tasty popcorn with an elegant coating of creamy white cheddar.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/404"]
    },
    {
      id: 4,
      name: "Sweet Caramel",
      slug: "sweet-caramel",
      price: 68.00,
      category: "FLAVOR",
      description: "Rich, buttery caramel coating that melts in your mouth.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/405", "/api/placeholder/400/406"]
    },
    {
      id: 5,
      name: "Chocolate Delight",
      slug: "chocolate-delight",
      price: 72.00,
      category: "FLAVOR",
      description: "Premium chocolate drizzled popcorn for the ultimate treat.",
      images: ["/api/placeholder/300/300"]
    },
    {
      id: 6,
      name: "Mixed Berry",
      slug: "mixed-berry",
      price: 70.00,
      category: "FLAVOR",
      description: "A fruity explosion with real berry flavoring and natural colors.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/407"]
    },
    {
      id: 7,
      name: "Truffle Parmesan",
      slug: "truffle-parmesan",
      price: 85.00,
      category: "FLAVOR",
      description: "Gourmet truffle oil with aged parmesan for sophisticated taste.",
      images: ["/api/placeholder/300/300", "/api/placeholder/400/408", "/api/placeholder/400/409"]
    },
    {
      id: 8,
      name: "Cinnamon Sugar",
      slug: "cinnamon-sugar",
      price: 58.00,
      category: "FLAVOR",
      description: "Classic cinnamon and sugar blend that brings back childhood memories.",
      images: ["/api/placeholder/300/300"]
    }
  ];

  useEffect(() => {
    // Get slug from URL params
    const slug = params?.slug;
    
    if (slug) {
      // Find flavor by slug
      const foundFlavor = allFlavors.find(f => f.slug === slug);
      
      if (foundFlavor) {
        setFlavor(foundFlavor);
      } else {
        // If flavor not found, redirect to 404 or all flavors page
        router.push('/404');
      }
    }
    
    setLoading(false);
  }, [params?.slug, router]);

  const handleBack = () => {
    router.push('/shop');
  };

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log(`Adding ${flavor.name} to cart for $${flavor.price}`);
    // You can integrate with your cart state management here
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black font-medium">Loading flavor details...</p>
        </div>
      </div>
    );
  }

  if (!flavor) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Flavor Not Found</h1>
          <p className="text-gray-600 mb-8">The flavor you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Back to All Flavors
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
          Back to All Flavors
        </button>

        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={handleBack}
              className="hover:text-black transition-colors"
            >
              All Flavors
            </button>
            <span>/</span>
            <span className="text-black font-medium">{flavor.name}</span>
          </div>
        </nav>

        {/* Flavor Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[400px] bg-gradient-to-br from-orange-100 to-yellow-50 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={flavor.images[selectedImageIndex]}
                alt={flavor.name}
                fill
                className="object-fill rop-shadow-2xl  transition-all duration-300"
              />
            </div>

            {/* Thumbnail Images */}
            {flavor.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {flavor.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'border-[#ffc222] shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${flavor.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Flavor Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
              {flavor.name}
            </h1>

            {/* Category */}
            <span className="inline-block px-4 py-2 bg-gray-200 text-black text-sm font-bold uppercase tracking-wider rounded-full">
              {flavor.category}
            </span>

            {/* Price */}
            <div className="text-3xl font-bold text-black">
              ${flavor.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-black text-lg leading-relaxed">
              {flavor.description}
            </p>

            {/* Static Line with Icon */}
            <div className="flex items-center gap-3 py-6 border-t border-b border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffc222] flex-shrink-0">
                <path d="m7.5 4.27 9 5.15"/>
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                <path d="m3.3 7 8.7 5 8.7-5"/>
                <path d="M12 22V12"/>
              </svg>
              <p className="text-black font-medium">
                Each order is handcrafted and ships anywhere in the USA.
              </p>
            </div>

   

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full inline-flex items-center gap-3 justify-center bg-[#000] text-white font-bold py-3 px-8 rounded-3xl transition-all duration-300 transform hover:shadow-lg focus:outline-none text-lg"
            >
              Add to Cart   ${flavor.price.toFixed(2)}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 11-1 9"/>
                <path d="m19 11-4-7"/>
                <path d="M2 11h20"/>
                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/>
                <path d="M4.5 15.5h15"/>
                <path d="m5 11 4-7"/>
                <path d="m9 11 1 9"/>
              </svg>
            </button>

        
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default FlavorDetailsPage;