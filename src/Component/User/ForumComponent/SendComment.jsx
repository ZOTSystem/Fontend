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
export default function SendComment({ postId }) {
    const [likeClick, setLike] = useState(false);
    const [likeUrl, setLikeUrl] = useState(like);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const likePost = () => {
        if (likeClick == true) {
            setLike(false);
            setLikeUrl(like);
        } else {
            setLike(true);
            setLikeUrl(liked);
        }
    };

    return (
        <>
            <div className='form-bottom'>
                <div className='form-like'>
                    <img
                        onClick={likePost}
                        src={likeUrl}
                    ></img>
                    <p>155</p>
                    <img
                        src={comment}
                        onClick={showModal}
                    ></img>
                    <p>15</p>
                </div>
                <div className='form-comment'>
                    <div className='form-comment-left'>
                        <Avatar
                            src={
                                <img
                                    src={url}
                                    alt='avatar'
                                />
                            }
                        />
                    </div>
                    <div className='form-comment-midle'>
                        <TextArea
                            placeholder='Viết bình luận...'
                            autoSize
                        ></TextArea>
                    </div>
                    <div className='form-comment-right'>
                        <img src={upload}></img>
                        <img src={send}></img>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    title='Bình luận'
                    cancelText='Đóng'
                    okButtonProps={{ style: { display: 'none' } }}
                    open={isModalOpen}
                    onCancel={handleCancel}
                >
                    <p>Đây là bình luận của bài viết {postId}</p>
                </Modal>
            )}
        </>
    );
}
