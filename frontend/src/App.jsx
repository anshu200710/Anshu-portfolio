import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Ui from './components/Ui'

const App = () => {
  return (
    <div className='min-h-screen text-black dark:bg-[#0F011F] dark:text-gray-100 transition-colors duration-500'>
      <Navbar/> 
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer/> 
    </div>
  )
}

export default App
