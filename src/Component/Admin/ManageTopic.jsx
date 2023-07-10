import { useEffect, useState } from "react";

import { DatePicker, Dropdown, Breadcrumb, Layout, Table, Input, Modal, Form, notification, Button, theme, Card, Timeline, Tooltip, Select } from 'antd';
import {
    SearchOutlined, CheckCircleOutlined,
    EditOutlined, PoweroffOutlined,
} from '@ant-design/icons'
import SiderAdmin from "../../Layout/Admin/SiderAdmin";
import HeaderAdmin from "../../Layout/Admin/HeaderAdmin";

const { Content } = Layout;

const data = [
    {
        topicId: '1',
        subjectName: 'Lý',
        topicName: 'Kiểm tra 15p Lý',
        totalQuestion: 15,
        duration: 15 + "'",
        status: 1
    },
    {
        topicId: '2',
        subjectName: 'Lý',
        topicName: 'Kiểm tra 15p Lý',
        totalQuestion: 15,
        duration: 15 + "'",
        status: 1
    },
    {
        topicId: '3',
        subjectName: 'Lý',
        topicName: 'Kiểm tra 15p Lý',
        totalQuestion: 15,
        duration: 15 + "'",
        status: 1
    },
]

export default function ManageTopic() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const columns = [
        {
            title: "ID",
            // width: 30,
            dataIndex: "topicId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Môn học",
            // width: 30,
            dataIndex: "subjectName",
            key: 1,
            fixed: "left",
        },
        {
            title: "Tên đề",
            // width: 100,
            dataIndex: "topicName",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập tên đề"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                if (record.topicName != null) {
                    return record.topicName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Số lượng câu hỏi",
            dataIndex: "totalQuestion",
            key: 4,
            // width: 100,
        },
        {
            title: "Thời gian làm bài",
            // width: 100,
            dataIndex: "duration",
            key: 1,
            fixed: "left",
        },
        {
            title: "Trạng thái",
            // width: 100,
            dataIndex: "status",
            key: 1,
            fixed: "left",
            render: (record) => {
                return (
                    <>
                        {record == "1" ? "Activiate" : "Deactivate"}
                    </>
                )
            }
        },
        {
            title: "Điều hướng",
            // width: 100,
            key: 1,
            fixed: "left",
            render: (record) => {
                return (
                    <>
                        <Button
                            // onClick={() => handleEdit(record)}
                            type="primary"
                            icon={<EditOutlined />}
                        ></Button>{" "}
                        &nbsp;
                        {record.status == "1" ? (
                            <Button
                                // onClick={() => handleChangeStatusDeActivate(record)}
                                style={{ color: "white", backgroundColor: "red" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                        {record.status == "0" ? (
                            <Button
                                // onClick={() => handleChangeStatusActivate(record)}
                                style={{ color: "white", backgroundColor: "green" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                    </>
                );
            },
        },
    ]

    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
            >
                <SiderAdmin />
                <Layout className="site-layout">
                    <HeaderAdmin />
                    <Content
                        style={{
                            margin: "0 16px",
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: "16px 0",
                            }}
                        >
                            <Breadcrumb.Item>
                                Trang chủ
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Quản lý</Breadcrumb.Item>
                            <Breadcrumb.Item>Bộ đề</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <div>
                                <h1
                                    style={{
                                        textAlign: "center",
                                        fontSize: "30px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Danh sách bộ đề
                                </h1>
                                <Button type="primary" style={{ marginBottom: '20px', marginRight: '10px' }}>
                                    Thêm mới bộ đề
                                </Button>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    scroll={{
                                        x: 1500,
                                        y: 1000,
                                    }}
                                />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}