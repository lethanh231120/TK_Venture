import Head from 'next/head'
import Image from 'next/image'
import Main from '@/components/layout/Main'
import { useState, useEffect }  from 'react'
import { data } from '@/data/data'
import products from '../styles/products.module.css'
import { CaretDownOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import ListProduct from '@/components/table/ListProduct'
const Home = () => {
  const  [openSelect, setOpenSelect] = useState(false)
  const [blockchain, setBlockchain] = useState({
    ExtendValue: '',
    Name: 'All Blockchain',
    key: 'all blockchain'
  })
  const [newData, setNewData] = useState(data)

  const [listChain, setListChain] = useState([])
  const handleClickItemBlockchain = (item) => {
    setOpenSelect(false)
    setBlockchain(item)
  }

  useEffect(() => {
    const listChain = [] 
    data?.forEach((item) => {
      item?.BlockChains?.forEach((blockChainItem) => {
        listChain.push(blockChainItem)
      })
    })
    const uniqueArr = [... new Map(listChain.map(item => [item['Name'], item])).values()]
    setListChain([
      {
        ExtendValue: <CodeSandboxOutlined style={{ fontSizeL: '1rem' }}/>,
        Name: 'All Blockchain',
        key: 'all blockchain'
      },
      ...uniqueArr
    ])
  }, [])


  useEffect(() => {
    const listProduct = []
    if (blockchain.Name === 'All Blockchain') {
      setNewData(data)
    } else {
      data?.forEach((item) => {
        item?.BlockChains?.forEach((itemBlockChain) => {
          if (itemBlockChain?.Name === blockchain?.Name) {
            listProduct.push(item)
          }
        })
      })
      const uniwue = [... new Map(listProduct.map(item => [item['Name'], item])).values()]
      setNewData(uniwue)
    }
  }, [blockchain])

  return (
    <>
       <Head>
          <title key="title">Best Free P2E NFT Games in 2022</title>
          <meta key="description" name="description" content={'Are you looking for Games that Free-to-play? Here are the best F2P NFT games available.'} />
          <meta key="og-title" property="og:title" content={'Best Free P2E NFT Games in 2022'} />
          <meta key="og-description" property="og:description" content={'Are you looking for Games that Free-to-play? Here are the best F2P NFT games available.'} />
          {/* <meta key="og-image" property="og:image" content={image} /> */}
          <meta key="og-url" property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`} />
          <meta key="twitter-title" name="twitter:title" content={'Best Free P2E NFT Games in 2022'} />
          <meta key="twitter-description" name="twitter:description" content={'Are you looking for Games that Free-to-play? Here are the best F2P NFT games available.'} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@lighter_app" />
          {/* <meta name="twitter:image" content={image} /> */}

          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`} />
        </Head>
      <div className={products.products}>
        <div className={products.title}>
          Best Free P2E NFT Games in 2022
        </div>
        <div className={products.desc}>
          Are you looking for Games that Free-to-play? Here are the best F2P NFT games available.
        </div>
        <div className={products.select} onClick={() => setOpenSelect(!openSelect)}>
          <div className={products.current_blockchain}>
            <div className={products.image_blockchain}>
              {blockchain?.Name === 'All Blockchain' ? <CodeSandboxOutlined style={{ fontSizeL: '1rem' }}/>
                : <Image src={blockchain.ExtendValue} width={20} height={20} alt='image'/>}
            </div>
            <div className={products.blockchain_name}>
              {blockchain.Name}
            </div>
          </div>
          <CaretDownOutlined />
          <div className={openSelect ? products.active : products.noactive}>
            {listChain.length > 0 && listChain?.map((item, index) => (
              <div className={products.blockchain_item} onClick={() => handleClickItemBlockchain(item)} key={index}>
                {item?.Name === 'All Blockchain' ? <CodeSandboxOutlined style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}/> : item?.ExtendValue !== null && (
                  <Image src={item?.ExtendValue} width={25} height={25} alt='image blockchain' className={products.blockchain_item_image}/>
                )}
                <div className={products.blockchain_item_text}>
                  {item?.Name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={products.table}>
          <ListProduct data={newData}/>
        </div>
      </div>
    </>
  )
}

Home.Layout = Main

export default Home
// export const getStaticProps = async() => {
//   return {
//     props: {}
//   }
// }