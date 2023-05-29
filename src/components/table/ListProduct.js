import React, { useState } from 'react'
import { Table, Modal } from 'antd'
import table from '../../styles/table.module.css'
import Image from 'next/image';
import { WindowsOutlined, AppleOutlined, AndroidOutlined, ChromeOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';
const ListProduct = ({ data }) => {
    const PAGE_SIZE = 14
    const [page, setPage] = useState(1)
    const [openEdit, setOpenEdit] = useState(false)
    const [detailItem, setDetailItem] = useState()
    const router = useRouter()

    const hanldeEdit = (e, record) => {
        e.stopPropagation()
        console.log(record)
        setOpenEdit(true)
    }

    const columns = [
        {
            title: <span className={table.text_bold}>#</span>,
            dataIndex: "key",
            render: (_, record, index) => (<span className={table.text_bold}>
                {(page - 1) * PAGE_SIZE + index + 1}
            </span>)
        },
        {
            title: <span className={table.text_bold}>NAME</span>,
            dataIndex: 'name',
            key: 'name',
            width: '35%',
            render: (_, record) => <div className={table.info}>
                <Image src={record?.ImageUrl} alt='image product' width={25} height={25} className={table.image_url}/>
                <div>
                    <div className={table.data}>
                        <div className={table.text_bold}>{record?.Name}</div>
                        <div className={table.text_medium}>{record?.Symbol}</div>
                    </div>
                    <div className={table.chain}>
                        <Image src={record?.BlockChains[0]?.ExtendValue} alt='chain image' width={20} height={20} className={table.image_chain}/>
                        <div className={table.text_gray}>{record?.BlockChains[0]?.Name}</div>
                    </div>
                </div>
            </div>,
        },
        {
          title: <span className={table.text_bold}>GENRE</span>,
          width: '35%',
          dataIndex: 'age',
          key: 'age',
          render: (_, record) => <span>
            {record?.Genres?.map((item, index) => (
                <span key={index} className={table.text_regular}> {item?.Name} {index === record?.Genres.length - 1 ? '' : '|'}</span>
            ))}
          </span>
        },
        {
          title: <span className={table.text_bold}>PLATFORM</span>,
          align: 'right',
          dataIndex: 'address',
          key: 'address',
          render: (_, record) => <div className={table.list_platform}>
            {record?.Platforms?.map((item, index) => <div key={index}>
                {item?.Name === 'Windows' ? (<WindowsOutlined className={table.platform_item}/>)
                    : (item?.Name === 'Browser' ? (<ChromeOutlined className={table.platform_item}/>)
                        : item?.Name === 'Mac' ? (<AppleOutlined className={table.platform_item}/>)
                        : (item?.Name === 'Android' ? (<AndroidOutlined className={table.platform_item}/>) : ''))}
            </div>)}
          </div>
        },
        {
          title: 'ACTION',
          key: 'action',
          align: 'right',
          render: (_, record) => (
            <div
               className={table.button}
                onClick={(e) => hanldeEdit(e, record)}
            >
              Edit
            </div>
          ),
        },
    ]

    const handleRowClicked = (record) => {
        router.push(`/products/${record?.Code}`)
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                onChange={(pagination, filters, sorter, extra) => setPage(pagination?.current)}
                pagination={data?.length < 15 ? false : {
                    pageSize: PAGE_SIZE,
                    total: data?.length,
                    showSizeChanger: false
                }}
                onRow={(record) => ({
                    onClick: () => {
                      handleRowClicked(record)
                    }
                })}
            />
            <Modal
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => () => setOpenEdit(false)}
            >
                ,mxfcfxnhgv,mxfcn
            </Modal>
        </>
    )
}

export default ListProduct
