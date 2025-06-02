import React from 'react'
import Home from './home/Home'
import { Navigate, Route, Routes } from "react-router-dom"
import Courses from './courses/Courses'
import Signup from './Components/Signup'
import Contacts from './contact/Contacts'
import Abouts from './abouts/Abouts'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/Authprovider'
import BookDetail from './bookdetail/BookDetail'
import Cart from './Components/Cart'
import { CartProvider } from './context/CartProvider'

const App = () => {
  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)
  return (
    <CartProvider>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/about" element={<Abouts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Toaster />
      </div>
    </CartProvider>
  )
}

export default App
