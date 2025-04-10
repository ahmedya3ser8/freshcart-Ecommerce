import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function PopularProducts() {
  let [products, setProducts] = useState([]);
  async function getAllProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setProducts(data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <h2 className='text-green-600 mb-4 font-bold text-3xl'>Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {products.slice(0,12).map((product) => (
          <div key={product.id} className="card border border-green-500 pt-4 pb-2 px-2 relative rounded-2xl">
            <Link to={`product/${product.id}`}>
              <div className="image cursor-pointer">
                <img src={product.imageCover} className="w-full h-[150px] object-contain" alt="product-image" />
              </div>
            </Link>
            <div className="body mt-2">
              <h3 className="text-green-500 font-medium"> {product.category.name} </h3>
              <h4 className="text-[13px]"> {product.title.split(' ', 2).join(' ')} </h4>
              <div className="mt-2 flex justify-between items-center">
                <span> {product.price} EGP </span>
                <span>
                  <i className="fa-solid fa-star text-yellow-300"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <span className="heart absolute top-3 right-3 cursor-pointer">
                <i className="fa-solid fa-heart text-xl"></i>
              </span>
              <button className="bg-green-600 text-white p-2 mt-2 w-full rounded-lg">add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
