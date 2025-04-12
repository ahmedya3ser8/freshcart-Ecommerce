import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
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
    try {
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      });
    } catch (error) {
      return error;
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
  return <CartContext.Provider value={{addProductToCart, getLoggedUserCart, updateProductCartQuantity, deleteProductFromCart, clearProductsCart}}>
    {props.children}
  </CartContext.Provider>
}
