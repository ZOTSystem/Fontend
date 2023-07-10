import {
    Avatar,
} from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
const url = '../Image/Forum/forum-avatar1.png';
const baitoan = '../Image/Forum/baitoan.png';
export default function Comment() {

    return (
        <>
            <div className='comment'>
                <div className='comment-left'>
                    <Avatar src={<img src={url} alt="avatar" />} />
                </div>
                <div className='comment-right'>
                    <div>Chuong Tran • 15 giờ trước</div>
                    <div>
                        <p>
                            Tham khảo cách này nka
                        </p>
                    </div>
                    <img src={baitoan}></img>
                </div>
            </div>
            <div className='comment-action'>
                <div className='comment-action-edit-delete'>
                    <p>Edit</p>
                    <p>Delete</p>
                </div>
            </div>

        </>
    )
}