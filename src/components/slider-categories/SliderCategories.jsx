import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import CategoryItem from '../category-item/CategoryItem';

export default function SliderCategories() {

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {data, isError, error, isLoading} = useQuery({
    queryKey: ['sliderCategories'],
    queryFn: getAllCategories,
    select: (data) => data.data.data
  })

  if (isError) {
    return <p> {error} </p>
  }

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loader"></span>
    </div>
  }
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
          {data.map((cat) => (
            <SwiperSlide>
              <CategoryItem key={cat._id} {...cat} />
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  )
}
