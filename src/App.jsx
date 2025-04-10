import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './layouts/Layout'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Categories from './pages/categories/Categories'
import Brands from './pages/brands/Brands'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import UserContextProvider from './context/UserContext'
import ProtectedRoute from './routes/ProtectedRoute/ProtectedRoute'
import AuthRoute from './routes/AuthRoute/AuthRoute'
import Cart from './pages/cart/Cart';
import ProductDetails from './pages/product-details/ProductDetails'

let routes = createBrowserRouter([
  {path: '', element: <Layout />, children: [
    {index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute>},
    {path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
    {path: 'product/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
    {path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
    {path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
    {path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
    {path: 'register', element: <AuthRoute> <Register /> </AuthRoute> },
    {path: 'login', element: <AuthRoute> <Login /> </AuthRoute> },
    {path: '*', element: <NotFound />}
  ]}
])

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routes} ></RouterProvider>
      </UserContextProvider>
    </>
  )
}

export default App;
