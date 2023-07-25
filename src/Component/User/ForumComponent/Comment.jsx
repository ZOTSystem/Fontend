import { Avatar } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
const url = '../Image/Forum/forum-avatar1.png';
const baitoan = '../Image/Forum/baitoan.png';

export default function Comment({ comment }) {
    const { fullName, content } = comment;

    return (
        <div className="comment-wrapper">
            <div className="comment-left">
                <Avatar src={<img src={url} alt="avatar" />} />
            </div>
            <div className="comment-right">
                <div className="comment-content">
                    <div>{fullName} • 15 giờ trước</div>
                    <div>
                        <p>{content}</p>
                    </div>
                </div>
                {/* <img src={baitoan}></img> */}
                <div className="comment-action">
                    <button className="comment-action-btn">Chỉnh sửa</button>
                    <button className="comment-action-btn">Xóa</button>
                </div>
            </div>
        </div>
    );
}
