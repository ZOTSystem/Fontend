import { useEffect, useState } from "react";
import CreateQuestionsExcel from "./ButtonCreateByExcel/CreateQuestionsExecel";
import { DatePicker, Dropdown, Breadcrumb, Layout, Table, Input, Modal, Form, notification, Button, theme, Card, Timeline, Tooltip, Select } from 'antd';
import {
    SearchOutlined, CheckCircleOutlined, FileTextOutlined,
    EditOutlined, PoweroffOutlined, PlusCircleOutlined,
} from '@ant-design/icons'
import SiderAdmin from "../../Layout/Admin/SiderAdmin";
import HeaderAdmin from "../../Layout/Admin/HeaderAdmin";
import moment from 'moment';
import dayjs from "dayjs";

const { Content } = Layout;

const data = [
    {
        questionId: 1,
        subjectName: 'Lịch sử',
        questionContent: 'Trong những năm 90 của thế kỉ XX, nền kinh tế Mĩ có biểu hiện nào sao đây?',
        level: 'Dễ',
        userName: 'Huy',
        optionA: 'Trải qua những đợt suy thoái ngắn',
        optionB: 'Khủng hoảng trầm trọng kéo dài',
        optionC: 'Tốc độ tăng trưởng cao nhất thế giới',
        optionD: 'Phát triển nhanh và liền tục',
        answer: 'A',
        solution: 'Trải qua những đợt suy thoái ngắn',
        status: 1
    },
    {
        questionId: 2,
        subjectName: 'Lịch sử',
        questionContent: 'Trong những năm 90 của thế kỉ XX, nền kinh tế Mĩ có biểu hiện nào sao đây?',
        level: 'Dễ',
        userName: 'Huy',
        optionA: 'Trải qua những đợt suy thoái ngắn',
        optionB: 'Khủng hoảng trầm trọng kéo dài',
        optionC: 'Tốc độ tăng trưởng cao nhất thế giới',
        optionD: 'Phát triển nhanh và liền tục',
        answer: 'A',
        solution: 'Trải qua những đợt suy thoái ngắn',
        status: 1
    },
    {
        questionId: 3,
        subjectName: 'Lịch sử',
        questionContent: 'Trong những năm 90 của thế kỉ XX, nền kinh tế Mĩ có biểu hiện nào sao đây?',
        level: 'Dễ',
        userName: 'Huy',
        optionA: 'Trải qua những đợt suy thoái ngắn',
        optionB: 'Khủng hoảng trầm trọng kéo dài',
        optionC: 'Tốc độ tăng trưởng cao nhất thế giới',
        optionD: 'Phát triển nhanh và liền tục',
        answer: 'A',
        solution: 'Trải qua những đợt suy thoái ngắn',
        status: 1
    },
    {
        questionId: 4,
        subjectName: 'Lịch sử',
        questionContent: 'Trong những năm 90 của thế kỉ XX, nền kinh tế Mĩ có biểu hiện nào sao đây?',
        level: 'Dễ',
        userName: 'Huy',
        optionA: 'Trải qua những đợt suy thoái ngắn',
        optionB: 'Khủng hoảng trầm trọng kéo dài',
        optionC: 'Tốc độ tăng trưởng cao nhất thế giới',
        optionD: 'Phát triển nhanh và liền tục',
        answer: 'A',
        solution: 'Trải qua những đợt suy thoái ngắn',
        status: 1
    },
    {
        questionId: 5,
        subjectName: 'Lịch sử',
        questionContent: 'Trong những năm 90 của thế kỉ XX, nền kinh tế Mĩ có biểu hiện nào sao đây?',
        level: 'Dễ',
        userName: 'Huy',
        optionA: 'Trải qua những đợt suy thoái ngắn',
        optionB: 'Khủng hoảng trầm trọng kéo dài',
        optionC: 'Tốc độ tăng trưởng cao nhất thế giới',
        optionD: 'Phát triển nhanh và liền tục',
        answer: 'A',
        solution: 'Trải qua những đợt suy thoái ngắn',
        status: 1
    },
]

export default function ManageQuestion() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();


    //#region - Hiển thị detail khi hover record
    const customTooltip = (data) => {
        return (
            <Card
                style={{
                    width: "400px",
                }}
                title="Question Details"
            >
                <Timeline
                    mode={"left"}
                    items={[
                        {
                            label: "Option A",
                            children: data.optionA,
                            dot: <PlusCircleOutlined />,
                            color: "black",
                        },
                        {
                            label: "Option B",
                            children: data.optionB,
                            dot: <PlusCircleOutlined />,
                            color: "black",
                        },
                        {
                            label: "Option C",
                            children: data.optionC,
                            dot: <PlusCircleOutlined />,
                            color: "black",
                        },
                        {
                            label: "Option D",
                            children: data.optionD,
                            dot: <PlusCircleOutlined />,
                            color: "black",
                        },
                        {
                            label: "Đáp án",
                            children: data.answer,
                            dot: <CheckCircleOutlined />,
                            color: "green",
                        },
                        {
                            label: "Lời giải",
                            children: data.solution,
                            dot: <FileTextOutlined />,
                            color: "orange",
                        }
                    ]}
                />
            </Card>
        );
    };
    const CustomRow = (properties) => {
        if (properties.children[0] != undefined) {
            let rowData = properties.children[0].props.record;
            let tooltip = customTooltip(rowData);
            return (
                <Tooltip
                    title={tooltip}
                    color={"#fff"}
                    key={"#fff"}
                    placement="topLeft"
                >
                    <tr {...properties} />
                </Tooltip>
            );
        }
        return <tr {...properties} />;
    };
    //#endregion

    //#region - Khai báo tên cột 
    const columns = [
        {
            title: "ID",
            width: 70,
            dataIndex: "questionId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Môn học",
            width: 170,
            dataIndex: "subjectName",
            key: 2,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập nội dung câu hỏi"
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
                if (record.subjectName != null) {
                    return record.subjectName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Nội dung",
            width: 350,
            dataIndex: "questionContent",
            key: 3,
            fixed: "left",
            render: (record) => {
                return (
                    <td style={{ width: '450px', maxWidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {record}
                    </td>
                );
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập nội dung câu hỏi"
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
                if (record.questionContent != null) {
                    return record.questionContent.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Cấp độ",
            dataIndex: "level",
            key: 4,
            width: 100,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập cấp độ"
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
                if (record.level != null) {
                    return record.level.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Người tạo",
            width: 100,
            dataIndex: "userName",
            key: 1,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập người tạo"
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
                if (record.userName != null) {
                    return record.userName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Trạng thái",
            width: 100,
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
            width: 100,
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
    //#endregion

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
                            <Breadcrumb.Item>Câu hỏi</Breadcrumb.Item>
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
                                    Danh sách câu hỏi<i></i>
                                </h1>
                            </div>
                            <Button type="primary" style={{ marginBottom: '20px', marginRight: '10px' }}>
                                Thêm mới câu hỏi
                            </Button>
                            <CreateQuestionsExcel/>
                            <Table
                                columns={columns}
                                dataSource={data}
                                scroll={{
                                    x: 1500,
                                    y: 1000,
                                }}
                            components={{
                                body: {
                                    row: CustomRow,
                                },
                            }}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}