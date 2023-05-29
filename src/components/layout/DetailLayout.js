import React from 'react'
import Header from './Header'
import BreadcrumbPage from '../breakcrumb/Breadcrumb'

const DetailLayout = ({ children }) => {
  return (
    <div className='main'>
      <Header/>
      <div className='content'>
        <BreadcrumbPage/>
        {children}
      </div>
    </div>
  )
}

export default DetailLayout
