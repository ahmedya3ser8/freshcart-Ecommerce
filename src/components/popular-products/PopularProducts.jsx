import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../context/WishlistContext';

export default function PopularProducts() {
  let [loading, setLoading] = useState(false);
  let [currentId, setCurrentId] = useState('');
  let [productIds, setProductIds] = useState([]);
  let {data, isError, error, isLoading} = useProducts();
  let {addProductToCart, setNumOfCartItems, numOfCartItems} = useContext(CartContext);
  let {addProductToWishlist, removeProductFromWishlist, numOfWishlistItems, setNumOfWishlistItems} = useContext(WishlistContext);
  async function addToCart(productId) {
    setCurrentId(productId);
    setLoading(true);
    let res = await addProductToCart(productId);
    if (res.data.status === "success") {
      setNumOfCartItems(numOfCartItems + 1);
      setLoading(false);
      toast.success(res.data.message, {
        position: 'top-right'
      })
    } else {
      setLoading(false);
      toast.error(res.data.message, {
        position: 'top-right'
      })
    }
  }
  async function addToWishlist(productId) {
    let res = await addProductToWishlist(productId);
    if (res.data.status === "success") {
      setNumOfWishlistItems(numOfWishlistItems + 1)
      localStorage.setItem('productIds', JSON.stringify(res.data.data))
      setProductIds(res.data.data);
      toast.success(res.data.message, {
        position: 'top-right'
      })
    } else {
      toast.error(res.data.message, {
        position: 'top-right'
      })
    }
  }
  async function removeProduct(productId) {
    let res = await removeProductFromWishlist(productId);
    if (res.data.status === "success") {
      setNumOfWishlistItems(numOfWishlistItems - 1)
      localStorage.setItem('productIds', JSON.stringify(res.data.data))
      setProductIds(res.data.data);
      toast.success(res.data.message, {
        position: 'top-right'
      })
    } else {
      toast.error(res.data.message, {
        position: 'top-right'
      })
    }
  }
  useEffect(() => {
    if (localStorage.getItem('productIds')) {
      setProductIds(JSON.parse(localStorage.getItem('productIds')))
    }
  }, []);
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
        {data.slice(0,12).map((product) => (
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
              {productIds.includes(product.id) ? <span onClick={() => removeProduct(product.id)} className="heart absolute top-3 right-3 cursor-pointer">
                <i className="fa-solid fa-heart text-xl text-red-500"></i>
              </span> : 
              <span onClick={() => addToWishlist(product.id)} className="heart absolute top-3 right-3 cursor-pointer">
                <i className="fa-solid fa-heart text-xl"></i>
              </span>}
              <button onClick={() => addToCart(product.id)} className="bg-green-600 text-white p-2 mt-2 w-full rounded-lg">
                {loading && currentId === product.id ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
