import {
    Avatar,
} from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';

const url = '../Image/Forum/forum-avatar1.png';
const luu = '../Image/Forum/luu.png';
const daluu = '../Image/Forum/daluu.png';
const baitoan = '../Image/Forum/baitoan.png';
export default function PostContent() {

    const [save, setSave] = useState(false)
    const [saveUrl, setSaveUrl] = useState(luu)

    const savePost = () => {
        if (save == true) {
            setSave(false)
            setSaveUrl(luu)
        }
        else {
            setSave(true)
            setSaveUrl(daluu)
        }
    }

    return (
        <>
            <div className='form-info'>
                <div className='form-left'>
                    <Avatar src={<img src={url} alt="avatar" />} />
                </div>
                <div className='form-mid'>
                    <div className='form-mid-top'>
                        <div>Chuong Tran • 15 giờ trước</div>
                        <div className='form-mid-top-subject'><p>Toán</p></div>
                        <div className='form-mid-top-type'><p>Bài tập</p></div>
                    </div>
                    <div className='form-mid-content'>
                        <div>
                            <p>
                                Cho hàm số y=f(x) xác định trên R và có đạo hàm f '(x) thỏa mãn f '(x)=(1-x)(x+2).g(x)+2018
                                trong đó g(x) nhỏ hơn 0 mọi x thuộc R hàm số y=f(1-x)+2018x+2019 nghịch biến trên khoảng nào?
                            </p>
                        </div>
                        <img src={baitoan}></img>
                    </div>
                </div>
                <div className='form-right'>
                    <img onClick={savePost} src={saveUrl}></img>
                </div>
            </div>
        </>
    )
}