import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  let [loading, setLoading] = useState(0);
  async function addProductToCart(productId) {
    try {
      return await axios.post(`/api/v1/cart`, {
        productId
      })
    } catch (error) {
      return error;
    }
  }
  async function getLoggedUserCart() {
    setLoading(true);
    try {
      let res = await axios.get(`/api/v1/cart`);
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
      return await axios.put(`/api/v1/cart/${productId}`, {
        count: newCount
      });
    } catch (error) {
      return error;
    }
  }
  async function deleteProductFromCart(productId) {
    try {
      return await axios.delete(`/api/v1/cart/${productId}`);
    } catch (error) {
      return error;
    }
  }
  async function clearProductsCart() {
    try {
      return await axios.delete(`/api/v1/cart`);
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
