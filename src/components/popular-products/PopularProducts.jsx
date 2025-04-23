import React from 'react';
import useProducts from '../../hooks/useProducts';
import ProductItem from '../product-item/ProductItem';


export default function PopularProducts() {
  let { data, isError, error, isLoading } = useProducts();
  if (isError) {
    return <p> {error} </p>
  }
  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loader"></span>
    </div>
  }
  return (
    <section className='popular-products'>
      <h2 className='text-green-600 mb-4 font-bold text-3xl'>Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {data?.slice(0,12).map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
