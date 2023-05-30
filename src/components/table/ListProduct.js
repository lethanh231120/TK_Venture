import React, { useState } from 'react'
import { Table, Modal, Form, Input, Row, Col, Button } from 'antd'
import table from '../../styles/table.module.css'
import Image from 'next/image';
import { WindowsOutlined, AppleOutlined, AndroidOutlined, ChromeOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';
const ListProduct = ({ data }) => {
    const [form] = Form.useForm()
    const PAGE_SIZE = 14
    const [page, setPage] = useState(1)
    const [openEdit, setOpenEdit] = useState(false)
    const [detailItem, setDetailItem] = useState()
    const [curentIndexItemEdit, setCurentIndexItemEdit] = useState()
    const router = useRouter()

    const hanldeEdit = (e, record, index) => {
        e.stopPropagation()
        console.log(record)
        console.log(index)
        setOpenEdit(true)
        setDetailItem(record)
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
          render: (_, record, index) => (
            <div
               className={table.button}
                onClick={(e) => hanldeEdit(e, record, index)}
            >
              Edit
            </div>
          ),
        },
    ]

    const handleRowClicked = (record) => {
        router.push(`/products/${record?.Code}`)
    }

    const onFinish = (values) => {
        console.log(values)
        const generes = values?.Genres?.split(', ')
        console.log(listBlockchain)
        const Genres = []
        generes?.forEach((item) => {
            Genres.push({
                Name: item?.toLowercase()
            })
        })
        // setOpenEdit(false)
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
                onRow={(record, index) => ({
                    onClick: () => {
                      handleRowClicked(record)
                    }
                })}
                rowKey={(record) => record?.Code}
            />
            <Modal
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                title='Edit Product'
                footer={false}
            >
                <Form
                    name="complex-form"
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        maxWidth: 700,
                    }}
                >
                    <Form.Item
                        name="Name"
                        label='Name'
                        style={{ marginTop: '0.5rem', width: '100%' }}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder={detailItem?.Name}
                        />
                    </Form.Item>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                label='Symbol'
                                name="Symbol"
                                style={{ marginTop: '0.5rem', width: '100%' }}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder={detailItem?.Symbol}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Price"
                                label='Price'
                                style={{ marginTop: '0.5rem', width: '100%' }}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder={detailItem?.Price}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="Blockchains"
                        label='Blockchains'
                        style={{ marginTop: '0.5rem', width: '100%' }}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder={`${detailItem?.BlockChains?.map((item) => `${item?.Name}`)}`}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Geners"
                        label='Geners'
                        style={{ marginTop: '0.5rem', width: '100%' }}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder={`${detailItem?.Genres?.map((item) => ` ${item?.Name}`)}`}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Platforms"
                        label='Platforms'
                        style={{ marginTop: '0.5rem', width: '100%' }}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder={`${detailItem?.Platforms?.map((item) => ` ${item?.Name}`)}`}
                        />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ListProduct
