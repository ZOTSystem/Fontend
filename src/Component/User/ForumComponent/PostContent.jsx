import { Avatar, Modal } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useContext, useEffect } from 'react';
import { CommentContext } from '../../../contexts/CommentContext';
import CommentList from '../CommentList';
import { PostContext } from '../../../contexts/PostContext';
import PostDetails from './PostDetails';

const url = '../Image/Forum/forum-avatar1.png';
const luu = '../Image/Forum/luu.png';
const daluu = '../Image/Forum/daluu.png';
const baitoan = '../Image/Forum/baitoan.png';
const like = '../Image/Forum/like.png';
const liked = '../Image/Forum/liked.png';
const comment = '../Image/Forum/comment.png';

export default function PostContent({ post }) {
    const { postId, fullName, createdTime, subjectName, postText, postFile } = post;
    const { currentPost, getPostById } = useContext(PostContext);
    const { comments, getCommentsByPost } = useContext(CommentContext);

    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (postId) => {
        setIsModalOpen(true);
        getPostById(postId);
        getCommentsByPost(postId);
    };

    const cancelModal = () => {
        setIsModalOpen(false);
    };

    const handleLikedClick = () => {
        setIsLiked(!isLiked);
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
                        {postFile && (
                            <img
                                src={postFile}
                                alt='post'
                            ></img>
                        )}
                    </div>
                </div>
            </div>
            <div className='form-like'>
                <img
                    onClick={handleLikedClick}
                    src={isLiked ? liked : like}
                />
                <p>155</p>
                <img
                    src={comment}
                    onClick={() => showModal(postId)}
                />
                <p>15</p>
            </div>

            {isModalOpen && (
                <Modal
                    title={`Bài viết của ${fullName}`}
                    cancelText='Đóng'
                    okButtonProps={{ style: { display: 'none' } }}
                    open={isModalOpen}
                    onCancel={cancelModal}
                    className='comment-modal'
                >
                    <PostDetails data={currentPost} />
                    <h6 className='comment-title'>Bình luận</h6>
                    <CommentList comments={comments} />
                </Modal>
            )}
        </>
    );
}
