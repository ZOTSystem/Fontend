import Header from "../../Layout/User/Header";
import { Table, Input, Select } from 'antd';
import { Option } from "antd/es/mentions";
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import moment from "moment";
import { Pie } from '@ant-design/plots';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserContext } from "../../contexts/UserContext";
import { GetTestDetailService } from "../../services/HistoryService";
import { GetAllSubject } from "../../services/HistoryService";
import { StatictisService } from "../../services/HistoryService";

export default function TestHistory() {

    const navigate = useNavigate();
    const handleTestDetail = async (item) => {
        navigate('/examResult', {
            state: {
                testDetailId: item.testDetailId,
                topicName: item.topic,
                score: item.score,
                answerRight: item.answerRight,
                totalQuestion: item.totalQuestion,
            },
        });
    };
    //#region - Declare - Khai báo các biến cần dùng
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
                        placeholder="Nhập môn học"
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
            width: 70,
            dataIndex: "duration",
            key: 3,
            fixed: "left",
        },
        {
            title: "Bộ đề thi",
            dataIndex: "topic",
            key: 4,
            width: 200,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Nhập tên đề thi"
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
            width: 50,
            dataIndex: "score",
            key: 1,
            fixed: "left",
        },
        {
            title: "Ngày nộp",
            width: 50,
            dataIndex: "submitDate",
            key: 1,
            fixed: "left",
            render: (text) => moment(text).format("YYYY-MM-DD"),
        },
        {
            title: "",
            width: 50,
            key: 1,
            fixed: "left",
            render: (record) => {
                return (
                    <>
                        <a style={{ color: "#538dd5", textAlign: "center" }} onClick={() => handleTestDetail(record)}>Chi tiết</a>
                    </>
                );
            },
        },
    ]
    const { user, render, onSetRender } = useContext(UserContext);
    const [dataSource, setDataSource] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [selectdOption, setSelectOption] = useState({
        subjectName: "",
    });
    const pagination = {
        pageSize: 5,
        total: dataSource != null ? dataSource.length : "",
    };
    const [dataChart, setDataChart] = useState([
        {
            sex: 'Understood',
            sold: 50,
        },
        {
            sex: 'NotUnderstood',
            sold: 50,
        },
    ])
    //#endregion


    //#region - Function - Hiển thị danh sách các bài đã test
    const handleViewTestDetails = async () => {
        try {
            const result = await GetTestDetailService(user.accountId);
            if (result) {
                setDataSource(result.data);
                setDataChart([
                    {
                        sex: 'Understood',
                        sold: result.levelOfUnderStanding,
                    },
                    {
                        sex: 'NotUnderstood',
                        sold: Number(100 - result.levelOfUnderStanding),
                    },
                ])
                onSetRender();
            }
        } catch (error) {
            console.error('Error fetching testdetail service:', error);
        }

    }

    useEffect(() => {
        handleViewTestDetails();
    }, []);

    //#endregion


    //#region - Function - Lấy danh sách tất cả môn học
    const handleGetAllSubject = async () => {
        try {
            const result = await GetAllSubject();
            if (result.subjectList != null) {
                setSubjectList(result.subjectList);
            }
        } catch (error) {
            console.error('Error fetching testdetail service:', error);
        }
    }

    useEffect(() => {
        handleGetAllSubject();
    }, []);

    //#endregion


    //#region - Function - Nhận giá trị select option
    const handleOnChange = async (name, value) => {
        setSelectOption({
            [name]: value,
        })
        try {
            const result = await StatictisService(user.accountId, value);
            if (result.status === 400) {
                setDataSource(result.data);
                setDataChart([
                    {
                        sex: 'Understood',
                        sold: 0,
                    },
                    {
                        sex: 'NotUnderstood',
                        sold: 100,
                    },
                ])

            }
            if (result.status === 200) {
                setDataSource(result.data);
                setDataChart([
                    {
                        sex: 'Understood',
                        sold: result.levelOfUnderStanding,
                    },
                    {
                        sex: 'NotUnderstood',
                        sold: Number(100 - result.levelOfUnderStanding),
                    },
                ]);
                onSetRender();
            }
        } catch (error) {
            console.error('Error fetching testdetail service:', error);
        }
    }

    //#endregion

    //#region - Function - Hiển thị chart
    const config = {
        appendPadding: 10,
        data: dataChart,
        angleField: 'sold',
        colorField: 'sex',
        radius: 0.8,
        legend: false,
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                fill: '#fff',
                fontSize: 18,
                textAlign: 'center',
            },
        },
        pieStyle: ({ sex }) => {
            if (sex === 'Understood') {
                return {
                    fill: '#538dd5',
                };
            }

            return {
                fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/Ye2DqRx%2627/pie-wenli2.png',
            };
        },
        tooltip: false,
        interactions: [
            {
                type: 'element-single-selected',
            },
        ],
    };


    //#endregion

    return (
        <>
            <Header />
            <div className="m-auto bodyHistory" style={{ width: '80%' }}>
                <h2 className="sc-cRoahL jMEXQr mb-4" style={{ color: '#black' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="nav-icon">
                        <path d="M20 16.7017V14.2653L19.0668 14.0268C19.0603 14.0111 19.0538 13.9953 19.0471 13.9798L19.5383 13.1517L17.8155 11.4289L16.9875 11.9202C16.9716 11.9134 16.9558 11.9069 16.9404 11.9005L16.7019 10.9675H14.2655L14.0271 11.9008C14.0113 11.9072 13.9956 11.9137 13.98 11.9205L13.1519 11.4292L11.4291 13.152L11.9204 13.9801C11.9136 13.996 11.9071 14.0117 11.9007 14.0272L10.9677 14.2656V16.702L11.901 16.9405C11.9074 16.9562 11.9139 16.972 11.9207 16.9876L11.4294 17.8156L13.1522 19.5384L13.9803 19.0472C13.9962 19.0539 14.0119 19.0604 14.0274 19.0669L14.2658 19.9998H16.7022L16.9407 19.0665C16.9564 19.0601 16.9722 19.0536 16.9878 19.0469L17.8158 19.5381L19.5387 17.8153L19.0474 16.9872C19.0542 16.9713 19.0606 16.9556 19.0671 16.9402L20 16.7017ZM18.7281 17.7137L17.7139 18.7279L17.0245 18.3188L16.8693 18.393C16.7693 18.4404 16.6671 18.4833 16.5619 18.5205L16.3993 18.5781L16.2013 19.3546H14.7667L14.5687 18.5781L14.4062 18.5205C14.301 18.4836 14.1984 18.4408 14.0987 18.393L13.9436 18.3188L13.2542 18.7279L12.24 17.7137L12.649 17.0243L12.5748 16.8691C12.5274 16.7691 12.4846 16.6669 12.4474 16.5617L12.3897 16.3991L11.6129 16.2011V14.7665L12.3894 14.5685L12.4471 14.406C12.4839 14.3008 12.5268 14.1982 12.5745 14.0985L12.6487 13.9434L12.2396 13.2539L13.2538 12.2397L13.9433 12.6488L14.0984 12.5746C14.1984 12.5272 14.3007 12.4844 14.4059 12.4472L14.5684 12.3895L14.7664 11.6127H16.201L16.399 12.3892L16.5616 12.4469C16.6668 12.4837 16.7693 12.5266 16.869 12.5743L17.0242 12.6485L17.7136 12.2394L18.7278 13.2536L18.3187 13.9431L18.3929 14.0982C18.4403 14.1982 18.4832 14.3004 18.5203 14.4057L18.578 14.5682L19.3548 14.7662V16.2008L18.5783 16.3988L18.5207 16.5613C18.4838 16.6666 18.441 16.7691 18.3932 16.8688L18.3191 17.0239L18.7281 17.7137Z" fill="#000000">
                        </path>
                        <path d="M15.4839 12.9031C14.0609 12.9031 12.9032 14.0608 12.9032 15.4837C12.9032 16.9067 14.0609 18.0644 15.4839 18.0644C16.9068 18.0644 18.0645 16.9067 18.0645 15.4837C18.0645 14.0608 16.9068 12.9031 15.4839 12.9031ZM15.4839 17.4192C14.4164 17.4192 13.5484 16.5512 13.5484 15.4837C13.5484 14.4163 14.4164 13.5482 15.4839 13.5482C16.5513 13.5482 17.4194 14.4163 17.4194 15.4837C17.4194 16.5512 16.5513 17.4192 15.4839 17.4192Z" fill="#000000">
                        </path>
                        <path d="M15.4839 14.1936C14.7722 14.1936 14.1935 14.7723 14.1935 15.4839C14.1935 16.1956 14.7722 16.7742 15.4839 16.7742C16.1955 16.7742 16.7742 16.1956 16.7742 15.4839C16.7742 14.7723 16.1955 14.1936 15.4839 14.1936ZM15.4839 16.1291C15.1281 16.1291 14.8387 15.8397 14.8387 15.4839C14.8387 15.1281 15.1281 14.8388 15.4839 14.8388C15.8397 14.8388 16.129 15.1281 16.129 15.4839C16.129 15.8397 15.8397 16.1291 15.4839 16.1291Z" fill="#000000">
                        </path>
                        <path d="M8.16941 5.46198C8.27747 5.77873 8.46553 6.05799 8.70967 6.27741V6.551L7.17584 7.12607C6.54974 7.3606 6.12903 7.96749 6.12903 8.63612V10.3226H13.871V8.63612C13.871 7.96749 13.4503 7.3606 12.8245 7.12575L11.2903 6.55069V6.27741C11.5345 6.05831 11.7225 5.77904 11.8306 5.46198C12.4384 5.3577 12.9032 4.83036 12.9032 4.19355V2.90323C12.9032 1.30261 11.6009 0 9.99999 0C8.39906 0 7.09677 1.30261 7.09677 2.90323V4.19355C7.09677 4.83036 7.56158 5.3577 8.16941 5.46198ZM10.6452 6.68488L9.99999 7.76005L9.35483 6.68488V6.66126C9.55708 6.73324 9.7735 6.77419 9.99999 6.77419C10.2265 6.77419 10.4429 6.73292 10.6452 6.66126V6.68488ZM8.8938 7.17064L9.54416 8.25416L8.89805 8.57705L8.48065 7.32548L8.8938 7.17064ZM13.2258 8.63612V9.67742H6.77419V8.63612C6.77419 8.23478 7.02652 7.87093 7.40218 7.72996L7.87644 7.55229L8.52129 9.48715L9.99999 8.74779L11.4787 9.48715L12.1235 7.55229L12.5981 7.73028C12.9735 7.87093 13.2258 8.23478 13.2258 8.63612ZM11.5193 7.32548L11.1019 8.57737L10.4558 8.25447L11.1062 7.17064L11.5193 7.32548ZM9.99999 6.12903C9.28836 6.12903 8.70967 5.55034 8.70967 4.83871V3.52649C9.18189 3.47672 9.62748 3.30456 9.99999 3.01159C10.3725 3.30488 10.8181 3.47672 11.2903 3.52649V4.83871C11.2903 5.55034 10.7116 6.12903 9.99999 6.12903ZM11.9355 4.74909V3.63832C12.1275 3.75031 12.2581 3.95618 12.2581 4.19386C12.2581 4.43155 12.1275 4.6371 11.9355 4.74909ZM9.99999 0.645161C11.2448 0.645161 12.2581 1.65811 12.2581 2.90323V3.08263C12.0675 2.97158 11.849 2.90323 11.6129 2.90323H11.5575C11.0552 2.90323 10.5829 2.70776 10.2281 2.35257L9.99999 2.12418L9.77192 2.35257C9.41674 2.70776 8.94484 2.90323 8.44254 2.90323H8.38709C8.15098 2.90323 7.93252 2.97158 7.74193 3.08263V2.90323C7.74193 1.65811 8.75519 0.645161 9.99999 0.645161ZM8.06451 3.63801V4.74877C7.87251 4.63678 7.74193 4.43091 7.74193 4.19323C7.74193 3.95555 7.87251 3.75 8.06451 3.63801Z" fill="#000000">
                        </path>
                        <path d="M0 20.0001H6.45161V11.613H0V20.0001ZM0.645161 12.2582H5.80645V19.355H0.645161V12.2582Z" fill="#000000">
                        </path>
                        <path d="M1.29031 12.9031H5.16128V13.5482H1.29031V12.9031Z" fill="#000000">
                        </path>
                        <path d="M1.29031 14.1936H1.93547V14.8388H1.29031V14.1936Z" fill="#000000">
                        </path>
                        <path d="M2.58066 14.1936H5.1613V14.8388H2.58066V14.1936Z" fill="#000000">
                        </path>
                        <path d="M1.29031 15.4839H5.16128V16.129H1.29031V15.4839Z" fill="#000000">
                        </path>
                        <path d="M1.29031 16.7744H5.16128V17.4196H1.29031V16.7744Z" fill="#000000"></path><path d="M4.51611 18.0645H5.16127V18.7096H4.51611V18.0645Z" fill="#000000">
                        </path><path d="M1.29031 18.0645H3.87096V18.7096H1.29031V18.0645Z" fill="#000000"></path><path d="M8.61517 14.4215L8.15902 13.9653L6.64062 15.4837L8.15902 17.0021L8.61517 16.546L7.8755 15.8063H10.3226V15.1611H7.8755L8.61517 14.4215Z" fill="#000000"></path><path d="M3.54836 5.16136C3.54836 4.98369 3.69295 4.83878 3.87094 4.83878H5.35028L4.61061 5.57845L5.06676 6.0346L6.58515 4.5162L5.06676 2.9978L4.61061 3.45395L5.35028 4.19362H3.87094C3.33745 4.19362 2.9032 4.62788 2.9032 5.16136V10.9678H3.54836V5.16136Z" fill="#000000"></path><path d="M15.4839 5.16135V9.22133L14.7442 8.48166L14.288 8.93781L15.8064 10.4562L17.3248 8.93781L16.8687 8.48166L16.129 9.22133V5.16135C16.129 4.62786 15.6948 4.1936 15.1613 4.1936H13.5484V4.83876H15.1613C15.3393 4.83876 15.4839 4.98367 15.4839 5.16135Z" fill="#000000"></path></svg>
                    <span style={{ color: '#000000' }}>Lịch sử ôn luyện</span>
                </h2>
                <div className="row" style={{ display: 'flex', justifyContent: "space-between" }}>

                    {/* history table */}
                    <div className="col-lg-7">
                        <div style={{ background: '#538dd5', borderRadius: "10px" }} className="p-3 m-auto">
                            <p style={{ color: 'white', fontWeight: '500' }} className="m-auto">Mức độ thành thạo kiến thức các môn</p>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={pagination}
                        />
                    </div>


                    {/* statictis */}
                    <div className="col-lg-4" >
                        <div className="searchSubject w-75" style={{ margin: '10px auto' }}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                defaultValue="Tất cả các môn"
                                name="subjectId"
                                allowClear
                                onChange={(e) => handleOnChange("subjectName", e)}
                                value={selectdOption.subjectId}
                            >
                                <Option
                                    value="Tất cả các môn"
                                    key="all"
                                    name="all"
                                >
                                </Option>
                                {subjectList?.map((item) => (
                                    <Option
                                        value={item.subjectName}
                                        key={item.projectId}
                                        name="subjectName"
                                    >
                                        {item.subjectName}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="statictis">
                            <Pie {...config} />
                        </div>
                        <div className="mt-3">
                            <p>
                                * Mức độ thành thạo được tính toán và phân tích dựa trên dữ liệu làm bài của bạn trên toàn bộ hệ thống.
                                <div style={{ display: "flex", marginLeft: "50px" }}>
                                    <div style={{ background: "#538dd5", width: "10px", height: "10px", margin: "auto 0" }}></div>
                                    : am hiểu
                                </div>
                                <div style={{ display: "flex", marginLeft: "50px" }}>
                                    <div style={{ background: "black", width: "10px", height: "10px", margin: "auto 0" }}></div>
                                    : ôn lại
                                </div>
                            </p>
                            <p>
                                * Dữ liệu học tập sẽ bắt đầu được xử lý mỗi khi bạn hoàn thành 1 bài luyện hoặc bài kiểm tra
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}