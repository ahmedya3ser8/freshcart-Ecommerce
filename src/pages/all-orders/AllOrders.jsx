import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import OrderItem from '../../components/order-item/OrderItem';

export default function AllOrders() {
  let userId = localStorage.getItem('userId');
  function getAllUserOrders() {
    return axios.get(`/api/v1/orders/user/${userId}`);
  }
  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['allorders'],
    queryFn: getAllUserOrders,
    gcTime: 1000 * 60,
    select: (data) => data.data
  })
  if (isError) {
    return <p> {error} </p>
  }
  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loader"></span>
    </div>
  }
  return (
    <section className="pt-10">
        <div className="container max-w-screen-xl">
          <h2 className="text-[#090f41] text-3xl mb-4">Orders Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.map((order) => (
              <div key={order.id} className="bg-white rounded-md p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[#090f41] text-2xl">Order ID: {order.id} </h4>
                  <div className="flex gap-2">
                    {order.isPaid ? <span className="text-[#f97316] bg-[#fff7ed]  p-2 rounded-md text-sm">Unpaid</span> :  <span className="text-[#22c55e] bg-[#f0fdf4]  p-2 rounded-md text-sm">Paid</span>}
                    <span className="text-[#0ea5e9] bg-[#f0f9ff] p-2 rounded-md text-sm">On Delivery</span>
                  </div>
                </div>
                <div className="h-[250px] overflow-y-auto border border-[#D1D1D8]">
                  {order.cartItems.map((product) => (
                    <OrderItem key={product._id} {...product} />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[60%_minmax(0,1fr)] gap-5 py-5">
                  <ul className="bg-[#F9F9F9] rounded-md p-4">
                    <li className="mb-2 text-[#090f41] font-medium">Mobile: <span className="text-gray-300"> {order.shippingAddress.phone} </span></li>
                    <li className="mb-2 text-[#090f41] font-medium">Address: <span className="text-gray-300">{order.shippingAddress.city}</span></li>
                    <li className="mb-2 text-[#090f41] font-medium">City: <span className="text-gray-300">{order.shippingAddress.city}</span></li>
                    <li className="mb-2 text-[#090f41] font-medium">Country: <span className="text-gray-300">Egypt</span></li>
                    <li className="mb-2 text-[#090f41] font-medium">Payment Method: <span className="text-gray-300">{order.paymentMethodType}</span></li>
                  </ul>
                  <ul className="bg-[#F9F9F9] rounded-md p-4">
                    <li className="flex justify-between items-center mb-3">
                      <span className="text-[#090f41]">Subtotal</span>
                      <span className="text-gray-300"> {order.totalOrderPrice} EGP</span>
                    </li>
                    <li className="flex justify-between items-center mb-3">
                      <span className="text-[#090f41]">Shipping</span>
                      <span className="text-gray-300"> {order.shippingPrice} EGP</span>
                    </li>
                    <li className="border-b border-[#D1D1D8] flex justify-between items-center mb-3 pb-4">
                      <span className="text-[#090f41]">Tax</span>
                      <span className="text-gray-300"> {order.taxPrice} EGP</span>
                    </li>
                    <li className="flex justify-between items-center pb-4 text-[#090f41] font-medium">
                      <span>Total</span>
                      <span>{order.totalOrderPrice} EGP</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}
