import Header from '../../Layout/User/Header';
import Footer from '../../Layout/User/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import { Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { notification } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetNewsInPageService } from '../../services/NewsService';



import { GetNewsInUserPageService } from '../../services/NewsService';

export default function News() {
    const navigate = useNavigate();

    //#region - Declare - khai báo biến
    const [dataSource, setDataSource] = useState({
        firstNew: "",
        dailyNew: [],
        // listNew: [],
    })
    const [newsInPage, setNewInPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [totalPosts, setTotalPosts] = useState(0);

    //#endregion

    //#region - Function - hiển thị thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotificationGetData400 = (placement) => {
        api.error({
            message: `Thông báo`,
            description: 'Lấy dữ liệu',
            placement,
        });
    };
    //#endregion

    //#region - Function - hiển thị tin tức
    const handleGetAllNews = async () => {
        try {
            const result = await GetNewsInUserPageService();
            const result2 = await GetNewsInPageService(currentPage, pageSize);
            console.log(result2);
            if (result.status === 200) {
                setDataSource({
                    firstNew: result.firstNew,
                    dailyNew: result.dailyNew,
                    // otherNew: result.otherNew,
                });
            } else {
                openNotificationGetData400("topRight")
            }
            if (result2.status === 200) {
                setNewInPage(result2.data);
                setTotalPosts(result2.totalCount);
            } else {
                openNotificationGetData400("topRight")
            }

        } catch (error) {
            openNotificationGetData400("topRight");
        }
    }

    useEffect(() => {
        handleGetAllNews();
    }, [])
    //#endregion 


    //#region - Function - chuyển đến bài viết chi tiết
    const handleDivClick = (id) => {
        navigate(`/news/newDetail/${id}`);
    }
    //#endregion

    //#region - Function - chuyển trang
    const handlePaginationChange = async (page) => {
        const result2 = await GetNewsInPageService(page, pageSize);
        if (result2.status === 200) {
            setNewInPage(result2.data);
            setTotalPosts(result2.totalCount);
        } else {
            openNotificationGetData400("topRight")
        }
        setCurrentPage(page);
    };
    //#endregion

    return (
        <>
            {contextHolder}
            <Header />
            <div className='m-auto news' style={{ width: '80%' }}>
                <h2 className="sc-cRoahL jMEXQr mb-5" style={{ color: '#black' }}>
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" class="nav-icon"><path d="M9.52732 1.05469C9.44336 1.05469 8.35953 1.05469 7.94529 1.05469C7.94529 0.472183 7.47311 0 6.8906 0C6.3081 0 5.83592 0.472183 5.83592 1.05469C5.45328 1.05469 5.2377 1.05469 4.25389 1.05469C3.96266 1.05469 3.72655 1.32595 3.72655 1.61718V2.14453C3.72655 2.72703 4.19873 3.19921 4.78123 3.19921H8.99997C9.58248 3.19921 10.0547 2.72703 10.0547 2.14453V1.61718C10.0547 1.32595 9.81855 1.05469 9.52732 1.05469Z" fill="#000000">
                    </path>
                        <path d="M12.1992 2.14453H11.1445C11.1445 3.30788 10.1633 4.2539 8.99998 4.2539H4.78124C3.61789 4.2539 2.67187 3.30788 2.67187 2.14453H1.61718C0.744819 2.14453 0 2.85419 0 3.72656V16.3828C0 17.2552 0.744819 18 1.61718 18H12.1992C13.0716 18 13.7812 17.2552 13.7812 16.3828V3.72656C13.7812 2.85419 13.0716 2.14453 12.1992 2.14453ZM2.29904 6.20876C2.09306 6.00278 2.09306 5.66904 2.29904 5.46306C2.50502 5.25708 2.83876 5.25708 3.04474 5.46306L3.72656 6.14492L4.40841 5.46306C4.61439 5.25708 4.94813 5.25708 5.15411 5.46306C5.36009 5.66904 5.36009 6.00278 5.15411 6.20876L4.47225 6.89062L5.15411 7.57247C5.36009 7.77845 5.36009 8.11219 5.15411 8.31817C4.94813 8.52415 4.61439 8.52415 4.40841 8.31817L3.72656 7.63631L3.0447 8.31817C2.83872 8.52415 2.50498 8.52415 2.299 8.31817C2.09302 8.11219 2.09302 7.77845 2.299 7.57247L2.98086 6.89062L2.29904 6.20876ZM6.20879 13.5916L4.09942 15.7009C3.99641 15.8039 3.86148 15.8554 3.72659 15.8554C3.5917 15.8554 3.45673 15.8039 3.35376 15.7009L2.29907 14.6462C2.09302 14.4403 2.09302 14.1066 2.29904 13.9006C2.50502 13.6946 2.83876 13.6946 3.04474 13.9006L3.72656 14.5824L5.4631 12.8459C5.66908 12.6399 6.00281 12.6399 6.20879 12.8459C6.41477 13.0518 6.41477 13.3856 6.20879 13.5916ZM6.20879 9.90016L4.09942 12.0095C3.99641 12.1125 3.86148 12.164 3.72659 12.164C3.5917 12.164 3.45673 12.1125 3.35376 12.0095L2.29907 10.9548C2.09302 10.7489 2.09302 10.4152 2.29904 10.2092C2.50502 10.0032 2.83876 10.0032 3.04474 10.2092L3.72656 10.891L5.4631 9.15446C5.66908 8.94848 6.00281 8.94848 6.20879 9.15446C6.41477 9.36044 6.41477 9.69418 6.20879 9.90016ZM11.1445 14.8008H7.9453C7.65382 14.8008 7.41795 14.5649 7.41795 14.2734C7.41795 13.9819 7.65382 13.7461 7.9453 13.7461H11.1445C11.436 13.7461 11.6719 13.9819 11.6719 14.2734C11.6719 14.5649 11.436 14.8008 11.1445 14.8008ZM11.1445 11.1094H7.9453C7.65382 11.1094 7.41795 10.8735 7.41795 10.582C7.41795 10.2905 7.65382 10.0547 7.9453 10.0547H11.1445C11.436 10.0547 11.6719 10.2905 11.6719 10.582C11.6719 10.8735 11.436 11.1094 11.1445 11.1094ZM11.1445 7.41796H7.9453C7.65382 7.41796 7.41795 7.1821 7.41795 6.89062C7.41795 6.59914 7.65382 6.36327 7.9453 6.36327H11.1445C11.436 6.36327 11.6719 6.59914 11.6719 6.89062C11.6719 7.1821 11.436 7.41796 11.1445 7.41796Z" fill="#000000">
                        </path>
                        <path d="M16.4179 3.19922C15.5456 3.19922 14.8359 3.90888 14.8359 4.78125V6.36327H18V4.78125C18 3.90888 17.2903 3.19922 16.4179 3.19922Z" fill="#000000">
                        </path>
                        <path d="M14.8369 7.41797V13.0003L14.9914 12.8459C15.7783 12.059 17.0596 12.059 17.8465 12.8459L18.001 13.0004V7.41797H14.8369Z" fill="#000000">
                        </path>
                        <path d="M17.0998 13.5915C16.7239 13.2156 16.112 13.2156 15.7361 13.5915L15.1329 14.1947L15.9179 16.5496C15.9895 16.7649 16.1908 16.9101 16.4179 16.9101C16.6451 16.9101 16.8464 16.7649 16.918 16.5496L17.703 14.1947L17.0998 13.5915Z" fill="#000000">
                        </path>
                    </svg>
                    <span style={{ color: '#000000' }}>Tin tức</span>
                </h2>
                <div className='content'>
                    <div className='headerContent row dl-flex justify-content-between mb-3'>
                        <div className='col-lg-5 '>
                            <h3 style={{ textAlign: 'left', color: '#565656', fontWeight: 'bold' }}>Bảng tin mới nhất</h3>
                        </div>
                        <div className='col-lg-5'>
                            <h3 style={{ textAlign: 'right', color: '#565656', fontWeight: 'bold' }}>Bảng tin trong ngày</h3>
                        </div>
                    </div>
                    <div className='mainNews row mb-4 dl-flex justify-content-around'>
                        <div style={{ width: '65%' }}>
                            <div className="w-100 position-relative mb-4" style={{ maxHeight: '500px' }} onClick={() => handleDivClick(dataSource.firstNew.newsId)}>
                                <img src={dataSource.firstNew.image} alt="Background Image" className='w-100 h-100 object-fit-cover' style={{ maxHeight: '500px' }} />
                                <div className='position-absolute w-100 h-100' style={{ top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                                <div style={{ left: '20px', bottom: 0 }} className='position-absolute'>
                                    <p className='m-1' style={{ color: '#dfdfdf' }}>{dataSource.firstNew.categoryName}</p>
                                    <p className='text-white m-1' style={{ fontSize: '30px', fontWeight: 'bold' }}>{dataSource.firstNew.title}</p>
                                    <p className='m-1' style={{ color: '#dfdfdf' }}>{dataSource.firstNew.createdDay}</p>
                                </div>
                            </div>
                            <div className='w-100'>
                                <div style={{ borderBottom: '1px solid #e5e5e5' }} className='mb-2'>
                                    <p className='' style={{ fontSize: '30px', fontWeight: 'bold', color: '#565656' }}>Các bài viết khác</p>
                                </div>
                                {newsInPage?.map((item) => (
                                    <div className='row mb-2 pb-2 pt-2' style={{ borderBottom: '1px solid #e5e5e5' }}
                                        onClick={() => handleDivClick(item.newId)}>
                                        <div className='col-lg-3'>
                                            <img src={item.image} alt="" className='w-100' style={{ overflow: 'hidden' }} />
                                        </div>
                                        <div className='col-lg-8'>
                                            <p className='m-1'>{item.categoryName}</p>
                                            <p className='text-black m-1' style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</p>
                                            <p className='text-black'
                                                style={{ width: '500px', maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            >
                                                {item.subTitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className='w-100'>
                                    <Pagination
                                        defaultCurrent={1}
                                        current={currentPage}
                                        total={totalPosts}
                                        pageSize={pageSize}
                                        onChange={handlePaginationChange}
                                        className='w-50'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='dl-flex' style={{ width: '30%' }}>
                            <div className='row w-100'>
                                {dataSource.dailyNew?.map((item) => (
                                    <div className='col-lg-6 w-100 mb-2'
                                        onClick={() => handleDivClick(item.newsId)}>
                                        <div className="w-100 position-relative" style={{ maxHeight: '200px' }}>
                                            <img src={item.image} alt="Background Image" className='w-100 h-100 object-fit-cover' style={{ maxHeight: '200px' }} />
                                            <div className='position-absolute w-100 h-100' style={{ top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                                            <div style={{ left: '20px', bottom: 0 }} className='position-absolute'>
                                                <p className='m-1' style={{ color: '#dfdfdf' }}>{item.categoryName}</p>
                                                <p className='text-white m-1' style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}