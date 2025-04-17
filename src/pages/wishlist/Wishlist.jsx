import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../context/WishlistContext'
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';

export default function Wishlist() {
  let [products, setProducts] = useState([]);
  let [productIds, setProductIds] = useState([]);
  let {getAllProductsWishlist, removeProductFromWishlist, numOfWishlistItems, setNumOfWishlistItems} = useContext(WishlistContext);
  let {addProductToCart, setNumOfCartItems, numOfCartItems} = useContext(CartContext);
  async function getAllWishlist() {
    let res = await getAllProductsWishlist();
    setProducts(res.data.data);
  }
  async function removeProduct(productId) {
    let res = await removeProductFromWishlist(productId);
    if (res.data.status === "success") {
      setNumOfWishlistItems(numOfWishlistItems - 1)
      localStorage.setItem('productIds', JSON.stringify(res.data.data));
      setProductIds(res.data.data);
      getAllWishlist();
      toast.success(res.data.message, {
        position: 'top-right'
      })
    } else {
      toast.error(res.data.message, {
        position: 'top-right'
      })
    }
  }
  async function addToCart(productId) {
    let res = await addProductToCart(productId);
    if (res.data.status === "success") {
      setNumOfCartItems(numOfCartItems + 1);
      removeProduct(productId);
      getAllWishlist();
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
    getAllWishlist()
  }, [])
  return (
    <section className='mt-10'>
      <div className="grid grid-cols-1 gap-3 md:mt-5">
        {products.length > 0 ? products.map((product) => (
          <div key={product.id} className="product bg-[#f6f6f6] flex flex-col md:flex-row items-center md:gap-5 rounded-lg border border-[#ccc] overflow-hidden">
            <div className="image w-full md:w-[10%]">
              <img src={product.imageCover} className="w-full h-[200px] md:h-[100px]" alt="product image" />
            </div>
            <div className="flex flex-1 flex-col md:flex-row gap-5 md:gap-0 w-full justify-between items-center p-4">
              <div className="content w-full">
                <h2 className="text-green-600 font-medium mb-2"> {product.title} </h2>
                <div className="flex justify-between md:justify-start gap-5">
                  <div className="price">
                    <span className="text-gray-600 font-medium"> Price : </span>
                    <span className="text-green-600"> {product.price} EGP </span>
                  </div>
                  <button onClick={() => removeProduct(product.id)}><i className="fa-solid fa-trash text-green-600 text-[18px]"></i></button>
                </div>
              </div>
              <button onClick={() => addToCart(product.id)}  className="p-2 w-full md:w-[15%] bg-green-600 text-white rounded-lg"> add to cart </button>
            </div>
          </div>
        )) : 
        <div className="flex justify-center items-center h-full">
          <p className="text-red-600 text-2xl font-medium">there are no products in your wishlist</p>
        </div>
        }
      </div>
    </section>
  )
}
