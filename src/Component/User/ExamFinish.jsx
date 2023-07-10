import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState } from 'react';
import "../../assets/ExamFinish.css"
import '../../assets/Style.css'
const icon1 = '../Image/Exam/icon-take-exam.png';
export default function ExamFinish() {

    return (
        <>
            <Header />
            <div className='exam-finish'>
                <div className='exam-finish-title'>
                    <img src={icon1}></img>
                    <p>Kết quả kiểm tra</p>
                </div>
                <div className='exam-finish-line' style={{ width: 250 }}></div>
                <div className='exam-finish-result'>
                    <h5>Kiểm tra 15 phút lần 1</h5>
                    <hr></hr>
                    <p>Môn thi: <span>Toán</span></p>
                    <p>Số câu hỏi: <span>15 câu</span></p>
                    <p>Thời gian: <span>15 phút</span></p>
                    <p>Số câu đúng: <span style={{color: 'red'}}>5/15</span></p>
                    <p>Điểm: <span style={{color: 'red'}}>3.3</span></p>
                    <p style={{fontStyle: 'italic'}}>• Bạn cần cố gắng thêm để có kết quả tốt hơn</p>
                    <div className='exam-finish-result-button'>
                        <div className='exam-finish-result-button-other'>
                            Trang chủ
                        </div>
                        <div className='exam-finish-result-button-detail'>
                            Chi tiết
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}