import axios from "axios";
import { createContext } from "react";

export let OrderContext = createContext();

export default function OrderContextProvider(props) {
  let headers = {
    token: localStorage.getItem('user-token')
  }
  async function onlinePayment(cartId, url, data) {
    try {
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        shippingAddress: data
      }, {
        headers
      })
    } catch (error) {
      return error;
    }
  }
  return <OrderContext.Provider value={{onlinePayment}}>
    {props.children}
  </OrderContext.Provider>
}
