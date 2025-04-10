import React from 'react'
import slider1 from '../../assets/slider1.avif'
import slider2 from '../../assets/slider2.avif'
import slider3 from '../../assets/slider3.avif'
import slider4 from '../../assets/slider4.avif'
import slider5 from '../../assets/slider5.avif'
import slider6 from '../../assets/grocery-banner.png'
import slider7 from '../../assets/grocery-banner-2.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function MainSlider() {
  return (
    <section className="main-slider py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_minmax(0,1fr)] rounded-2xl overflow-hidden border border-green-500">
        <Swiper
          className='w-full'
          spaceBetween={50}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          >
          <SwiperSlide>
            <img src={slider1} className="w-full h-[400px]" alt="slider-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} className="w-full h-[400px]" alt="slider-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} className="w-full h-[400px]" alt="slider-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider4} className="w-full h-[400px]" alt="slider-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider5} className="w-full h-[400px]" alt="slider-image" />
          </SwiperSlide>
        </Swiper>
        <div className="grid grid-cols-2 md:block">
          <img src={slider6} className="w-full h-[200px]" alt="grocery-banner" />
          <img src={slider7} className="w-full h-[200px]" alt="grocery-banner" />
        </div>
      </div>
    </section>
  )
}
