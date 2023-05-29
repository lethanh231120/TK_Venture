import React from 'react'
import Header from './Header'
import Footer from './Footer'
import BreadcrumbPage from '../breakcrumb/Breadcrumb'

const Main = ({ children }) => {
  return (
    <div className='main'>
      <Header/>
      <div className='content'>
        <BreadcrumbPage/>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Main
