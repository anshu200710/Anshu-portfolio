import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Ui from './components/Ui'
import Diwali from './pages/Diwali'
import Decorate from './pages/Decorate'
import Portfolio from './pages/Portfolio'

const App = () => {
  return (
    <div className='min-h-screen text-black dark:bg-[#0F011F] dark:text-gray-100 transition-colors duration-500'>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Portfolio/>} />
        <Route path='/diwali' element={<Diwali/>} />
        <Route path='/decorate' element={<Decorate/>}/>
      </Routes>
      <Footer/> 
    </div>
  )
}

export default App
