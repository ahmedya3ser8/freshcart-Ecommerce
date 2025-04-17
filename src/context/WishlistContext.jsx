import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  let [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  let headers = {
    token: localStorage.getItem('user-token')
  }
  async function addProductToWishlist(productId) {
    try {
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId}, {headers})
    } catch (error) {
      return error
    }
  }
  async function getAllProductsWishlist() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
      setNumOfWishlistItems(res.data.count)
      return res;
    } catch (error) {
      return error
    }
  }
  async function removeProductFromWishlist(productId) {
    try {
      return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {headers})
    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    getAllProductsWishlist()
  }, [])
  return <WishlistContext.Provider value={{addProductToWishlist, getAllProductsWishlist, removeProductFromWishlist, setNumOfWishlistItems, numOfWishlistItems}}>
    {props.children}
  </WishlistContext.Provider>
}