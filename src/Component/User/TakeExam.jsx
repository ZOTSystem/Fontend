import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetTopicByGrade } from '../../services/topicService';
import { AddTestDetailService } from '../../services/testDetailService';
import { Modal } from 'antd';
import { UserContext } from '../../contexts/UserContext';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "../../assets/TakeExam.css"
import '../../assets/Style.css'

export default function TakeExam() {

    const { user } = useContext(UserContext);

    //#region take subjectId
    const location = useLocation();
    let subjectId = location.state.subjectId;
    let subjectName = location.state.subjectName;
    //#endregion

    //#region move to study screen
    const navigate = useNavigate();

    const handleClick = async (item) => {
        const result = await AddTestDetailService(user.accountId);
        const testDetailId = result.testdetail.testDetailId;
        if (result) {
            navigate('/exam', {
                state: {
                    testDetailId: testDetailId,
                    topicId: item.topicId,
                    duration: item.duration,
                    topicName: item.topicName,
                },
            });
        }
    };
    //#endregion

    //#region  get topic list by grade and subjecId
    const [topicStudy, setTopicStudy] = useState([]);
    const [topicType, setTopicType] = useState('');
    const [grade, setGrade] = useState('');
    const handleListTopic = async (grade, subjectId, topicType, accountId) => {
        try {
            setTopicType(topicType)
            setGrade(grade)
            const result = grade === undefined && topicType === undefined
                ? await GetTopicByGrade('', subjectId, '', accountId)
                : grade === undefined
                ? await GetTopicByGrade('', subjectId, topicType, accountId)
                : topicType === undefined
                ? await GetTopicByGrade(grade, subjectId, '', accountId)
                : await GetTopicByGrade(grade, subjectId, topicType, accountId)
            if (result.status === 200) {
                setTopicStudy(result.data);
            }
        } catch (error) {
            console.error('Error fetching mod service:', error);
        }
    };
    useEffect(() => {
        handleListTopic();
    }, []);
    //#endregion

    //#region show modal confirm

    const { confirm } = Modal;
    const showConfirm = (item) => {
        confirm({
            title: 'Vui lòng kiểm tra thật kĩ trước khi bắt đầu làm bài',
            width: 600,
            icon: <ExclamationCircleFilled />,
            content: 'Chúc bạn có được kết quả tốt',
            onOk() {
                handleClick(item)
            },
            okText: 'Bắt đầu',
            cancelText: 'Hủy',
        });
    };
    //#endregion
    return (
        <>
            <Header />
            <span>
                <div className='body'>
                    <div className='sc-fxNNfJ jUsJDi dashboard'>
                        <div className='sc-hKgILt gTLZXx container-fluid'>
                            <div className='sc-JooDp huvkpK'>
                                <h2
                                    className='sc-fXvjs bqWVUS'
                                    style={{ color: 'black' }}
                                >
                                    <svg
                                        width='20'
                                        height='20'
                                        viewBox='0 0 20 20'
                                        fill='none'
                                    >
                                        <path
                                            d='M17.6667 9.66667H16.3333C16.2895 9.66678 16.2461 9.65823 16.2057 9.64151C16.1652 9.6248 16.1284 9.60025 16.0974 9.56928C16.0664 9.5383 16.0419 9.50151 16.0252 9.46103C16.0084 9.42054 15.9999 9.37714 16 9.33334V9.14651C16.7892 8.65964 17.3538 7.88033 17.5705 6.97867C17.8698 6.92462 18.1415 6.76991 18.3407 6.54022C18.54 6.31052 18.6547 6.01964 18.6659 5.71579C18.6771 5.41194 18.5842 5.11338 18.4024 4.86961C18.2207 4.62585 17.9611 4.45153 17.6667 4.37555V3.00001C17.6659 2.41525 17.4458 1.85204 17.05 1.42166C16.6541 0.991274 16.1112 0.725009 15.5285 0.675467C15.3881 0.466796 15.1984 0.295982 14.9762 0.17816C14.754 0.0603387 14.5061 -0.000852407 14.2546 8.96966e-06H13C12.2046 0.00090226 11.4421 0.31726 10.8797 0.879675C10.3173 1.44209 10.0009 2.20463 10 3.00001V4.00001C10 4.08841 10.0351 4.1732 10.0976 4.23571C10.1601 4.29822 10.2449 4.33334 10.3333 4.33334H10.6667V4.37538C10.3724 4.45135 10.1129 4.62557 9.93119 4.86918C9.74947 5.1128 9.65644 5.41118 9.66749 5.7149C9.67855 6.01862 9.79303 6.30944 9.99198 6.5392C10.1909 6.76895 10.4624 6.92385 10.7614 6.97822C10.7701 7.0148 10.7793 7.05123 10.7892 7.08751L11.4325 6.91251C11.3665 6.66939 11.3332 6.41858 11.3333 6.16667V4.32326C12.6496 4.26033 13.9316 3.88249 15.0717 3.22147C15.1636 3.57255 15.3417 3.89512 15.5899 4.15992C15.8381 4.42472 16.1484 4.62336 16.4928 4.73784L17 4.90693V6.16667C17 6.68655 16.8569 7.19638 16.5865 7.64038C16.316 8.08438 15.9287 8.44543 15.4668 8.684C15.0049 8.92258 14.4863 9.02948 13.9677 8.99302C13.4491 8.95655 12.9505 8.77812 12.5265 8.47726L12.1401 9.02051C12.3063 9.13857 12.4825 9.24192 12.6667 9.32938V9.33334C12.6666 9.42172 12.6314 9.50644 12.5689 9.56893C12.5064 9.63142 12.4217 9.66657 12.3333 9.66667H12V8.66667C11.9996 8.31317 11.859 7.97427 11.609 7.7243C11.3591 7.47434 11.0202 7.33374 10.6667 7.33334H1.33333C0.979833 7.33374 0.640925 7.47434 0.390963 7.7243C0.141 7.97427 0.000397018 8.31317 0 8.66667V9.66667H0.666667V8.66667C0.666876 8.48993 0.737181 8.32048 0.86216 8.1955C0.987139 8.07052 1.15659 8.00022 1.33333 8.00001H10.6667C10.8434 8.00022 11.0129 8.07052 11.1378 8.1955C11.2628 8.32048 11.3331 8.48993 11.3333 8.66667V14.6667C11.3331 14.8434 11.2628 15.0129 11.1378 15.1378C11.0129 15.2628 10.8434 15.3331 10.6667 15.3333H6.98375L7.32592 13.7365C7.33633 13.6879 7.33574 13.6376 7.3242 13.5893C7.31266 13.5409 7.29045 13.4958 7.25921 13.4571C7.22796 13.4185 7.18847 13.3873 7.14362 13.3659C7.09877 13.3445 7.0497 13.3333 7 13.3333H4.66667C4.60143 13.3333 4.53763 13.3525 4.48317 13.3884C4.42871 13.4243 4.38599 13.4754 4.36029 13.5354L3.58975 15.3333H1.33333C1.15659 15.3331 0.987139 15.2628 0.86216 15.1378C0.737181 15.0129 0.666876 14.8434 0.666667 14.6667V10.3333H0V14.6667C0.000397018 15.0202 0.141 15.3591 0.390963 15.609C0.640925 15.859 0.979833 15.9996 1.33333 16H3.30417L2.44688 18H0.333333C0.244928 18 0.160143 18.0351 0.0976311 18.0976C0.0351189 18.1601 0 18.2449 0 18.3333V19.6667C0 19.7551 0.0351189 19.8399 0.0976311 19.9024C0.160143 19.9649 0.244928 20 0.333333 20H19.6667C19.7551 20 19.8399 19.9649 19.9024 19.9024C19.9649 19.8399 20 19.7551 20 19.6667V18.3333C20 18.2449 19.9649 18.1601 19.9024 18.0976C19.8399 18.0351 19.7551 18 19.6667 18H19.0943C19.3789 17.7503 19.6069 17.4427 19.7631 17.0978C19.9193 16.7529 20 16.3786 20 16V15.6667H19.3333V16C19.3327 16.5303 19.1218 17.0386 18.7469 17.4135C18.3719 17.7885 17.8636 17.9994 17.3333 18H12V17.3333C12.0003 17.0682 12.1058 16.814 12.2932 16.6266C12.4807 16.4391 12.7349 16.3336 13 16.3333H17.3333C17.4217 16.3333 17.5065 16.2982 17.569 16.2357C17.6315 16.1732 17.6667 16.0884 17.6667 16V13.6667H19.3333V15H20V12C19.9993 11.3814 19.7532 10.7883 19.3158 10.3509C18.8784 9.91344 18.2853 9.66738 17.6667 9.66667ZM17.6667 6.16667V5.09022C17.7552 5.14123 17.8308 5.21193 17.8876 5.29684C17.9444 5.38175 17.9809 5.4786 17.9943 5.57988C18.0076 5.68117 17.9975 5.78417 17.9647 5.88092C17.9319 5.97766 17.8772 6.06556 17.805 6.1378C17.7631 6.17935 17.7159 6.21522 17.6647 6.24451C17.6653 6.21855 17.6667 6.19276 17.6667 6.16667ZM10.3333 5.66667C10.3332 5.57917 10.3503 5.49249 10.3838 5.41163C10.4172 5.33078 10.4664 5.25734 10.5283 5.19555C10.5697 5.15455 10.6162 5.11909 10.6667 5.09005V6.16667C10.6667 6.19247 10.6674 6.21817 10.668 6.24392C10.5664 6.18559 10.482 6.10151 10.4232 6.00017C10.3645 5.89884 10.3335 5.78381 10.3333 5.66667ZM15 2.48584C13.7831 3.25845 12.3711 3.66807 10.9296 3.66668H10.6667V3.29538C13.5201 2.92167 14.5263 1.94513 14.569 1.90238L14.0998 1.42888C14.0973 1.43122 13.8549 1.66176 13.2697 1.92826C12.7774 2.15247 11.9458 2.44384 10.6984 2.61834C10.7339 2.40294 10.7997 2.19365 10.8938 1.99668C12.1409 1.96147 12.7873 1.64568 12.8158 1.63147L12.5194 1.0343C12.5147 1.03663 12.1415 1.21313 11.4107 1.29384C11.8416 0.890589 12.4098 0.66637 13 0.666676H14.2546C14.4044 0.66614 14.5519 0.704423 14.6825 0.777794C14.8131 0.851165 14.9225 0.957123 15 1.08534V2.48584ZM16.7037 4.10542C16.4015 4.00503 16.1387 3.81198 15.9526 3.5537C15.7664 3.29542 15.6664 2.98505 15.6667 2.66668V1.36668C16.0429 1.44403 16.3809 1.64873 16.6238 1.94625C16.8666 2.24378 16.9995 2.61594 17 3.00001V4.20417L16.7037 4.10542ZM13.3071 9.55997C13.98 9.72996 14.6882 9.69625 15.3419 9.46309C15.37 9.68196 15.4701 9.88528 15.6264 10.0411C15.6756 10.0901 15.7297 10.1339 15.7878 10.1718L15.6928 10.2984C15.524 10.5242 15.3031 10.7059 15.049 10.828C14.795 10.9501 14.5151 11.0091 14.2334 10.9999C13.9516 10.9908 13.6762 10.9137 13.4306 10.7753C13.185 10.6369 12.9764 10.4412 12.8226 10.205C12.9436 10.1368 13.0492 10.0443 13.1326 9.93331C13.216 9.82228 13.2754 9.69515 13.3071 9.55997ZM11.3333 17.3333V18H9.66667V17.3333H11.3333ZM10.6257 16H10.6667C10.7791 16.0001 10.8911 15.9859 11 15.9578V16.6667H10.359L10.6257 16ZM7.959 16H9.90767L9.641 16.6667H9.33333C9.24493 16.6667 9.16014 16.7018 9.09763 16.7643C9.03512 16.8268 9 16.9116 9 17V18H8.33333V17C8.33333 16.9116 8.29821 16.8268 8.2357 16.7643C8.17319 16.7018 8.08841 16.6667 8 16.6667H7.69233L7.959 16ZM6.84088 16H7.24088L6.97421 16.6667H6.69792L6.84088 16ZM7.66667 17.3333V18H6.4125L6.55533 17.3333H7.66667ZM4.88646 14H6.5875L5.73038 18H3.17204L4.88646 14ZM19.3333 18.6667V19.3333H0.666667V18.6667H19.3333ZM19.3333 13H17.6667V12H17V15.6667H13C12.7411 15.6667 12.4858 15.7271 12.2544 15.843C12.0229 15.9589 11.8217 16.1272 11.6667 16.3345V15.547C11.8816 15.3041 12.0002 14.991 12 14.6667V10.3333H12.1275C12.3126 10.7016 12.5887 11.0165 12.9295 11.2481C13.2704 11.4798 13.6648 11.6206 14.0753 11.6571C14.4858 11.6937 14.8988 11.6248 15.2752 11.457C15.6517 11.2892 15.979 11.0281 16.2262 10.6983L16.5 10.3333H17.6667C18.1085 10.3338 18.5322 10.5096 18.8446 10.822C19.1571 11.1345 19.3328 11.5581 19.3333 12V13ZM15.641 12.0333L15.9316 12.6333C15.3929 12.8942 14.7985 13.0193 14.2003 12.9976C13.6021 12.9759 13.0184 12.808 12.5 12.5088L12.8333 11.9314C13.2575 12.1763 13.7351 12.3136 14.2245 12.3314C14.7139 12.3491 15.2002 12.2468 15.641 12.0333H15.641ZM13.3333 5.33334C13.3333 5.4652 13.2942 5.59409 13.221 5.70372C13.1477 5.81335 13.0436 5.8988 12.9218 5.94926C12.8 5.99972 12.6659 6.01292 12.5366 5.9872C12.4073 5.96147 12.2885 5.89798 12.1953 5.80475C12.102 5.71151 12.0385 5.59272 12.0128 5.4634C11.9871 5.33408 12.0003 5.20004 12.0507 5.07822C12.1012 4.9564 12.1867 4.85228 12.2963 4.77903C12.4059 4.70577 12.5348 4.66668 12.6667 4.66668C12.8434 4.66688 13.0129 4.73719 13.1378 4.86217C13.2628 4.98715 13.3331 5.15659 13.3333 5.33334ZM14.6667 5.33334C14.6667 5.20149 14.7058 5.07259 14.779 4.96296C14.8523 4.85333 14.9564 4.76788 15.0782 4.71742C15.2 4.66696 15.3341 4.65376 15.4634 4.67948C15.5927 4.70521 15.7115 4.7687 15.8047 4.86194C15.898 4.95517 15.9615 5.07396 15.9872 5.20328C16.0129 5.3326 15.9997 5.46665 15.9493 5.58846C15.8988 5.71028 15.8133 5.8144 15.7037 5.88765C15.5941 5.96091 15.4652 6.00001 15.3333 6.00001C15.1566 5.9998 14.9871 5.92949 14.8622 5.80451C14.7372 5.67954 14.6669 5.51009 14.6667 5.33334ZM14.8182 6.42501L15.1818 6.9838C14.83 7.21244 14.4195 7.33413 14 7.33413C13.5805 7.33413 13.17 7.21244 12.8182 6.9838L13.1818 6.42501C13.4253 6.58333 13.7095 6.66761 14 6.66761C14.2905 6.66761 14.5747 6.58333 14.8182 6.42501ZM4.66667 9.66667H3.33333V9.00001H4.66667V9.66667ZM6.66667 9.00001V9.66667H5.33333V9.00001H6.66667ZM8.66667 9.00001V9.66667H7.33333V9.00001H8.66667ZM10.6667 9.66667H9.33333V9.00001H10.6667V9.66667ZM2.66667 9.00001V9.66667H1.33333V9.00001H2.66667Z'
                                            fill='#000000'
                                        ></path>
                                    </svg>
                                    <span>Đề kiểm Tra</span>
                                    <span className='topic-subject'>{subjectName}</span>
                                </h2>
                            </div>
                            <div
                                className='topic-study-grade'
                                style={{ display: 'flex' }}
                            >
                                <select
                                    class='form-select form-select-lg mb-3'
                                    aria-label='.form-select-lg example'
                                    onChange={(e) => handleListTopic(grade, subjectId, e.target.value, user.accountId)}
                                >
                                    <option selected>Chọn bài kiểm tra</option>
                                    <option value='2'>Kiểm tra 15 phút</option>
                                    <option value='3'>Kiểm tra 1 tiết</option>
                                    <option value='4'>Kiểm tra học kì</option>
                                    <option value='5'>THPT Quốc Gia</option>
                                </select>
                            </div>

                            {topicType !== '5' &&
                                <div
                                    className='topic-study-grade'
                                    style={{ display: 'flex' }}
                                >
                                    <select
                                        class='form-select form-select-lg mb-3'
                                        aria-label='.form-select-lg example'
                                        onChange={(e) => handleListTopic(e.target.value, subjectId, topicType, user.accountId)}
                                    >
                                        <option selected>Chọn khối</option>
                                        <option value='10'>Khối 10</option>
                                        <option value='11'>Khối 11</option>
                                        <option value='12'>Khối 12</option>
                                    </select>
                                </div>
                            }

                            <div
                                className='exam-detail'
                                style={{ width: '100%', height: 'auto' }}
                            >
                                {topicStudy.map((item, index) =>
                                    <div className='exam-item'
                                    >
                                        <div className='exam-item-fixed'>
                                            <div className='exam-item-title'>{item.topicName}</div>
                                            <div className='exam-item-subject'>{subjectName}</div>
                                            {item.score !== null ?
                                                <>
                                                    <div className='exam-item-status-did'>Đã làm</div>
                                                    <div className='exam-item-des-dtl' style={{ display: 'inline-block', marginLeft: 10 }}>Điểm cao nhất: {item.score}</div>
                                                </>
                                                :
                                                <div className='exam-item-status-didnt'>Chưa làm</div>
                                            }
                                            <div className='exam-item-des'>
                                                <div className='exam-item-des-dtl'>Thời gian làm bài: {item.duration} phút</div>
                                                <div className='exam-item-des-dtl'>Số câu hỏi: {item.totalQuestion} câu</div>
                                            </div>
                                        </div>
                                        {item.score !== null ?
                                            <div className='exam-button-start'>
                                                <div className='exam-button-again'>
                                                    <button style={{ color: 'white' }} onClick={() => showConfirm(item)}>Bắt đầu lại</button>
                                                </div>
                                            </div>
                                            :
                                            <div className='exam-button-start' style={{ marginLeft: 30 }}>
                                                <div className='exam-button'>
                                                    <button style={{ color: 'white' }} onClick={() => showConfirm(item)}>Bắt đầu</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        </>
    )
}