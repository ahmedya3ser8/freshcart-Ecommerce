import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/layouts/Layout'
import Home from './components/home/Home'
import Products from './components/products/Products'
import Categories from './components/categories/Categories'
import Brands from './components/brands/Brands'
import Register from './components/register/Register'
import Login from './components/login/Login'
import NotFound from './components/not-found/NotFound'

let routes = createBrowserRouter([
  {path: '', element: <Layout />, children: [
    {index: true, element: <Home />},
    {path: 'products', element: <Products />},
    {path: 'categories', element: <Categories />},
    {path: 'brands', element: <Brands />},
    {path: 'register', element: <Register />},
    {path: 'login', element: <Login />},
    {path: '*', element: <NotFound />}
  ]}
])

function App() {
  return (
    <>
      <RouterProvider router={routes} ></RouterProvider>
    </>
  )
}

export default App
