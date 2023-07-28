import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { GetQuestionByTopicId } from '../../services/questionService';
import { Modal } from 'antd';
import "../../assets/Exam.css"
import '../../assets/Style.css'
const dongho = '../Image/Exam/clock.png';
export default function Exam() {

    //#region take subjectId
    const location = useLocation();
    let topicId = location.state.topicId;
    let testDetailId = location.state.testDetailId;
    let duration = location.state.duration;
    console.log("testDetailId: " + testDetailId)
    //#endregion

    //#region get question
    const [questions, setQuestions] = useState([]);
    const [questionDone, setQuestionDone] = useState([])
    const handleGetData = async () => {
        try {
            const result = await GetQuestionByTopicId(topicId);
            if (result.status === 200) {
                setQuestions(result.data);
                setQuestionDone(
                    result.data.map((item) => ({
                        questionId: item.questionId,
                        answerId: '',
                        isChoose: false,
                    })));
            }
        } catch (error) {
            console.error('Error fetching mod service:', error);
        }
    };
    useEffect(() => {
        handleGetData();
    }, []);
    //#endregion

    //#region choose question
    const handleQuestion = (e) => {
        const optionId = e.target.value;
        const questionId = e.target.name;
        console.log(optionId)
        console.log(questionId)
        setQuestionDone(
            questionDone.map((item, index) => {
                if (optionId != '' && questionId == item.questionId) {
                    return {
                        ...item,
                        answerId: optionId,
                        isChoose: true
                    }
                }
                else {
                    return {
                        ...item,
                    }
                }
            }
            ))
    }

    function handleClickScroll(questionId) {
        const element = document.getElementById(questionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    //#endregion

    //#region countdown timer
    const initialMinute = duration - 1;
    const initialSeconds = 59;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
            if (minutes === 0 && seconds === 0) {
                handleSubmit()
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });
    //#endregion


    const navigate = useNavigate();
    const handleSubmit = async () => {
        navigate('/examResult', {
            state: {
            },
        });
    };

    return (
        <>
            <Header />
            <div className='exam-top'>
                <div className='exam-timer'>
                    <img src={dongho}></img><h4>{minutes}:{seconds}</h4>
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
                            {questionDone.map((item, index) => (
                                item.isChoose ?
                                    <div className='exam-right-question-item' style={{ cursor: 'pointer' }} onClick={() => handleClickScroll(item.questionId)}>
                                        <p style={{ backgroundColor: 'green', color: 'white' }}>{index + 1}</p>
                                    </div>
                                    : <div className='exam-right-question-item' style={{ cursor: 'pointer' }} onClick={() => handleClickScroll(item.questionId)}>
                                        <p>{index + 1}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className='exam-right-button'>
                        <button className='btn btn-primary' onClick={handleSubmit}>Nộp bài</button>
                    </div>
                </div>
                <div className='exam-left'>
                    {questions.map((item, index) =>
                        <div className='exam-left-quesion' id={item.questionId}>
                            <div className='exam-left-quesion-top'>
                                <p style={{ fontWeight: 'bold', paddingLeft: 10, whiteSpace: 'nowrap' }}>Câu {index + 1}:</p>
                                <div className='exam-left-quesion-text'>
                                    <p>{item.questionContext}</p>
                                    {item.image != '' &&
                                        <img src={item.image}></img>
                                    }
                                </div>
                            </div>
                            <div className='exam-left-quesion-bottom'>
                                <div className='exam-left-quesion-answer'>
                                    <input onClick={handleQuestion} type='radio' value='1' name={item.questionId} id={item.optionA}></input>
                                    <div>
                                        <label for={item.optionA} className=''>A. {item.optionA}</label><br></br>
                                    </div>
                                </div><div className='exam-left-quesion-answer'>
                                    <input onClick={handleQuestion} type='radio' value='2' name={item.questionId} id={item.optionB}></input>
                                    <div>
                                        <label for={item.optionB} className=''>B. {item.optionB}</label><br></br>
                                    </div>
                                </div>
                                <div className='exam-left-quesion-answer'>
                                    <input onClick={handleQuestion} type='radio' value='3' name={item.questionId} id={item.optionC}></input>
                                    <div>
                                        <label for={item.optionC} className=''>C. {item.optionC}</label><br></br>
                                    </div>
                                </div>
                                <div className='exam-left-quesion-answer'>
                                    <input onClick={handleQuestion} type='radio' value='4' name={item.questionId} id={item.optionD}></input>
                                    <div>
                                        <label for={item.optionD} className=''>D. {item.optionD}</label><br></br>
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