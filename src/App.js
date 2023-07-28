import './App.css';
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';

//#Region Auth Routes
import Login from './Component/Auth/Login';
import ConfirmEmail from './Component/Auth/ConfirmEmail';

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
import TopicStudy from './Component/User/TopicStudy';

//#Region Admin Routes
import ManageUser from './Component/Admin/ManageUser'
import ManageMod from './Component/Admin/ManageMod';
import ManageQuestion from './Component/Admin/ManageQuestion';
import ManageTopic from './Component/Admin/ManageTopic';

import Testfirebase from './Testfirebase';
import PostProvider from './contexts/PostContext';
import SubjectProvider from './contexts/SubjectContext';

//#region Mod Routers
import ManageNewsByMod from './Component/Mod/ManageNewsByMod';

function App() {
  const { token, user } = useContext(UserContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          {!token ?
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/forum" element={<PostProvider><SubjectProvider><Forum /></SubjectProvider></PostProvider>}></Route>
              <Route path="/news" element={<News />}></Route>
              <Route path="confirm/:email" element={<ConfirmEmail />} />
              <Route path="/practiceQuizz" element={<PracticeQuizzes />}></Route>
              <Route path="/testSubject" element={<TestSubject />}></Route>
              <Route path="/test" element={<Testfirebase />}></Route>

              <Route path="/*" element={<Navigate to="/login" />} />
            </> :
            <>
              {
                user.roleId == '4' ?
                  <>
                    <Route path="/testSubject" element={<TestSubject />}></Route>
                    <Route path="/test" element={<Testfirebase />}></Route>
                    <Route path="/practiceQuizz" element={<PracticeQuizzes />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path='/testHistory' element={<TestHistory />}></Route>
                    <Route path="/takeExam" element={<TakeExam />}></Route>
                    <Route path="/exam" element={<Exam />}></Route>
                    <Route path="/forum" element={<PostProvider><SubjectProvider><Forum /></SubjectProvider></PostProvider>}></Route>
                    <Route path="/examResult" element={<ExamResult />}></Route>
                    <Route path="/study" element={<Study />}></Route>
                    <Route path="/examFinish" element={<ExamFinish />}></Route>
                    <Route path="topicStudy" element={<TopicStudy />}></Route>

                    <Route path="/*" element={<Navigate to="/" />} />
                  </> :
                  <>
                    {
                      user.roleId == '2' ?
                        <>
                          <Route path="/admin/manageUser" element={<ManageUser />} />
                          <Route path="/admin/manageMod" element={<ManageMod />} />
                          <Route path="/admin/manageQuestion" element={<ManageQuestion />} />
                          <Route path="/admin/manageTopic" element={<ManageTopic />} />
                          {/* <Route path="/mod/manageNews" element={<ManageNewsByMod />} /> */}

                          <Route path="/*" element={<Navigate to="/admin/manageUser" />} />
                        </> :
                        user.roleId == '3' ?
                          <>
                            <Route path="/admin/manageQuestion" element={<ManageQuestion />} />
                            <Route path="/admin/manageTopic" element={<ManageTopic />} />
                            <Route path="/mod/manageNews" element={<ManageNewsByMod />} />

                            <Route path="/*" element={<Navigate to="/admin/manageQuestion" />} />
                          </> :
                          <>
                            <Route path="/admin/manageUser" element={<ManageUser />} />
                            <Route path="/admin/manageMod" element={<ManageMod />} />
                            <Route path="/admin/manageQuestion" element={<ManageQuestion />} />
                            <Route path="/admin/manageTopic" element={<ManageTopic />} />
                            <Route path="/mod/manageNews" element={<ManageNewsByMod />} />


                            <Route path="/*" element={<Navigate to="/admin/manageUser" />} />
                          </>
                    }
                  </>
              }
            </>
          }
        </Routes>
      </BrowserRouter>
    </Fragment >
  );
}

export default App;
