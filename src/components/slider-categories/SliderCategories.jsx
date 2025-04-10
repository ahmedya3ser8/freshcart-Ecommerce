import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function SliderCategories() {
  let [categories, setCategories] = useState([]);
  async function getAllCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <section className="popular-categories py-10 overflow-hidden">
      <h2 className="text-green-600 mb-4 font-bold text-3xl">Popular Categories</h2>
      <Swiper          
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          >
          {categories.map((cat) => (
            <SwiperSlide>
              <div key={cat._id} className="border border-green-500 p-2 rounded-2xl overflow-hidden">
                <img src={cat.image} className="h-[150px] w-full object-contain" alt="category-image" />
                <h3 className="text-green-600 text-xl text-center my-3 mx-2"> {cat.name} </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  )
}
