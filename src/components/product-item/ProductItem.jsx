import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

export default function ProductItem({id,imageCover,category,title,price,ratingsAverage}) {
  let [loading, setLoading] = useState(false);
  let [currentId, setCurrentId] = useState('');
  let [productIds, setProductIds] = useState([]);
  let {addProductToCart, setNumOfCartItems} = useContext(CartContext);
  let {addProductToWishlist, removeProductFromWishlist, numOfWishlistItems, setNumOfWishlistItems} = useContext(WishlistContext);
  async function addToCart(productId) {
    setCurrentId(productId);
    setLoading(true);
    let res = await addProductToCart(productId);
    if (res.data.status === "success") {
      setNumOfCartItems(res.data.numOfCartItems);
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
  return (
    <div className="card border border-green-500 pt-4 pb-2 px-2 relative rounded-2xl">
      <Link to={`product/${id}`}>
        <div className="image cursor-pointer">
          <img src={imageCover} className="w-full h-[150px] object-contain" alt="product-image" />
        </div>
      </Link>
      <div className="body mt-2">
        <h3 className="text-green-500 font-medium"> {category.name} </h3>
        <h4 className="text-[13px]"> {title.split(' ', 2).join(' ')} </h4>
        <div className="mt-2 flex justify-between items-center">
          <span> {price} EGP </span>
          <span>
            <i className="fa-solid fa-star text-yellow-300"></i>
            {ratingsAverage}
          </span>
        </div>
        {productIds.includes(id) ? <span onClick={() => removeProduct(id)} className="heart absolute top-3 right-3 cursor-pointer">
          <i className="fa-solid fa-heart text-xl text-red-500"></i>
        </span> : 
        <span onClick={() => addToWishlist(id)} className="heart absolute top-3 right-3 cursor-pointer">
          <i className="fa-solid fa-heart text-xl"></i>
        </span>}
        <button onClick={() => addToCart(id)} className="bg-green-600 text-white p-2 mt-2 w-full rounded-lg">
          {loading && currentId === id ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}
        </button>
      </div>
    </div>
  )
}
