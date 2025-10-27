
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProductsSlider } from '../../services/api'

const PopularCategories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsSlider(
      (response) => {
        setProducts(response.data || []);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="main_heading font-splash text-black">
              Popular FLAVORS
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8ac24a] mx-auto mb-4"></div>
              <p className="text-black font-semibold">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="main_heading  font-splash text-black">
            Popular FLAVORS
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          speed={900}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 6 },
            640: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`/flavors/${product.slug}`} className="block">
                <div className="flex flex-col gap-5 items-center justify-center pt-4 pb-5 lg:pb-10 lg:pt-12 hover:opacity-80 transition">

                  <Image
                    src={product.product_images && product.product_images[0] && product.product_images[0].thumbnail
                      ? product.product_images[0].thumbnail
                      : '/pop_packet.png'}
                    alt={product.title}
                    width={110}
                    height={56}
                    className="object-contain hover:scale-160 transition-transform duration-500 w-[110px] h-[56px] "
                  />

                  <h3 className="text-xs font-bold text-black">
                    {product.title}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default PopularCategories