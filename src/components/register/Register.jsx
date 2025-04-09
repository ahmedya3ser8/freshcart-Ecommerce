import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {
  let [apiError, setApiError] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function handleRegister(values) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          localStorage.setItem('user-token', res.data.token);
          navigate('/');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err.response.data.message);
      })
  }
  // custom validation
  let validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'name should be more than or equal 3 chars')
      .max(20, 'name should be less than or equal 20 chars')
      .required('name is required'),
    email: yup.string()
      .email('enter valid email')
      .required('email is required'),
    password: yup.string()
      .required('password is required')
      .min(6, 'password should be more than or equal 6 chars or more')
      .matches(/^[A-Z][a-z0-9]{7,}$/, 'password must start with upperCase then any 6 chars or more'),
    rePassword: yup.string()
      .required('confirm password is required')
      .oneOf([yup.ref('password')], 'password confirmation is incorrect'),
    phone: yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'accept only egypt phone numbers')
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    // validate: validation,
    validationSchema,
    onSubmit: handleRegister
  })
  return (
    <section className='w-full md:w-2/3 mx-auto pb-10 my-10'>
      <h2 className='text-center text-green-600 text-3xl mb-5 font-semibold'>Register</h2>
      <form onSubmit={formik.handleSubmit} className='max-w-xl mx-auto p-5 border border-green-600 rounded-lg'>
        <div className="mb-3">
          <label htmlFor="name" className='mb-2 block'>Name</label>
          <input type="text" id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.name && formik.touched.name ? <p className='text-red-600'> {formik.errors.name} </p> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className='mb-2 block'>Email</label>
          <input type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.email && formik.touched.email ? <p className='text-red-600'> {formik.errors.email} </p> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className='mb-2 block'>Password</label>
          <input type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.password && formik.touched.password ? <p className='text-red-600'> {formik.errors.password} </p> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="rePassword" className='mb-2 block'>Confirm Password</label>
          <input type="password" id='rePassword' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-red-600'> {formik.errors.rePassword} </p> : null}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className='mb-2 block'>Phone</label>
          <input type="tel" id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full px-2 py-1 text-gray-700 border border-green-500 focus:border-green-500 focus:ring-0 focus:shadow-none rounded-md' />
          {formik.errors.phone && formik.touched.phone ? <p className='text-red-600'> {formik.errors.phone} </p> : null}
        </div>
        <button type='submit' className='btn'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
        </button>
        <p className='text-center pt-2'>you have an account? 
          <Link to="/login" className='text-green-500 underline ms-1'>login</Link>
        </p>
        {apiError ? <p className='text-red-500 text-center pt-2'> {apiError} </p> : null}
      </form>
    </section>
  )
}
