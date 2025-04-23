import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useProducts() {
  function getAllProducts() {
    return axios.get('/api/v1/products')
  }
  let productInfo = useQuery({
    queryKey: ['popularProducts'],
    queryFn: getAllProducts,
    // staleTime: 7000,
    // retry: 4,
    // retryDelay: 2000,
    // refetchInterval: 3000,
    // refetchIntervalInBackground: true,
    // refetchOnWindowFocus: true,
    gcTime: 1000 * 60,
    select: (data) => data.data.data
  })
  return productInfo;
}
