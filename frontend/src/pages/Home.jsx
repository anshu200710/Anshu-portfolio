import React from 'react'
import Header from '../components/Header'
import About from './About' // Assuming About.js exists and will be themed
import Service from './Service'
import Work from './Work'
import Contact from './Contact'
import ScrollResponsiveText from '../components/ScrollResponsiveText'
import Ui from '../components/Ui'



const Home = () => {
  return (
    <div className='min-h-screen bg-[rgb(20,7,31)] text-white dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500'>
      <Header/>
      <ScrollResponsiveText/>
      <About/>
      <Service/>
      <Work/>
      <Ui/>
      <Contact/>
    </div>
  )
}

export default Home
