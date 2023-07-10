import { useEffect, useState } from "react";

import { DatePicker, Dropdown, Breadcrumb, Layout, Table, Input, Modal, Form, notification, Button, theme, Card, Timeline, Tooltip, Select } from 'antd';
import {
    SearchOutlined, ClockCircleOutlined, CheckCircleOutlined,
    EditOutlined, PoweroffOutlined, ManOutlined, WomanOutlined, HomeOutlined
} from '@ant-design/icons'
import SiderAdmin from "../../Layout/Admin/SiderAdmin";
import HeaderAdmin from "../../Layout/Admin/HeaderAdmin";
import moment from 'moment';
import hanldeValidationEditUser from "../../assets/js/handleValidation";
import dayjs from "dayjs";

const { Content } = Layout;


// dữ liệu test
const data = [
    {
        userId: 1,
        avatar: '../Image/Avatar_Null.png',
        fullName: 'Nguyễn Gia Huy',
        email: 'ghuynguyen0311@gmail.com',
        phoneNumber: '0328284430',
        status: "1",
        gender: "1",
        birthDay: "2001/11/03",
        schoolName: "ĐH FPT",
        createDate: "2023/06/25"
    },
    {
        userId: 2,
        avatar: '../Image/Avatar_Null.png',
        fullName: 'Trương Huỳnh Phước Hùng',
        email: 'hung@gmail.com',
        phoneNumber: '0379535503',
        status: "1",
        gender: "1",
        birthDay: "2001/03/11",
        schoolName: "ĐH FPT",
        createDate: "2023/06/25"
    },
    {
        userId: 3,
        avatar: '../Image/Avatar_Null.png',
        fullName: 'Ngô Lương Văn Dần',
        email: 'dan@gmail.com',
        phoneNumber: '0376472715',
        status: "0",
        gender: "1",
        birthDay: "1989/10/04",
        schoolName: "ĐH FPT",
        createDate: "25/06/2023"
    },
    ,
    {
        userId: 4,
        avatar: '../Image/Avatar_Null.png',
        fullName: 'Nguyễn Hữu Nhật Minh',
        email: 'Minh@gmail.com',
        phoneNumber: '0394878049',
        status: "1",
        gender: "1",
        birthDay: "2001/01/01",
        schoolName: "ĐH FPT",
        createDate: "2023/06/25"
    },
    ,
    {
        userId: 5,
        avatar: '../Image/Avatar_Null.png',
        fullName: 'Trần Phước Chương',
        email: 'chuong@gmail.com',
        phoneNumber: '0394878049',
        status: "0",
        gender: "1",
        birthDay: "2001/06/24",
        schoolName: "ĐH FPT",
        createDate: "2023/06/25"
    },
]

export default function ManageUser() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //#region - Declare - tên cột trong table
    const columns = [
        {
            title: "ID",
            // width: 30,
            dataIndex: "userId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Avatar",
            // width: 50,
            dataIndex: "avatar",
            key: "avatar",
            fixed: "left",
            render: (record) => (
                <img
                    src={record}
                    alt="Pic"
                    width={70}
                    height={70}
                    style={{ borderRadius: "50%" }}
                    className="borederRadius50"
                />
            ),
        },
        {
            title: "Tên người dùng",
            // width: 100,
            dataIndex: "fullName",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập tên"
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
                if (record.fullName != null) {
                    return record.fullName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: 4,
            // width: 100,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập email"
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
                return record.email.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Số điện thoại",
            // width: 100,
            dataIndex: "phoneNumber",
            key: 1,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập số điện thoại"
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
                return record.phoneNumber.toLowerCase().includes(value.toLowerCase());
            },
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
                            onClick={() => handleEdit(record)}
                            type="primary"
                            icon={<EditOutlined />}
                        ></Button>{" "}
                        &nbsp;
                        {record.status == "1" ? (
                            <Button
                                onClick={() => handleChangeStatusDeActivate(record)}
                                style={{ color: "white", backgroundColor: "red" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                        {record.status == "0" ? (
                            <Button
                                onClick={() => handleChangeStatusActivate(record)}
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

    //#region - Declare - các biến dùng 
    const dayFormat = "YYYY-MM-DD";
    const [dataSource, setDataSource] = useState('');
    const [show, setShow] = useState(false);
    //#endregion

    //#region - Declare - input và lỗi của mỗi input  

    const [errors, setErrors] = useState({
        editFullName: "",
        editPhoneNumber: "",
    });

    const [editData, setEditData] = useState({
        editUserId: "",
        editAvatar: "",
        editEmail: "",
        editPhoneNumber: "",
        editGender: "",
        editBirthDay: "",
        editSchoolName: "",
    });
    //#endregion

    //#region - Function - hiển thị thông báo create/update/changeStatus
    const [api, contextHolder] = notification.useNotification();
    const openNotificationUpdate = (placement) => {
        api.success({
            message: `Notification`,
            description: "Update Successfully",
            placement,
        });
    };
    const openNotificationEnable = (placement) => {
        api.success({
            message: `Notification`,
            description: "Change Status Successfully",
            placement,
        });
    };
    const openNotificationDisable = (placement) => {
        api.error({
            message: `Notification`,
            description: "Change Status Successfully",
            placement,
        });
    };

    //#endregion

    //#region - Function - hiển thị detail khi hover vào mỗi record
    const customTooltip = (data) => {
        return (
            <Card
                style={{
                    width: "400px",
                }}
                title="User Details"
            >
                <Timeline
                    mode={"left"}
                    items={[
                        {
                            label: "Gender",
                            children: data.gender ? "Male" : " Female",
                            dot: data.gender == "1" ? <ManOutlined /> : <WomanOutlined />,
                            color: "blue",
                        },
                        {
                            label: "Birth Day",
                            children: data.birthDay,
                            dot: <ClockCircleOutlined />,
                            color: "orange",
                        },
                        {
                            label: "School Name",
                            children: data.schoolName,
                            dot: <HomeOutlined />,
                            color: "purple",
                        },
                        {
                            label: "Create Date",
                            children: data.createDate,
                            dot: <CheckCircleOutlined />,
                            color: "black",
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

    //#region - Function - nhận giá trị input
    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setEditData((editData) => ({ ...editData, [field]: value }));
    };

    const handleInputChangeDate = (date, name) => {
        setEditData({
            ...editData,
            [name]: formatDate(date, dayFormat),
        });
    };

    const handleInputChangeGender = (value) => {
        setEditData({
            editUserId: editData.editUserId,
            editAvatar: editData.editAvatar,
            editFullName: editData.editFullName,
            editEmail: editData.editEmail,
            editPhoneNumber: editData.editPhoneNumber,
            editBirthDay: editData.editBirthDay,
            editGender: value,
            editSchoolName: editData.editSchoolName,
        });
    };

    const handleInputChangeSchool = (value) => {
        setEditData({
            editUserId: editData.editUserId,
            editAvatar: editData.editAvatar,
            editFullName: editData.editFullName,
            editEmail: editData.editEmail,
            editPhoneNumber: editData.editPhoneNumber,
            editBirthDay: editData.editBirthDay,
            editGender: editData.editGender,
            editSchoolName: value,
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear().toString().padStart(4, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = "00";
        const minutes = "00";
        const seconds = "00";
        const milliseconds = "000";

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        return formattedDate;
    };
    //#endregion

    //#region - Function - Deactivate/Activate tài khoản user
    const handleChangeStatusDeActivate = (record) => {
        Modal.confirm({
            title: "Are you sure to Deactivate account: " + record.email + " ?",
            okText: "DeaActivate",
            okType: "danger",
            onOk: () => {
                openNotificationDisable("topRight");
            },
            cancelText: "Cancel",
            onCancel: () => { },
        });
    }

    const handleChangeStatusActivate = (record) => {
        Modal.confirm({
            title: "Are you sure to Activate account: " + record.email + " ?",
            okText: "Activate",
            okType: "default",
            onOk: () => {
                openNotificationEnable("topRight");
            },
            cancelText: "Cancel",
            onCancel: () => { },
        });
    }
    //#endregion

    //#region - Function - hiển thị và edit user

    const handleEdit = (record) => {
        setEditData({
            editUserId: record.userId,
            editAvatar: record.avatar,
            editFullName: record.fullName,
            editEmail: record.email,
            editPhoneNumber: record.phoneNumber,
            editBirthDay: record.birthDay,
            editGender: record.gender,
            editSchoolName: record.schoolName,
        });
        setShow(true);
        console.log(record);
    }

    const handleFunctionEdit = () => {
        let errors = {};
        hanldeValidationEditUser(editData, errors);
        if (Object.keys(errors).length === 0) {
            openNotificationUpdate("topRight");
            setErrors([]);
            setShow(false);
        } else {
            setErrors(errors);
        }
    }

    //#endregion

    return (
        <Layout
            style={{ minHeight: '100vh' }}
        >
            <SiderAdmin />
            <Layout className="site-layout">
                <HeaderAdmin />
                {contextHolder}

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
                        <Breadcrumb.Item>Người dùng</Breadcrumb.Item>
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
                                Danh sách người dùng
                            </h1>
                        </div>
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

                        {/* Form Edit */}
                        <Modal
                            title="Update Guest's Information"
                            visible={show}
                            okText="Save Change"
                            onCancel={() => { setShow(false); setErrors([]); }}
                            onOk={() => handleFunctionEdit()}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "10px",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Avatar
                                    </p>
                                    <img
                                        src={editData.editAvatar}
                                        alt="Pic"
                                        width={70}
                                        height={70}
                                        className="borederRadius50"
                                    />
                                </div>
                            </div>

                            <Form>
                                <Form.Item>
                                    <label>FullName</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter FullName"
                                        className="form-control"
                                        value={editData.editFullName}
                                        name="editFullName"
                                        onChange={handleInputChange}
                                    />
                                    {errors.editFullName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.editFullName}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="form-control"
                                        value={editData.editEmail}
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <label>PhoneNumber</label>
                                    <Input
                                        type="phonenumber"
                                        placeholder="Enter PhoneNumber"
                                        className="form-control"
                                        value={editData.editPhoneNumber}
                                        name="editPhoneNumber"
                                        onChange={handleInputChange}
                                    />
                                    {errors.editPhoneNumber && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.editPhoneNumber}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label style={{ display: 'block' }}>Gender</label>
                                    <Select
                                        defaultValue={editData.editGender}
                                        name="editGender"
                                        style={{ width: "100%" }}
                                        onChange={handleInputChangeGender}
                                        options={[
                                            { value: '1', label: 'Nam' },
                                            { value: '0', label: 'Nữ' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <label>BirthDay:</label>

                                    <DatePicker
                                        className="form-control"
                                        style={{ width: "100%" }}
                                        format="YYYY-MM-DD"
                                        name="editBirthDay"
                                        value={editData.editBirthDay ? dayjs(editData.editBirthDay, dayFormat) : null}
                                        onChange={(date) => handleInputChangeDate(date, "editBirthDay")}
                                    />
                                    {errors.editBirthDay && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.editBirthDay}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label style={{ display: 'block' }}>Trường học</label>
                                    <Select
                                        defaultValue={editData.editSchoolName}
                                        name="editSchoolName"
                                        style={{ width: "100%" }}
                                        onChange={handleInputChangeSchool}
                                        options={[
                                            { value: 'THPT Chuyên Nguyễn Bỉnh Khiêm', label: 'THPT Chuyên Nguyễn Bỉnh Khiêm' },
                                            { value: 'THPT Phan Bội Châu', label: 'THPT Phan Bội Châu' },
                                            { value: 'THPT Trần Cao Vân', label: 'THPT Trần Cao Vân' },
                                        ]}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}