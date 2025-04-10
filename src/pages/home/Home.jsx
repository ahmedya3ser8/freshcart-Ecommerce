import React from 'react'
import PopularProducts from './../../components/popular-products/PopularProducts';
import SliderCategories from '../../components/slider-categories/SliderCategories';
import MainSlider from '../../components/main-slider/MainSlider';

export default function Home() {
  return (
    <section>
      <MainSlider />
      <SliderCategories />
      <PopularProducts />
    </section>
  )
}
