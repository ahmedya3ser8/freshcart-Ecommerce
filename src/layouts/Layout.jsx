import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container py-20 min-h-screen">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
