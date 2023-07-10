import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState } from 'react';
import "../../assets/TakeExam.css"
import '../../assets/Style.css'
const icon1 = '../Image/Exam/icon-take-exam.png';

export default function TakeExam() {
    const fakeData = [
        {
            examtype: '1',
            id: '1',
            title: 'Kiểm tra 15 phút đề 1',
            subject: 'Toán',
            duration: 15,
            totalQuestion: 15,
            score: 8,
            status: 1
        }, {
            examtype: '1',
            id: '2',
            title: 'Kiểm tra 15 phút đề 2',
            subject: 'Toán',
            duration: 15,
            totalQuestion: 15,
            score: 0,
            status: 0
        }, {
            examtype: '1',
            id: '3',
            title: 'Kiểm tra 15 phút đề 3',
            subject: 'Toán',
            duration: 15,
            totalQuestion: 15,
            score: 0,
            status: 0
        }, {
            examtype: '1',
            id: '4',
            title: 'Kiểm tra 15 phút đề 4',
            subject: 'Toán',
            duration: 15,
            totalQuestion: 15,
            score: 0,
            status: 0
        }, {
            examtype: '2',
            id: '1',
            title: 'Kiểm tra 1 tiết đề 1',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '2',
            id: '2',
            title: 'Kiểm tra 1 tiết đề 2',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '2',
            id: '3',
            title: 'Kiểm tra 1 tiết đề 2',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '2',
            id: '4',
            title: 'Kiểm tra 1 tiết đề 2',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '3',
            id: '1',
            title: 'THPT quốc gia lần 1',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '3',
            id: '2',
            title: 'THPT quốc gia lần 2',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '3',
            id: '3',
            title: 'THPT quốc gia lần 3',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }, {
            examtype: '3',
            id: '4',
            title: 'Đề THPT quốc gia lần 4',
            subject: 'Toán',
            duration: 45,
            totalQuestion: 50,
            score: 0,
            status: 0
        }
    ]

    const [data, setData] = useState("0")
    const onChange = (e) => {
        setData(e.target.value)
    }

    const onClick = (e) => {
        console.log("radio value ", data);
    }

    return (
        <>
            <Header />
            <div className='exam-body'>
                <div className='exam-type'>
                    <div className='exam-type-title'>
                        <img src={icon1}></img>
                        <p>Đề thi 15 phút</p>
                    </div>
                    <div className='exam-line' style={{ width: 250 }}></div>
                    <div className='exam-detail'>
                        {fakeData.map((item) => (
                            item.examtype == 1 && (
                                <div className='exam-item'>
                                    <div className='exam-item-fixed'>
                                        <div className='exam-item-title'>{item.title}</div>
                                        <div className='exam-item-subject'>{item.subject}</div>
                                        {item.status == 1 ?
                                            <div className='exam-item-status-did'>Đã làm</div>
                                            :
                                            <div className='exam-item-status-didnt'>Chưa làm</div>
                                        }
                                        {item.status == 1 &&
                                            <div className='exam-item-des-dtl' style={{ display: 'inline-block', marginLeft: 10 }}>Điểm cao nhất: 8</div>
                                        }
                                        <div className='exam-item-des'>
                                            <div className='exam-item-des-dtl'>Thời gian làm bài: {item.duration} phút</div>
                                            <div className='exam-item-des-dtl'>Số câu hỏi: {item.totalQuestion} câu</div>

                                        </div>
                                    </div>
                                    {item.status == 1 ?
                                        <div className='exam-button-start'>
                                            <div className='exam-button-again'>
                                                <button onClick={onClick}><a href='/exam'>Bắt đầu</a></button>
                                            </div>
                                            <a class="icon-link icon-link-hover" href="/examResult" style={{marginBottom:10, marginLeft:10}}>
                                                Chi tiết bài làm
                                                <svg class="bi" aria-hidden="true"></svg>
                                            </a>
                                        </div>
                                        : <div className='exam-button'>
                                            <button onClick={onClick}><a href='/exam'>Bắt đầu</a></button>
                                        </div>
                                    }
                                </div>
                            )))}
                    </div>
                </div>
                <div className='exam-type'>
                    <div className='exam-type-title'>
                        <img src={icon1}></img>
                        <p>Đề thi 1 tiết</p>
                    </div>
                    <div className='exam-line' style={{ width: 200 }}></div>
                    <div className='exam-detail'>
                        {fakeData.map((item) => (
                            item.examtype == 2 && (
                                <div className='exam-item'>
                                    <div className='exam-item-fixed'>
                                        <div className='exam-item-title'>{item.title}</div>
                                        <div className='exam-item-subject'>{item.subject}</div>
                                        {item.status == 1 ?
                                            <div className='exam-item-status-did'>Đã làm</div>
                                            :
                                            <div className='exam-item-status-didnt'>Chưa làm</div>
                                        }
                                        {item.status == 1 &&
                                            <div className='exam-item-des-dtl' style={{ display: 'inline-block', marginLeft: 10 }}>Điểm cao nhất: 8</div>
                                        }
                                        <div className='exam-item-des'>
                                            <div className='exam-item-des-dtl'>Thời gian làm bài: {item.duration} phút</div>
                                            <div className='exam-item-des-dtl'>Số câu hỏi: {item.totalQuestion} câu</div>

                                        </div>
                                    </div>
                                    {item.status == 1 ?
                                        <div className='exam-button-start'>
                                            <div className='exam-button-again'>
                                                <button onClick={onClick}><a href='/exam'>Bắt đầu</a></button>
                                            </div>
                                            <a class="icon-link icon-link-hover" href="/examResult" style={{marginBottom:10, marginLeft:10}}>
                                                Chi tiết bài làm
                                                <svg class="bi" aria-hidden="true"></svg>
                                            </a>
                                        </div>
                                        : <div className='exam-button'>
                                            <button onClick={onClick}><a href='/exam'>Bắt đầu</a></button>
                                        </div>
                                    }
                                </div>
                            )))}
                    </div>
                </div>
                <div className='exam-type'>
                    <div className='exam-type-title'>
                        <img src={icon1}></img>
                        <p>Đề thi THPT quốc gia</p>
                    </div>
                    <div className='exam-line' style={{ width: 320 }}></div>
                    <div className='exam-detail'>
                        {fakeData.map((item) => (
                            item.examtype == 3 && (
                                <div className='exam-item'>
                                    <div className='exam-item-fixed'>
                                        <div className='exam-item-title'>{item.title}</div>
                                        <div className='exam-item-subject'>{item.subject}</div>
                                        {item.status == 1 ?
                                            <div className='exam-item-status-did'>Đã làm</div>
                                            :
                                            <div className='exam-item-status-didnt'>Chưa làm</div>
                                        }
                                        {item.status == 1 &&
                                            <div className='exam-item-des-dtl' style={{ display: 'inline-block', marginLeft: 10 }}>Điểm cao nhất: 8</div>
                                        }
                                        <div className='exam-item-des'>
                                            <div className='exam-item-des-dtl'>Thời gian làm bài: {item.duration} phút</div>
                                            <div className='exam-item-des-dtl'>Số câu hỏi: {item.totalQuestion} câu</div>

                                        </div>
                                    </div>
                                    {item.status == 1 ?
                                        <div className='exam-button-start'>
                                            <div className='exam-button-again'>
                                                <button onClick={onClick}><a href='/exam'>Bắt đầu</a></button>
                                            </div>
                                            <a class="icon-link icon-link-hover" href="/examResult" style={{marginBottom:10, marginLeft:10}}>
                                                Chi tiết bài làm
                                                <svg class="bi" aria-hidden="true"></svg>
                                            </a>
                                        </div>

                                        : <div className='exam-button'>
                                            <button onClick={onClick}><a href='/exam'>Bắt đầu</a></button>
                                        </div>
                                    }
                                </div>
                            )))}
                    </div>
                </div>
            </div>

        </>
    )
}