import { Input, Avatar, Modal } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';

const url = '../Image/Forum/forum-avatar1.png';
const like = '../Image/Forum/like.png';
const liked = '../Image/Forum/liked.png';
const comment = '../Image/Forum/comment.png';
const upload = '../Image/Forum/upload.png';
const send = '../Image/Forum/send.png';
const { TextArea } = Input;
export default function SendComment() {
    return (
        <>
            <div className="form-bottom">
                <div className="form-comment">
                    <div className="form-comment-left">
                        <Avatar src={<img src={url} alt="avatar" />} />
                    </div>
                    <div className="form-comment-midle">
                        <TextArea placeholder="Viết bình luận..." autoSize></TextArea>
                    </div>
                    <div className="form-comment-right">
                        <img src={upload}></img>
                        <img src={send}></img>
                    </div>
                </div>
            </div>
        </>
    );
}
