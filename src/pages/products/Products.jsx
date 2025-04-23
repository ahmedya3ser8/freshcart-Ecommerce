import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductItem from '../../components/product-item/ProductItem';

export default function Products() {
  let { data, isError, error, isLoading } = useProducts();
  let [searchProducts, setSearchProducts] = useState("");
  const filteredProducts = data?.filter((product) => product.title.toLowerCase().includes(searchProducts.toLowerCase()));
  if (isError) {
    return <p> {error} </p>
  }
  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loader"></span>
    </div>
  }
  return (
    <section className='mt-10'>
      <input
        value={searchProducts}
        onChange={(e) => setSearchProducts(e.target.value)} 
        type="search" 
        placeholder="search by title..." 
        className="block p-[.5rem_.75rem] text-gray-500 w-[70%] mb-6 mx-auto outline-none border border-green-600 focus:ring-0 focus:border-border-green-600 rounded-lg" 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {filteredProducts?.length > 0 ? filteredProducts?.map((product) => (
          <ProductItem key={product.id} {...product} />
        )) : <p className='text-gray-500 text-2xl text-center col-span-5'>No Products Found</p>}
      </div>
    </section>
  )
}
