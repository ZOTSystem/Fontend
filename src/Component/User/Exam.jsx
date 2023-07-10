import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState } from 'react';
import "../../assets/Exam.css"
import '../../assets/Style.css'
const dongho = '../Image/Exam/clock.png';
const anhcauhoi = '../Image/Exam/anhcauhoi.jpg';
export default function Exam() {

    return (
        <>
            <Header />
            <div className='exam-top'>
                <div className='exam-timer'>
                    <img src={dongho}></img><h4>01:59:36</h4>
                </div>
            </div>
            <div className='exam'>
                <div className='exam-right'>
                    <div className='exam-right-title'>
                        <h6>15 phút môn toán đề 1</h6>
                    </div>
                    <div className='exam-right-question'>
                        <p>Câu hỏi</p>
                        <div className='exam-right-question-num'>
                            <div className='exam-right-question-item'>
                                <p>1</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>2</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>3</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>4</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>5</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>6</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>7</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>8</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>9</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>10</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>11</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>12</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>13</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>14</p>
                            </div>
                            <div className='exam-right-question-item'>
                                <p>15</p>
                            </div>
                        </div>
                    </div>
                    <div className='exam-right-button'>
                        <button className='btn btn-primary'>Nộp bài</button>
                    </div>
                </div>
                <div className='exam-left'>
                    <div className='exam-left-quesion'>
                        <div className='exam-left-quesion-top'>
                            <p style={{ fontWeight: 'bold', paddingLeft: 10, width: 60 }}>Câu 1:</p>
                            <div className='exam-left-quesion-text'>
                                <p>Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</p>
                                <img src={anhcauhoi}></img>
                            </div>
                        </div>
                        <div className='exam-left-quesion-bottom'>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='1' name='topic' id='1'></input>
                                <div>
                                    <label for='1' className=''>A. Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</label><br></br>
                                </div>
                            </div><div className='exam-left-quesion-answer'>
                                <input type='radio' value='2' name='topic' id='2'></input>
                                <div>
                                    <label for='2' className=''>B. Đáp án B</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='3' name='topic' id='3'></input>
                                <div>
                                    <label for='3' className=''>C. Đáp án C</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='4' name='topic' id='4'></input>
                                <div>
                                    <label for='4' className=''>D. Đáp án D</label><br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='exam-left-quesion'>
                        <div className='exam-left-quesion-top'>
                            <p style={{ fontWeight: 'bold', paddingLeft: 10, width: 60 }}>Câu 2:</p>
                            <div className='exam-left-quesion-text'>
                                <p>Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</p>
                                <img src={anhcauhoi}></img>
                            </div>
                        </div>
                        <div className='exam-left-quesion-bottom'>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='1' name='topic' id='1'></input>
                                <div>
                                    <label for='1' className=''>A. Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</label><br></br>
                                </div>
                            </div><div className='exam-left-quesion-answer'>
                                <input type='radio' value='2' name='topic' id='2'></input>
                                <div>
                                    <label for='2' className=''>B. Đáp án B</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='3' name='topic' id='3'></input>
                                <div>
                                    <label for='3' className=''>C. Đáp án C</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='4' name='topic' id='4'></input>
                                <div>
                                    <label for='4' className=''>D. Đáp án D</label><br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='exam-left-quesion'>
                        <div className='exam-left-quesion-top'>
                            <p style={{ fontWeight: 'bold', paddingLeft: 10, width: 60 }}>Câu 3:</p>
                            <div className='exam-left-quesion-text'>
                                <p>Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</p>
                                <img src={anhcauhoi}></img>
                            </div>
                        </div>
                        <div className='exam-left-quesion-bottom'>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='1' name='topic' id='1'></input>
                                <div>
                                    <label for='1' className=''>A. Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</label><br></br>
                                </div>
                            </div><div className='exam-left-quesion-answer'>
                                <input type='radio' value='2' name='topic' id='2'></input>
                                <div>
                                    <label for='2' className=''>B. Đáp án B</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='3' name='topic' id='3'></input>
                                <div>
                                    <label for='3' className=''>C. Đáp án C</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='4' name='topic' id='4'></input>
                                <div>
                                    <label for='4' className=''>D. Đáp án D</label><br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='exam-left-quesion'>
                        <div className='exam-left-quesion-top'>
                            <p style={{ fontWeight: 'bold', paddingLeft: 10, width: 60 }}>Câu 4:</p>
                            <div className='exam-left-quesion-text'>
                                <p>Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</p>
                                <img src={anhcauhoi}></img>
                            </div>
                        </div>
                        <div className='exam-left-quesion-bottom'>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='1' name='topic' id='1'></input>
                                <div>
                                    <label for='1' className=''>A. Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</label><br></br>
                                </div>
                            </div><div className='exam-left-quesion-answer'>
                                <input type='radio' value='2' name='topic' id='2'></input>
                                <div>
                                    <label for='2' className=''>B. Đáp án B</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='3' name='topic' id='3'></input>
                                <div>
                                    <label for='3' className=''>C. Đáp án C</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='4' name='topic' id='4'></input>
                                <div>
                                    <label for='4' className=''>D. Đáp án D</label><br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='exam-left-quesion'>
                        <div className='exam-left-quesion-top'>
                            <p style={{ fontWeight: 'bold', paddingLeft: 10, width: 60 }}>Câu 5:</p>
                            <div className='exam-left-quesion-text'>
                                <p>Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</p>
                                <img src={anhcauhoi}></img>
                            </div>
                        </div>
                        <div className='exam-left-quesion-bottom'>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='1' name='topic' id='1'></input>
                                <div>
                                    <label for='1' className=''>A. Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm được
                                    liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi
                                    hàm số đó là hàm số nào?</label><br></br>
                                </div>
                            </div><div className='exam-left-quesion-answer'>
                                <input type='radio' value='2' name='topic' id='2'></input>
                                <div>
                                    <label for='2' className=''>B. Đáp án B</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='3' name='topic' id='3'></input>
                                <div>
                                    <label for='3' className=''>C. Đáp án C</label><br></br>
                                </div>
                            </div>
                            <div className='exam-left-quesion-answer'>
                                <input type='radio' value='4' name='topic' id='4'></input>
                                <div>
                                    <label for='4' className=''>D. Đáp án D</label><br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}