import { useEffect, useState, useContext } from "react";
import { DatePicker, Dropdown, Breadcrumb, Layout, Table, Input, Modal, Form, notification, Button, theme, Card, Timeline, Tooltip, Select } from 'antd';
import { Option } from "antd/es/mentions";
import {
    SearchOutlined, ClockCircleOutlined, CheckCircleOutlined,
    EditOutlined, PoweroffOutlined, ManOutlined, WomanOutlined, HomeOutlined
} from '@ant-design/icons'
import SiderAdmin from "../../Layout/Admin/SiderAdmin";
import HeaderAdmin from "../../Layout/Admin/HeaderAdmin";
import dayjs from "dayjs";
import 'bootstrap/dist/css/bootstrap.css';


import { GetAllNewsService } from "../../services/NewsService";
import { GetAllNewsCategoryService } from "../../services/NewsService";
import { UserContext } from "../../contexts/UserContext";

const { Content } = Layout;


export default function ManageNewsByMod() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //#region - Decleare - Khai báo các biến 
    const { user, render, onSetRender } = useContext(UserContext);

    const columns = [
        {
            title: "ID",
            dataIndex: "newsId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Ảnh bìa",
            dataIndex: "image",
            key: "image",
            fixed: "left",
            render: (record) => {
                if (record != null) {
                    return (
                        <img
                            src={record}
                            alt="Pic"
                            width={70}
                            height={70}
                            style={{ objectFit: "cover" }}
                            className="borderRadius50"
                        />
                    );
                } else {
                    return (
                        <img
                            src="../Image/Image_Null.png"
                            alt="Pic"
                            width={70}
                            height={70}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                            className="borderRadius50"
                        />
                    );
                }
            },
        },
        {
            title: "Loại tin tức",
            dataIndex: "categoryName",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập loại tin tức"
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
                if (record.categoryName != null) {
                    return record.categoryName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Người tạo",
            dataIndex: "accountName",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập tên người tạo"
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
                if (record.accountName != null) {
                    return record.accountName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập tiêu đề"
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
                if (record.title != null) {
                    return record.title.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Người tạo",
            dataIndex: "accountName",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập tên người tạo"
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
                if (record.accountName != null) {
                    return record.accountName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createDate",
            key: 1,
            fixed: "left",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: 1,
            fixed: "left",
        },
        {
            title: "Điều hướng",
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
                        {/* &nbsp;
                        {record.status == "Đang hoạt động" ? (
                            <Button
                                onClick={() => handleChangeStatusDeActivate(record)}
                                style={{ color: "white", backgroundColor: "red" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                        {record.status == "Đang khóa" ? (
                            <Button
                                onClick={() => handleChangeStatusActivate(record)}
                                style={{ color: "white", backgroundColor: "green" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )} */}
                    </>
                );
            },
        },
    ]

    const [newList, setNewList] = useState([]);
    const [newCategoryList, setNewCategoryList] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createData, setCreateDate] = useState({
        createCategory: "",
        createImage: "",
        createTitle: "",
        createSubTitle: "",
        createContent: "",
        createUserId: "",
    });

    const [errors, setErrors] = useState({
        createCategory: "",
        createImage: "",
        createTitle: "",
        createSubTitle: "",
        createContent: "",
    })
    //#endregion


    //#region - Function - Hiển thị danh sách tin tức/ loại tin tức
    const handleGetAllNew = async () => {
        try {
            const result = await GetAllNewsService();
            if (result.status === 200) {
                setNewList(result.data);
            }
        } catch (error) {
            console.error('Error fetching account user service:', error);
        }
    };

    useEffect(() => {
        handleGetAllNew();
    }, [render]);

    const handleGetAllCategory = async () => {
        try {
            const result = await GetAllNewsCategoryService();
            if (result.status === 200) {
                setNewCategoryList(result.data);
            }
        } catch (error) {
            console.error('Error fetching account user service:', error);
        }
    };

    useEffect(() => {
        handleGetAllCategory();
    }, [render]);
    //#endregion

    return (
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
                        <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
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
                                Danh sách tin tức
                            </h1>
                        </div>
                        <Button
                            type='primary'
                            onClick={() => {
                                setShowCreateForm(true);
                            }}
                            style={{ marginBottom: '20px', marginRight: '10px' }}
                        >
                            Tạo tin tức
                        </Button>
                        <Table
                            columns={columns}
                            dataSource={newList}
                        // pagination={pagination}
                        />

                        <Modal
                            title='Tạo tin tức'
                            visible={showCreateForm}
                            okText='Thêm'
                            cancelText='Đóng'
                            onCancel={() => {
                                setShowCreateForm(false);
                                // setErrors([]);
                                // setEditData('');
                            }}
                        // onOk={() => handleFunctionEdit()}
                        >
                            <Form>
                                <Form.Item>
                                    <label>Loại tin tức</label>
                                    <Select
                                        name="newCategoryId"
                                        defaultValue="Chọn loại"
                                        value={createData.createCategory}
                                        allowClear
                                    >
                                        <Option
                                            value="Chọn loại"
                                            key="null"
                                            name="null"
                                        >
                                        </Option>
                                        {newCategoryList?.map((item) => (
                                            <Option
                                                value={item.categoryName}
                                                key={item.newCategoryId}
                                                name="categoryName"
                                            >
                                                {item.categoryName}
                                            </Option>
                                        ))}
                                    </Select>
                                     {errors.createCategory && (
                                        <div
                                            className='invalid-feedback'
                                            style={{ display: 'block', color: 'red' }}
                                        >
                                            {errors.createCategory}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Tiêu đề</label>
                                    <Input
                                        type='text'
                                        placeholder='Nhập tên tiêu đề'
                                        className='form-control'
                                        value={createData.createTitle}
                                        name='createTitle'
                                    // onChange={handleInputChange}
                                    />
                                    {errors.createTitle && (
                                        <div
                                            className='invalid-feedback'
                                            style={{ display: 'block', color: 'red' }}
                                        >
                                            {errors.createTitle}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Phụ đề</label>
                                    <Input
                                        type='text'
                                        placeholder='Nhập phụ đề'
                                        className='form-control'
                                        value={createData.createSubTitle}
                                        name='createSubTitle'
                                    // onChange={handleInputChange}
                                    />
                                    {errors.createSubTitle && (
                                        <div
                                            className='invalid-feedback'
                                            style={{ display: 'block', color: 'red' }}
                                        >
                                            {errors.createSubTitle}
                                        </div>
                                    )}
                                </Form.Item>
                            </Form>
                        </Modal>

                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}