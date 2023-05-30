import React, { useState } from 'react'
import header from '../../styles/header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { data } from '@/data/data'
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter()
    const [listProduct, setListProduct] = useState([])
    const debounce = (func, timeout = 300) => {
        let timer;
        return (...args) => {
          clearTimeout(timer)
          timer = setTimeout(() => { func.apply(this, args); }, timeout)
        }
    }
    const saveInput = (e) => {
        const listData = data?.filter((item) => item?.Name?.toLowerCase()?.includes(e.target.value?.toLowerCase()) || item?.Symbol?.toLowerCase()?.includes(e.target.value?.toLowerCase()))
        setListProduct(listData)
    }
    const handleChangeInput = debounce((e) => saveInput(e))

    const handleClickDetailItem = (item) => {
        setListProduct([])
        router.push(`/products/${item?.Code}`)
    }
    return (
        <div className={header.header}>
        <div className={header.list}>
            <Link href='/' className={header.logo}>
                <div className={header.logo_image}>
                    <Image src={'/images/logo.png'} alt='logo' width={25} height={25} className={header.logo_image_url}/>
                </div>
                <div className={header.logo_text}>
                    CHAINPLAY
                </div>
            </Link>
            <div className={header.menu}>
                <div className={header.menu_item}>
                    <Link href='/explore'>
                        Explore
                    </Link>
                </div>
                <div className={header.menu_item}>
                    <Link href='/generes'>
                        Generes
                    </Link>
                </div>
                <div className={header.menu_item}>
                    <Link href='/whitelists'>
                        Whitelists
                    </Link>
                </div>
                <div className={header.menu_item}>
                    <Link href='/learn'>
                        Learn
                    </Link>
                </div>
                <div className={header.menu_item}>
                    <Link href='/community'>
                        Community
                    </Link>
                </div>
            </div>
            <div className={`${header.search}`}>
                <Input
                    className={header.input}
                    placeholder='Search NFTs / Collections / Addresses'
                    prefix={<SearchOutlined className={header.icon_search}/>}
                    onChange={handleChangeInput}
                />
                <div className={`${header.list_data} ${listProduct.length > 0 ? header.active : ''}`}>
                    {listProduct.length > 0 && listProduct?.map((item, index) => (
                        <div className={header.data_item} key={index} onClick={() => handleClickDetailItem(item)}>
                            <Image src={item?.ImageUrl} alt='image project' width={20} height={20} className={header.data_item_image}/>
                            <div className={header.data_item_name}>{item?.Name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={header.authenticate}>
            <div className={header.button}>Log in</div>
            <div className={header.button}>Sign up</div>
        </div>
        </div>
    )
}

export default Header
