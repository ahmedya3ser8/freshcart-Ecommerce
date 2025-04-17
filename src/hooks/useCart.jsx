import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCart() {
  let headers = {
    token: localStorage.getItem('user-token')
  }
  function getAllCartProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    });
  }
  let data = useQuery({
    queryKey: ['cart'],
    queryFn: getAllCartProducts,
    select: (data) => data.data.data 
  })
  return data
}
