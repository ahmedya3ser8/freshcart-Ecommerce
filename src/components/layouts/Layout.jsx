import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container pt-20 min-h-screen">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
