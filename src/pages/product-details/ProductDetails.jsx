import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  let [product, setProduct] = useState(null);
  let [products, setProducts] = useState([]);
  let [image, setImage] = useState('');
  let { id } = useParams();
  function selectedImg(img) {
    setImage(img);
  }
  async function getProduct(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
      let relatedProducts = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
        params: {
          'category[in]': data.data.category._id
        }
      })
      setProducts(relatedProducts.data.data);
    } catch (error) {
      console.log(error.response.data.errors.msg);
    }
  }
  useEffect(() => {
    getProduct(id);
  }, [id]);
  return (
    <>
      <section className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="image flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
            <div className="w-full flex flex-row justify-between md:flex-col md:w-[100px] order-2 md:order-1">
              {product?.images.slice(0,4).map((img, index) => (
                <div key={index} onClick={() => selectedImg(img)} className="img mb-3 border border-main-color rounded-3xl cursor-pointer overflow-hidden">
                  <img src={img} className="w-[80px]" alt="product-image" />
                </div>
              ))}
            </div>
            <div className="h-[400px] md:h-[500px] w-full relative order-1 md:order-2">
              {image == '' ? <img src={product?.imageCover} className="w-full h-full" alt="product-image" /> : <img src={image} className="w-full h-full" alt="product-image" />}
              <span className="absolute top-5 right-8 w-10 h-10 rounded-full text-main-color text-lg bg-white border border-main-color flex justify-center items-center">
                <i className="fa-regular fa-heart"></i>
              </span>
            </div>
          </div>
          <div className="content">
            <div className="flex items-center gap-1 py-2">
              <i className="fa-solid fa-star text-yellow-600"></i>
              <span className="text-text-color"> {product?.ratingsAverage} </span>
              <span className="text-gray-500 text-sm">(18+)</span>
            </div>
            <h2 className="text-[#090f41] text-3xl font-semibold"> {product?.title} </h2>
            <p className="my-4 text-sm text-gray-400"> {product?.description} </p>
            <div className="product_color text-[#090f41] text-lg font-medium">
              Color :
              <span className="text-green-500"> Blue </span>
            </div>
            <ul className="product_colors flex gap-3 my-3">
              <li className="w-8 h-8 rounded-full cursor-pointer bg-[#507ccd]"></li>
              <li className="w-8 h-8 rounded-full cursor-pointer bg-[#f6f6f6]"></li>
              <li className="w-8 h-8 rounded-full cursor-pointer bg-[#c88242]"></li>
              <li className="w-8 h-8 rounded-full cursor-pointer bg-black"></li>
              <li className="w-8 h-8 rounded-full cursor-pointer bg-[#dcb9a8]"></li>
              <li className="w-8 h-8 rounded-full cursor-pointer bg-[#a7b2a3]"></li>
            </ul>
            <div className="product_size text-[#090f41] text-lg font-medium">
              Size :
              <span className="text-green-500"> Medium </span>
            </div>
            <ul className="product_sizes flex gap-3 my-3">
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> XS </li>
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> S </li>
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> M </li>
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> L </li>
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> XL </li>
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> XXL </li>
              <li className="bg-[#FCFCFD] px-4 py-2 rounded-lg cursor-pointer text-[#667085] border border-[#EAECF0]"> XXXL </li>
            </ul>
            <div className="product_quantity text-[#090f41] text-lg font-medium">
              Quantity :
              <span className="text-green-500"> {product?.quantity} </span>
            </div>
            <div className="flex gap-4 my-4">
              <div className="btns flex justify-around text-green-500 w-[160px] border border-green-500 py-3 rounded-xl">
                <button>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span>1</span>
                <button>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <button className="w-full bg-green-500 rounded-xl text-white">
                <span> {product?.price} EGP </span>
                .
                <span> Add to Cart </span>
              </button>
            </div>
            <div className="product-delivery flex gap-3 items-center text-gray-400 px-3 py-2 mt-2">
              <i className="fa-solid fa-truck"></i>
              <span>Estimated Delivery :</span>
              <span className="text-text-color font-medium"> 23 Mar 2025 - 25 Mar 2025</span>
            </div>
          </div>
        </div>
      </section>
      <section className='pt-10'>
        <h2 className="text-[#090f41] text-4xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0,4).map((product) => (
            <div key={product.id} className="card border border-green-500 pt-4 pb-2 px-2 relative rounded-2xl">
              <Link to={`/product/${product.id}`}>
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
      </section>
    </>
  )
}
