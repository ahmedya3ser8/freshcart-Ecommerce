import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  let [loading, setLoading] = useState(0);
  let headers = {
    token: localStorage.getItem('user-token')
  }
  async function addProductToCart(productId) {
    try {
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId
      }, {
        headers
      })
    } catch (error) {
      return error;
    }
  }
  async function getLoggedUserCart() {
    setLoading(true);
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      });
      setNumOfCartItems(res.data.numOfCartItems)
      return res;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }
  async function updateProductCartQuantity(productId, newCount) {
    try {
      return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        count: newCount
      }, {
        headers
      });
    } catch (error) {
      return error;
    }
  }
  async function deleteProductFromCart(productId) {
    try {
      return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers
      });
    } catch (error) {
      return error;
    }
  }
  async function clearProductsCart() {
    try {
      return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      });
    } catch (error) {
      return error;
    }
  }
  useEffect(() => {
    getLoggedUserCart();
  }, [])
  return <CartContext.Provider value={{loading, addProductToCart, getLoggedUserCart, updateProductCartQuantity, deleteProductFromCart, clearProductsCart, setNumOfCartItems, numOfCartItems}}>
    {props.children}
  </CartContext.Provider>
}
