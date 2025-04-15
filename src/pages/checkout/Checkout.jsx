import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { OrderContext } from '../../context/OrderContext';

export default function Checkout() {
  let {cartId} = useParams();
  let {onlinePayment} = useContext(OrderContext);
  // let [apiError, setApiError] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  async function handleCheckout(cartId, url) {
    setIsLoading(true);
    let {data} = await onlinePayment(cartId, url, formik.values);
    if (data.status === "success") {
      setIsLoading(false);
      open(data.session.url, '_self')
    }
  }
  let validationSchema = yup.object().shape({
    details: yup.string()
      .required('details is required'),
    phone: yup.string()
      .required('phone is required'),
    city: yup.string()
      .required('city is required')
  })
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema,
    onSubmit: () => handleCheckout(cartId, 'http://localhost:5173')
  })
  return (
    <section className='w-full md:w-2/3 mx-auto pb-10 my-10'>
      <h2 className='text-center text-green-600 text-3xl mb-5 font-semibold'>Login</h2>
      <form onSubmit={formik.handleSubmit} className='max-w-xl mx-auto p-5 border border-green-600 rounded-lg'>
        <div className="mb-3">
          <label htmlFor="details" className='mb-2 block'>Details</label>
          <input type="text" id='details' name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.details && formik.touched.details ? <p className='text-red-600'> {formik.errors.details} </p> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className='mb-2 block'>Phone</label>
          <input type="tel" id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.phone && formik.touched.phone ? <p className='text-red-600'> {formik.errors.phone} </p> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="city" className='mb-2 block'>City</label>
          <input type="text" id='city' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.city && formik.touched.city ? <p className='text-red-600'> {formik.errors.city} </p> : null}
        </div>
        <button type='submit' className='btn'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Checkout'}
        </button>
        {/* {apiError ? <p className='text-red-500 text-center pt-2'> {apiError} </p> : null} */}
      </form>
    </section>
  )
}
