import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { GetQuestionTestByTestDetailId } from '../../services/testDetailService';
import "../../assets/ExamResult.css"
import '../../assets/Style.css'
const dongho = '../Image/Exam/clock.png';
const anhcauhoi = '../Image/Exam/anhcauhoi.jpg';
export default function ExamResult() {

    //#region take question of test detail
    const location = useLocation();
    let testDetailId = location.state.testDetailId;
    let topicName = location.state.topicName;
    let score = location.state.score;
    let answerRight = location.state.answerRight;
    let totalQuestion = location.state.totalQuestion;
    //#endregion

    const [listQuestion, setListQuestion] = useState([]);

    const handleGetData = async () => {
        try {
            const result = await GetQuestionTestByTestDetailId(testDetailId);
            if (result.status === 200) {
                setListQuestion(result.data);
            }
        } catch (error) {
            console.error('Error fetching mod service:', error);
        }
    };
    useEffect(() => {
        handleGetData();
    }, []);

    console.log(listQuestion)
    return (
        <>
            <Header />
            <div className='exam'>
                <div className='exam-right'>
                    <div className='exam-right-title'>
                        <h6>{topicName}</h6>
                    </div>
                    <div className='exam-right-question'>
                        <p>Điểm: {score}</p>
                        <p>Số câu đúng: {answerRight}/{totalQuestion}</p>
                        <div className='exam-right-question-num'>
                            {listQuestion.map((item, index) =>
                                <div className='exam-right-question-item' style={{}}>
                                    <p style={{ fontSize: 13, backgroundColor: item.answerUserChoose == null ? '' : item.answerUserChoose == item.answerRightByQuestion ? 'green' : 'red' }}>{index + 1}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='exam-left'>
                    <h4>Chi tiết bài thi</h4>
                    {listQuestion.map((item, index) =>
                        <div className='exam-left-quesion'>
                            <div className='exam-left-quesion-top'>
                                <p style={{ fontWeight: 'bold', paddingLeft: 10, width: 60 }}>Câu {index + 1}:</p>
                                <div className='exam-left-quesion-text'>
                                    <p>{item.questionContext}</p>
                                    <img src={item.image}></img>
                                </div>
                            </div>
                            <div className='exam-left-quesion-bottom'>
                                <div className='exam-left-quesion-answer'>
                                    {item.answerUserChoose == 1
                                        ?
                                        <input type='radio' value='1' name='topic' id='1' checked="checked" disabled></input>
                                        :
                                        <input type='radio' value='1' name='topic' id='1' disabled></input>
                                    }
                                    <div>
                                        <label for='1' style={{ color: item.answerRightByQuestion == 1 ? 'green' : item.answerUserChoose == 1 && item.answerRightByQuestion != 1 ? 'red' : '', fontWeight: item.answerUserChoose == 1 || item.answerRightByQuestion == 1 ? 'bold' : '' }}>A. {item.optionA}</label><br></br>
                                    </div>
                                </div>
                                <div className='exam-left-quesion-answer'>
                                    {item.answerUserChoose == 2
                                        ?
                                        <input type='radio' value='2' name='topic' id='2' checked="checked" disabled></input>
                                        :
                                        <input type='radio' value='2' name='topic' id='2' disabled></input>
                                    }
                                    <div>
                                        <label for='2' style={{ color: item.answerRightByQuestion == 2 ? 'green' : item.answerUserChoose == 2 && item.answerRightByQuestion != 2 ? 'red' : '', fontWeight: item.answerUserChoose == 2 || item.answerRightByQuestion == 2 ? 'bold' : '' }}>B. {item.optionB}</label><br></br>
                                    </div>
                                </div>
                                <div className='exam-left-quesion-answer'>
                                    {item.answerUserChoose == 3
                                        ?
                                        <input type='radio' value='3' name='topic' id='3' checked="checked" disabled></input>
                                        :
                                        <input type='radio' value='3' name='topic' id='3' disabled></input>
                                    }
                                    <div>
                                        <label for='3' style={{ color: item.answerRightByQuestion == 3 ? 'green' : item.answerUserChoose == 3 && item.answerRightByQuestion != 3 ? 'red' : '', fontWeight: item.answerUserChoose == 3 || item.answerRightByQuestion == 3 ? 'bold' : '' }}>C. {item.optionC}</label><br></br>
                                    </div>
                                </div>
                                <div className='exam-left-quesion-answer'>
                                    {item.answerUserChoose == 4
                                        ?
                                        <input type='radio' value='4' name='topic' id='4' checked="checked" disabled></input>
                                        :
                                        <input type='radio' value='4' name='topic' id='4' disabled></input>
                                    }
                                    <div>
                                        <label for='4' style={{ color: item.answerRightByQuestion == 4 ? 'green' : item.answerUserChoose == 4 && item.answerRightByQuestion != 4 ? 'red' : '', fontWeight: item.answerUserChoose == 4 || item.answerRightByQuestion == 4 ? 'bold' : '' }}>D. {item.optionD}</label><br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}