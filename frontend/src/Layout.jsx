import React from 'react'
import Header from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar'

function Layout() {
  return (
    <>
        <Navbar />
        <Outlet/>
        <Footer />
    </>
  )
}

export default Layout