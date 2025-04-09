import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Login() {
  let [apiError, setApiError] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function handleLogin(values) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
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
    email: yup.string()
      .email('enter valid email')
      .required('email is required'),
    password: yup.string()
      .required('password is required')
      .min(6, 'password should be more than or equal 6 chars or more')
      .matches(/^[A-Z][a-z0-9]{7,}$/, 'password must start with upperCase then any 6 chars or more'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validate: validation,
    validationSchema,
    onSubmit: handleLogin
  })
  return (
    <section className='w-full md:w-2/3 mx-auto pb-10 my-10'>
      <h2 className='text-center text-green-600 text-3xl mb-5 font-semibold'>Login</h2>
      <form onSubmit={formik.handleSubmit} className='max-w-xl mx-auto p-5 border border-green-600 rounded-lg'>
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
        <button type='submit' className='btn'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
        </button>
        <p className='text-center pt-2'>you don't have an account? 
          <Link to="/register" className='text-green-500 underline ms-1'>Register</Link>
        </p>
        {apiError ? <p className='text-red-500 text-center pt-2'> {apiError} </p> : null}
      </form>
    </section>
  )
}
