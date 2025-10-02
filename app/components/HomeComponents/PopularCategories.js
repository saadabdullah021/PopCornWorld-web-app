// components/PopularCategories.tsx

'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '../../lib/data' // 👈 same data

const PopularCategories = () => {
  return (
    <section className="py-12 lg:py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-5xl font-splash text-black">
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
            1024: { slidesPerView: 5 },
            640: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="pb-12" 
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link href={`/category/${category.slug}`} className="block">
                <div className="flex flex-col items-center justify-center pb-10 hover:opacity-80 transition">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden mb-3 shadow-md">
                    <Image
                      src={category.image && typeof category.image === 'string' ? category.image : '/pop_packet.png'}
                      alt={category.title}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-800">
                    {category.title}
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