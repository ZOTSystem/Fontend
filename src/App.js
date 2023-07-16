import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//#Region Auth Routes
import Login from './Component/Auth/Login';

//#Region User Routes
import HomePage from './Component/User/HomePage';
import PracticeQuizzes from './Component/User/PracticeQuizzes';
import TestSubject from './Component/User/TestSubject';
import Profile from './Component/User/Profile';
import TestHistory from './Component/User/TestHistory';
import News from './Component/User/News';
import Forum from './Component/User/Forum';
import TakeExam from './Component/User/TakeExam';
import Exam from './Component/User/Exam';
import ExamResult from './Component/User/ExamResult';
import Study from './Component/User/Study';
import ExamFinish from './Component/User/ExamFinish';


//#Region Admin Routes
import ManageUser from './Component/Admin/ManageUser'
import ManageMod from './Component/Admin/ManageMod';
import ManageQuestion from './Component/Admin/ManageQuestion';
import ManageTopic from './Component/Admin/ManageTopic';
import PostProvider from './contexts/PostContext';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* Router của người dùng */}
          <Route path="/practiceQuizz" element={<PracticeQuizzes />}></Route>
          <Route path="/testSubject" element={<TestSubject />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path='/testHistory' element={<TestHistory />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path="/forum" element={<PostProvider><Forum /></PostProvider>}></Route>
          <Route path="/takeExam" element={<TakeExam />}></Route>
          <Route path="/exam" element={<Exam />}></Route>
          <Route path="/examResult" element={<ExamResult />}></Route>
          <Route path="/study" element={<Study />}></Route>
          <Route path="/examFinish" element={<ExamFinish />}></Route>


          {/* Router của quản trị */}
          <Route path="/admin/manageUser" element={<ManageUser />}></Route>
          <Route path="/admin/manageMod" element={<ManageMod />}></Route>
          <Route path="/admin/manageQuestion" element={<ManageQuestion />}></Route>
          <Route path="/admin/manageTopic" element={<ManageTopic />}></Route>

        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
