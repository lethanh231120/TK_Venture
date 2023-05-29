import React from 'react'
import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import breadcrumb from '../../styles/breadcrumb.module.css'

const BreadcrumbPage = () => {
    const router = useRouter()
    const { asPath } = useRouter()
    const array = asPath?.split('/')
    
    const listPage = array?.map((item, index) => {
        return {
            title: <div className={breadcrumb.title}>
                {item === '' && index !== 1 ? 'Home' : `${item.charAt(0).toUpperCase()}${item?.slice(1)}`}
            </div>,
            href: item === '' && index !== 1 ? '/'
                : (index === 1 ? `/${array[1]}`
                : (index === 2) ? `/${array[1]}/${array[2]}`
                : (index === 3) ? `/${array[1]}/${array[2]}/${array[3]}`
                : (index === 4) ? `/${array[1]}/${array[2]}/${array[3]}/${array[4]}` : '')
        }
    })
    return (
        <Breadcrumb
            separator=">"
            style={{
                padding: '1.5rem 0'
            }}
            items={listPage}
        />
    )
}

export default BreadcrumbPage
