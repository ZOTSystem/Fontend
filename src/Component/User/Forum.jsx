import 'bootstrap/dist/css/bootstrap.css';
import Header from "../../Layout/User/Header";
import React, { useState } from 'react';
import "../../assets/Forum.css"
import '../../assets/Style.css'
import CreatePost from './ForumComponent/CreatePost';
import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import Comment from './ForumComponent/Comment';
export default function Forum() {

    return (
        <>
            <Header />
            <div className="body-forum">
                <div className="container">
                    <CreatePost />
                    <div className='post-container'>
                        <div className="post">
                            <div className='form-post'>
                                <PostContent />
                                <SendComment />
                                <Comment />
                            </div>

                            <div className='form-post'>
                                <PostContent />
                                <SendComment />
                                <Comment />
                            </div>

                            <div className='form-post'>
                                <PostContent />
                                <SendComment />
                                <Comment />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}