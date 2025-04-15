import React, { useContext } from 'react'
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  function signout() {
    localStorage.removeItem('user-token');
    setUserLogin(null);
    navigate('/login');
  }
  return (
    <header className='py-4 bg-gray-100 fixed top-0 right-0 left-0 z-[999]'>
      <div className="container flex justify-between items-center">
        <div className="flex">
          <Link to="/" className="logo">
            <img src={logo} className='h-10 w-full' alt="logo" />
          </Link>
          {userLogin !== null ? <>
              <ul className='flex gap-2 items-center'>
                <li>
                  <NavLink to="/" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/products" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>Products</NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>Brands</NavLink>
                </li>
                <li>
                  <NavLink to="/allorders" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>All Orders</NavLink>
                </li>
              </ul>
            </> : null 
          }
        </div>
        <nav>
          <ul className='flex items-center'>
            <li>
              <a href="https://github.com/ahmedya3ser8" target='_blank' className='text-gray-400 p-2 text-lg font-semibold transition-colors'><i className="fa-brands fa-github"></i></a>
            </li>
            <li>
              <a href="https://www.facebook.com/ahmedya3ser8" className='text-gray-400 p-2 text-lg font-semibold transition-colors'><i className="fa-brands fa-facebook"></i></a>
            </li>
            <li>
              <a href="https://x.com/ahmed_ya3ser_8" className='text-gray-400 p-2 text-lg font-semibold transition-colors'><i className="fa-brands fa-twitter"></i></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ahmed-yasser-21382a267/" className='text-gray-400 p-2 text-lg font-semibold transition-colors'><i className="fa-brands fa-linkedin"></i></a>
            </li>
            {userLogin !== null ? <>
              <li>
              <NavLink to="/cart" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>cart</NavLink>
              </li>
              <span onClick={signout} className='text-gray-400 p-2 text-lg font-semibold transition-colors cursor-pointer'>logout</span>
              </> : <>
              <li>
                <NavLink to="/login" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>login</NavLink>
              </li>
              <li>
                <NavLink to="/register" className='text-gray-400 p-2 text-lg font-semibold transition-colors'>register</NavLink>
              </li>
            </> }
          </ul>
        </nav>
      </div>
    </header>
  )
}
