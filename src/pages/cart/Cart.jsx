import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  let [cartDetails, setCartDetails] = useState([]);
  let [cartId, setCartId] = useState('');
  let {loading, getLoggedUserCart, updateProductCartQuantity, deleteProductFromCart, clearProductsCart, setNumOfCartItems, numOfCartItems} = useContext(CartContext);
  async function getAllCartProducts() {
    let res = await getLoggedUserCart();
    if (res.data.status === 'success') {
      setCartId(res.data.cartId);
      setCartDetails(res.data.data);
      setNumOfCartItems(res.data.numOfCartItems);
    }
  }
  async function updateProductQuantity(productId, newCount) {
    if (newCount === 0) {
      deleteProduct(productId);
    } else {
      let res = await updateProductCartQuantity(productId, newCount);
      if (res.data.status === 'success') {
        setCartDetails(res.data.data);
        toast.success('product quantity updated successfully', {
          position: 'top-right'
        })
      } else {
        toast.error('something error', {
          position: 'top-right'
        })
      }
    }
  }
  async function deleteProduct(productId) {
    let res = await deleteProductFromCart(productId);
    if (res.data.status === 'success') {
      setNumOfCartItems(res.data.numOfCartItems);
      setCartDetails(res.data.data);
      toast.success('product deleted successfully', {
        position: 'top-right'
      })
    } else {
      toast.error('something error', {
        position: 'top-right'
      })
    }
  }
  async function clearCart() {
    let res = await clearProductsCart();    
    if (res.data.message === 'success') {
      setCartDetails(null);
      setNumOfCartItems(0);
      toast.success('cart deleted successfully', {
        position: 'top-right'
      })
    } else {
      toast.error('something error', {
        position: 'top-right'
      })
    }
  }
  useEffect(() => {
    getAllCartProducts();
  }, []);
  return (
  <section className="pt-10">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <h2 className="text-green-500 text-3xl font-medium">Cart</h2>
        <span className="text-main-color"> {numOfCartItems} items</span>
      </div>
      <button onClick={() => clearCart()} className="py-2 px-3 rounded-md bg-green-500 text-white">
        Remove All
        <i className="fa-solid fa-trash-can ms-1" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-5 mt-7">
      <div className="bg-gray-100 p-5 rounded-md">
        {!loading ? ( 
          cartDetails?.products?.length > 0 ? cartDetails?.products?.map((product) => (
            <div key={product.product.id} className="product flex flex-col gap-3 md:flex-row md:items-center border-b border-gray-300 py-5 first:pt-0 last:border-b-0">
              <div className="image mb-3">
                <img src={product.product.imageCover} className="w-32" alt="product-image" />
              </div>
              <div className="content flex justify-between items-center flex-1">
                <div className="caption">
                  <span className="text-gray-400 text-sm mb-2 block">{product.product.category.name}</span>
                  <h3 className="text-green-500 text-xl font-semibold">{product.product.title}</h3>
                  <div className="star bg-[#fafafa] rounded-3xl py-1 px-2 w-fit flex items-center gap-1">
                    <span>{product.product.ratingsAverage}</span>
                    <i className="fa-solid fa-star text-yellow-500" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl"> {product.price} EGP</span>
                  <div className="flex items-center gap-2 mt-3">
                    <span onClick={() => deleteProduct(product.product.id)} className="h-10 px-3 text-green-500 flex justify-center items-center cursor-pointer border border-green-500 rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-white">
                      <i className="fa-solid fa-trash-can ms-1" />
                    </span>
                    <div className="btns overflow-hidden flex items-center text-text-color w-[120px] h-10 border border-green-500 rounded-xl">
                      <button onClick={() => updateProductQuantity(product.product.id, product.count - 1 )} className="w-[30%] h-full transition-all duration-300 hover:bg-green-500 hover:text-white">
                        <i className="fa-solid fa-minus" />
                      </button>
                      <span className="w-[40%] h-full flex justify-center items-center"> {product.count} </span>
                      <button onClick={() => updateProductQuantity(product.product.id, product.count + 1 )} className="w-[30%] h-full transition-all duration-300 hover:bg-green-500 hover:text-white">
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : 
          <p className="text-lg font-medium flex justify-center items-center h-full">
          You have currently <span className="mx-1 text-green-500 font-bold"> 0 items</span> in your cart.
          <Link to={'/products'} className="underline cursor-pointer text-gray-500 ms-1">
            Go To Shop
            <i className="fa-solid fa-arrow-right ms-1 text-text-color" />
          </Link>
          </p>
          ) : 
          <div className='flex justify-center items-center h-screen'>
            <span className="loader"></span>
          </div>
        }
      </div>
      <div className="bg-gray-100 p-5 rounded-md h-fit">
        <h3 className="text-text-color text-2xl mb-4">Order Summary</h3>
        <div className="border-b border-gray-300">
          <div className="flex justify-between items-center text-text-color mb-4">
            <span>Price</span>
            <span> {cartDetails?.totalCartPrice} EGP</span>
          </div>
          <div className="flex justify-between items-center text-text-color mb-4">
            <span>Shipping</span>
            <span className="text-main-color">Free</span>
          </div>
          <div className="flex justify-between items-center text-text-color mb-4">
            <span>Coupon Applied</span>
            <span>0.00EGP</span>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-between items-center text-text-color mb-4">
            <span className="uppercase">Total</span>
            <span> {cartDetails?.totalCartPrice}  EGP</span>
          </div>
          <div className="flex justify-between items-center text-text-color mb-4">
            <span>Estimated Delivery by</span>
            <span>27 Mar, 2025</span>
          </div>
          <div className="mb-4 relative">
            <input placeholder="Coupon Code" className="w-full px-2 h-[50px] rounded-lg border-none focus:ring-0 focus:shadow-none focus:border-none" type="text" />
            <button className="absolute right-[5px] top-[10%] py-2 px-3 bg-green-500 text-white rounded-md">Apply</button>
          </div>
          <Link to={`/checkout/${cartId}`}>
            <button className="p-2 w-full bg-green-500 text-white rounded-full py-3">Proceed To Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}
