import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "../../assets/Study.css"
import '../../assets/Style.css'
const study1 = '../Image/Exam/icon-study.png';
const study2 = '../Image/Exam/learning.jpg';
const study3 = '../Image/Exam/anhdapan.jpg';

export default function Study() {


    const questions = [{
        questionID: 1,
        subjectID: 1,
        accountID: 1,
        answerID: 1,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Tương lai của Nhật Bản được quyết định như thế nào theo Hội nghị Ianta (2-1945)?',
        optionA: 'Nhật Bản bị quân đội Mĩ chiếm đóng.',
        optionB: 'Nhật Bản vẫn giữ nguyên trạng.',
        optionC: 'Quân đội Liên Xô chiếm 4 đảo thuộc quần đảo Curin của Nhật Bản.',
        optionD: 'Nhật Bản trở thành thuộc địa kiểu mới của Mĩ.',
        solution: 'Theo thỏa thuận của Hội nghị Ianta, quân đội Mĩ chiếm đóng Nhật Bản',
        status: 1,
        createDate: '20230601',
    }, {
        questionID: 2,
        subjectID: 1,
        accountID: 1,
        answerID: 3,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Theo quyết định của hội nghị Ianta (2-1945), quốc gia nào cần phải trở thành một quốc gia thống nhất và dân chủ?',
        optionA: 'Đức',
        optionB: 'Mông Cổ',
        optionC: 'Trung Quốc',
        optionD: 'Triều Tiên',
        solution: 'Theo nội dung của Hội nghị Ianta về phân chia phạm vi đóng quân và giải giáp quân đội phát xít của các cường quốc Đồng minh có quy định: Trung Quốc cần phải trở thành một quốc gia thống nhất và dân chủ',
        status: 1,
        createDate: '20230601',
    }, {
        questionID: 3,
        subjectID: 1,
        accountID: 1,
        answerID: 4,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Theo quy định của Hội nghị Ianta (2-1945), quốc gia nào sẽ thực hiện nhiệm vụ chiếm đóng, giải giáp miền Tây Đức, Tây Béc-lin và các nước Tây Âu?',
        optionA: 'Liên Xô',
        optionB: 'Mĩ',
        optionC: 'Mĩ, Anh',
        optionD: 'Mĩ, Anh, Pháp',
        solution: 'Theo nội dung của Hội nghị Ianta về phân chia phạm vi đóng quân và giải giáp quân đội phát xít của các cường quốc Đồng minh có quy định: quân đội Mĩ, Anh, Pháp chiếm đóng miền Tây Đức, Tây Béc-lin và các nước Tây Âu.',
        status: 1,
        createDate: '20230601',
    }, {
        questionID: 4,
        subjectID: 1,
        accountID: 1,
        answerID: 1,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Theo quy định của Hội nghị Ianta, quân đội nước nào sẽ chiếm đóng các vùng Đông Đức, Đông Âu, Đông Bắc Triều Tiên sau chiến tranh thế giới thứ hai?',
        optionA: 'Liên Xô.',
        optionB: 'Mỹ.',
        optionC: 'Anh.',
        optionD: 'Pháp.',
        solution: 'Theo quy định của Hội nghị Ianta, quân đội Liên Xô sẽ chiếm đóng các vùng Đông Đức, Đông Âu, Đông Bắc Triều Tiên sau chiến tranh thế giới thứ hai',
        status: 1,
        createDate: '20230601',
    }, {
        questionID: 5,
        subjectID: 1,
        accountID: 1,
        answerID: 3,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Theo nội dung của Hội nghị Pốtxđam, việc giải giáp quân Nhật ở Đông Dương được giao cho ai?',
        optionA: 'Quân đội Anh trên toàn Việt Nam.',
        optionB: 'Quân đội Pháp ở phía Nam vĩ tuyến 16.',
        optionC: 'Quân đội Anh ở phía Nam vĩ tuyến 16 và quân đội Trung Hoa Dân quốc vào phía Bắc.',
        optionD: 'Quân đội Trung Hoa Dân quốc vào phía Bắc vĩ tuyến 16 và quân đội Pháp ở phía Nam.',
        solution: 'Theo thỏa thuận của Hội nghị Pốtxđam (Đức, tổ chức từ ngày 17-7 đến ngày 2-8-1945), việc giải giáp quân Nhật ở Đông Dương được giao cho quân đội Anh ở phía Nam vĩ tuyến 16 và quân đội Trung Hoa Dân quốc vào phía Bắc.',
        status: 1,
        createDate: '20230601',
    }, {
        questionID: 6,
        subjectID: 1,
        accountID: 1,
        answerID: 3,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Các vùng Đông Nam Á, Nam Á, Tây Á thuộc phạm vi ảnh hưởng của quốc gia nào theo quy định của Hội nghị Ianta (2-1945)?',
        optionA: 'Liên Xô, Mĩ, Anh',
        optionB: 'Các nước phương Tây từng chiếm đóng ở đây.',
        optionC: 'Hoa Kỳ, Anh, Pháp.',
        optionD: 'Anh, Đức, Nhật Bản.',
        solution: 'Theo quy định của Hội nghị Ianta (2-1945), các vùng còn lại của châu Á (Đông Nam Á, Nam Á, Tây Á) vẫn thuộc phạm vi ảnh hưởng của các nước phương Tây từng chiếm đóng ở đây.',
        status: 1,
        createDate: '20230601',
    }, {
        questionID: 7,
        subjectID: 1,
        accountID: 1,
        answerID: 4,
        testTypeID: 1,
        levelID: 1,
        topicID: 1,
        image: '',
        questionContext: 'Theo Hội nghị Ianta, để nhanh chóng kết thúc nhanh chiến tranh, ba cường quốc đã thống nhất điều gì?',
        optionA: 'Mĩ sử dụng bom nguyên tử để tiêu diệt quân phiệt Nhật',
        optionB: 'Thành lập tổ chức Liên Hợp quốc',
        optionC: 'Hồng quân Liên Xô tấn công vào tận sào huyệt của phát xít Đức ở Bec-lin.',
        optionD: 'Sau khi đánh bại phát xít Đức, Liên Xô sẽ tham chiến chống Nhật ở châu Á.',
        solution: 'Để nhanh chóng kết thúc chiến tranh trong thời gian từ 2 đến 3 tháng sau khi đánh bại phát xít Đức, Liên Xô sẽ tham chiến chống Nhật ở châu Á.',
        status: 1,
        createDate: '20230601',
    }]

    const answers = [{
        questionID: 1,
        answerName: "A",
    }, {
        questionID: 2,
        answerName: "B",
    }, {
        questionID: 3,
        answerName: "C",
    }, {
        questionID: 4,
        answerName: "D",
    }]

    const [current, setCurrent] = useState(0);
    const length = questions.length;

    function nextQuestion() {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setResetQuestion(true)
        setDisableChoose(false)
        setSolution(false)
        setRight1Answer()
        setRight2Answer()
        setRight3Answer()
        setRight4Answer()
        setWrong1Answer()
        setWrong2Answer()
        setWrong3Answer()
        setWrong4Answer()
    }

    function prevQuestion() {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setResetQuestion(true)
        setDisableChoose(false)
        setSolution(false)
        setRight1Answer()
        setRight2Answer()
        setRight3Answer()
        setRight4Answer()
        setWrong1Answer()
        setWrong2Answer()
        setWrong3Answer()
        setWrong4Answer()
    }

    const questionChoose = [{
        quesionID: '',
        accountID: '',
        answerID: '',
    }]

    const [disableChoose, setDisableChoose] = useState();
    const [resetQuestion, setResetQuestion] = useState(true);
    const [solution, setSolution] = useState();
    const [right1Answer, setRight1Answer] = useState();
    const [right2Answer, setRight2Answer] = useState();
    const [right3Answer, setRight3Answer] = useState();
    const [right4Answer, setRight4Answer] = useState();
    const [wrong1Answer, setWrong1Answer] = useState();
    const [wrong2Answer, setWrong2Answer] = useState();
    const [wrong3Answer, setWrong3Answer] = useState();
    const [wrong4Answer, setWrong4Answer] = useState();


    function chooseAnswer(choose, answer) {
        setDisableChoose(true)
        setResetQuestion(false)
        setSolution(true)
        if (choose == answer && choose == 1) {
            setRight1Answer(answer)
        } else if (choose == answer && choose == 2) {
            setRight2Answer(answer)
        } else if (choose == answer && choose == 3) {
            setRight3Answer(answer)
        } else if (choose == answer && choose == 4) {
            setRight4Answer(answer)
        }

        if (choose != answer && choose == 1) {
            if (answer == 2) {
                setRight2Answer(answer)
            } else if (answer == 3) {
                setRight3Answer(answer)
            } else if (answer == 4) {
                setRight4Answer(answer)
            }
            setWrong1Answer(choose)
        } else if (choose != answer && choose == 2) {
            if (answer == 1) {
                setRight1Answer(answer)
            } else if (answer == 3) {
                setRight3Answer(answer)
            } else if (answer == 4) {
                setRight4Answer(answer)
            }
            setWrong2Answer(choose)
        } else if (choose != answer && choose == 3) {
            if (answer == 2) {
                setRight2Answer(answer)
            } else if (answer == 1) {
                setRight1Answer(answer)
            } else if (answer == 4) {
                setRight4Answer(answer)
            }
            setWrong3Answer(choose)
        } else if (choose != answer && choose == 4) {
            if (answer == 2) {
                setRight2Answer(answer)
            } else if (answer == 3) {
                setRight3Answer(answer)
            } else if (answer == 1) {
                setRight1Answer(answer)
            }
            setWrong4Answer(choose)
        }
    }

    const location = useLocation();
    let subjectID = location.state.subjectID;

    console.log("subjectID: " + subjectID)
    return (
        <>
            <Header />
            <div className='study'>
                <div className='study-left'>
                    {questions.map((item, index) => (
                        index === current && (
                            <>
                                <div className='study-left-question'>
                                    <div style={{ display: 'flex' }}>
                                        <div className='study-left-question-img'>
                                            <img src={study1}></img>
                                            <p style={{ fontWeight: 'bold' }}>Câu {index + 1}:</p>
                                        </div>
                                        <p>{item.questionContext}</p>
                                    </div>
                                    <img src={item.image}></img>
                                </div>
                                <div className='study-left-answer' onClick={!disableChoose ? () => chooseAnswer(1, item.answerID) : null} style={{ border: resetQuestion && !disableChoose ? '3px solid white' : right1Answer == item.answerID ? '3px solid #00CC33' : wrong1Answer == 1 ? '3px solid red' : '3px solid white' }}>
                                    <div className='study-left-answer-left' style={{ backgroundColor: resetQuestion && !disableChoose ? '' : right1Answer == item.answerID ? '#00cc33' : wrong1Answer == 1 ? '#ff0000' : '' }}>
                                        <p>A</p>
                                    </div>
                                    <div className='study-left-answer-right'>
                                        <p style={{ marginBottom: 0, marginTop: 7 }}>{item.optionA}</p>
                                    </div>
                                </div>
                                <div className='study-left-answer' onClick={!disableChoose ? () => chooseAnswer(2, item.answerID) : null} style={{ border: resetQuestion && !disableChoose ? '3px solid white' : right2Answer == item.answerID ? '3px solid #00CC33' : wrong2Answer == 2 ? '3px solid red' : '3px solid white' }}>
                                    <div className='study-left-answer-left' style={{ backgroundColor: resetQuestion && !disableChoose ? '' : right2Answer == item.answerID ? '#00cc33' : wrong2Answer == 2 ? '#ff0000' : '' }}>
                                        <p>B</p>
                                    </div>
                                    <div className='study-left-answer-right'>
                                        <p style={{ marginBottom: 0, marginTop: 7 }}>{item.optionB}</p>
                                    </div>
                                </div>
                                <div className='study-left-answer' onClick={!disableChoose ? () => chooseAnswer(3, item.answerID) : null} style={{ border: resetQuestion && !disableChoose ? '3px solid white' : right3Answer == item.answerID ? '3px solid #00CC33' : wrong3Answer == 3 ? '3px solid red' : '3px solid white' }}>
                                    <div className='study-left-answer-left' style={{ backgroundColor: resetQuestion && !disableChoose ? '' : right3Answer == item.answerID ? '#00cc33' : wrong3Answer == 3 ? '#ff0000' : '' }}>
                                        <p>C</p>
                                    </div>
                                    <div className='study-left-answer-right'>
                                        <p style={{ marginBottom: 0, marginTop: 7 }}>{item.optionC}</p>
                                    </div>
                                </div>
                                <div className='study-left-answer' onClick={!disableChoose ? () => chooseAnswer(4, item.answerID) : null} style={{ border: resetQuestion && !disableChoose ? '3px solid white' : right4Answer == 4 ? '3px solid #00CC33' : wrong4Answer == 4 ? '3px solid red' : '3px solid white' }}>
                                    <div className='study-left-answer-left' style={{ backgroundColor: resetQuestion && !disableChoose ? '' : right4Answer == item.answerID ? '#00cc33' : wrong4Answer == 4 ? '#ff0000' : '' }}>
                                        <p>D</p>
                                    </div>
                                    <div className='study-left-answer-right'>
                                        <p style={{ marginBottom: 0, marginTop: 7 }}>{item.optionD}</p>
                                    </div>
                                </div>
                                { solution &&
                                    <div className='study-left-solution'>
                                        <h4 style={{ color: 'green', marginLeft: 30, marginTop: 15 }}>Đáp án</h4>
                                        <div className='study-left-solution-answer'>B: {item.answerID}</div>
                                        <h4 style={{ color: 'green', marginLeft: 30, marginTop: 15 }}>Lời giải</h4>
                                        <div className='study-left-solution-detail'>
                                            {item.solution}
                                        </div>
                                    </div>
                                }
                                <div className='study-left-button'>
                                    <div className='study-left-button-back' onClick={prevQuestion}>
                                        Câu trước
                                    </div>
                                    <div className='study-left-button-next' onClick={nextQuestion}>
                                        Câu tiếp theo
                                    </div>
                                </div>
                            </>
                        )))}
                </div>
                <div className='study-right'>
                    <img src={study2}></img>
                    <div className='study-right-button'>
                        <div className='study-right-button-right'>
                            <p>Số câu đúng</p>
                            <div className='study-right-button-icon'>
                                <span>20</span>
                            </div>
                        </div>
                        <div className='study-right-button-wrong'>
                            <p>Số câu sai</p>
                            <div className='study-right-button-icon'>
                                <span>20</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}