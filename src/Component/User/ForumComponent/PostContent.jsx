import { Avatar } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';

const url = '../Image/Forum/forum-avatar1.png';
const luu = '../Image/Forum/luu.png';
const daluu = '../Image/Forum/daluu.png';
const baitoan = '../Image/Forum/baitoan.png';
export default function PostContent({ fullName, createdTime, subjectName, postText, postFile }) {
    const [save, setSave] = useState(false);
    const [saveUrl, setSaveUrl] = useState(luu);

    const savePost = () => {
        if (save == true) {
            setSave(false);
            setSaveUrl(luu);
        } else {
            setSave(true);
            setSaveUrl(daluu);
        }
    };

    return (
        <>
            <div className='form-info'>
                <div className='form-left'>
                    <Avatar
                        src={
                            <img
                                src={url}
                                alt='avatar'
                            />
                        }
                    />
                </div>
                <div className='form-mid'>
                    <div className='form-mid-top'>
                        <div>
                            {fullName} • {createdTime}
                        </div>
                        <div className='form-mid-top-subject'>
                            <p>{subjectName}</p>
                        </div>
                    </div>
                    <div className='form-mid-content'>
                        <div>
                            <p>{postText}</p>
                        </div>
                        {postFile && <img src={postFile}></img>}
                    </div>
                </div>
                <div className='form-right'>
                    <img
                        onClick={savePost}
                        src={saveUrl}
                    ></img>
                </div>
            </div>
        </>
    );
}
