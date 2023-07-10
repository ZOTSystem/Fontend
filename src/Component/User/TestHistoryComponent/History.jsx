import { Table, Input} from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';



const columns = [
    {
        title: "Môn thi",
        width: 50,
        dataIndex: "subjectName",
        key: "subjectName",
        fixed: "left",
        style: { color: "#538dd5", color: "white" },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <Input
                    autoFocus
                    placeholder="Type SubjectName"
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
        title: "Thời gian thi",
        width: 100,
        dataIndex: "testDuration",
        key: 3,
        fixed: "left",
    },
    {
        title: "Bộ đề thi",
        dataIndex: "setOfTopic",
        key: 4,
        width: 100,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <Input
                    autoFocus
                    placeholder="Type SetOfTopic"
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
            if (record.setOfTopic != null) {
                return record.setOfTopic.toLowerCase().includes(value.toLowerCase());
            }
        },
    },
    {
        title: "Kết quả",
        width: 100,
        dataIndex: "point",
        key: 1,
        fixed: "left",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <Input
                    autoFocus
                    placeholder="Type point"
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
            if (record.point != null) {
                return record.point.toLowerCase().includes(value.toLowerCase());
            }
        },
    },
    {
        title: "",
        width: 100,
        key: 1,
        fixed: "left",
        render: (record) => {
            return (
                <>
                    <a style={{ color: "#538dd5", textAlign: "center" }}>Chi tiết</a>
                </>
            );
        },
    },
]

const data = [
    {
        subjectName: "Toán",
        testDuration: 15 + "'",
        setOfTopic: "Đề kiểm tra 15p Toán - Đạo hàm",
        point: 6.5
    },
    {
        subjectName: "Anh",
        testDuration: 60 + "'",
        setOfTopic: "Đề trung học phổ thông Quốc gia 2022",
        point: 8
    },
    {
        subjectName: "Lý",
        testDuration: 60 + "'",
        setOfTopic: "Đề kiểm tra 60p Lý - Ánh xạ",
        point: 6.5
    },
    {
        subjectName: "Toán",
        testDuration: 60 + "'",
        setOfTopic: "Đề kiểm tra 60p Toán - Hình học không gian",
        point: 7
    }
]

export default function History() {
    return (
        <>
            <div className="col-lg-7">
                <div style={{ background: '#538dd5', borderRadius: "10px" }} className="p-3 m-auto">
                    <p style={{ color: 'white', fontWeight: '500' }} className="m-auto">Mức độ thành thạo kiến thức các môn</p>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </>
    )
}