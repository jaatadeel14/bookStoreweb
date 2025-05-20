import React from 'react'
import Home from './home/Home'
import { Route,Routes } from "react-router-dom"
import Courses from './courses/Courses'
import Signup from './Components/Signup'
import Contacts from './contact/Contacts'
import Abouts from './abouts/Abouts'
const App = () => {
  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={<Courses/>}/>
      <Route path="/contact" element={<Contacts/>}/>
      <Route path="/about" element={<Abouts/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
      </div>

    </>
  )
}

export default App
