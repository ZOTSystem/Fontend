import { Avatar, Modal } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useContext } from 'react';
import { CommentContext } from '../../../contexts/CommentContext';
import CommentList from '../CommentList';
import { PostContext } from '../../../contexts/PostContext';
import PostDetails from './PostDetails';
import { UserContext } from '../../../contexts/UserContext';
import { useSearchParams } from 'react-router-dom';

const defaultAvatar = '../Image/Avatar_null.png';
const like = '../Image/Forum/like.png';
const liked = '../Image/Forum/liked.png';
const comment = '../Image/Forum/comment.png';

export default function PostContent({ post }) {
    const { postId, avatar, fullName, createdTime, subjectName, postText, postFile, countComment, countLike } = post;
    const { getAllPost, currentPost, getPostById, getPostByStatus, likePost } = useContext(PostContext);
    const { comments, getCommentsByPost } = useContext(CommentContext);
    const { user } = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const statusQueryParams = searchParams.get('status');

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
        likePost(postId, user.accountId);
        if (statusQueryParams) {
            getPostByStatus(statusQueryParams, user.accountId);
        } else {
            getAllPost();
        }
        setIsLiked(!isLiked);
    };

    return (
        <>
            <div className='form-info'>
                <div className='form-left'>
                    <Avatar
                        src={
                            <img
                                src={!avatar ? defaultAvatar : avatar}
                                alt='avatar'
                                className='avatar'
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
                    alt='heart'
                />
                <p>{countLike}</p>
                <img
                    src={comment}
                    onClick={() => showModal(postId)}
                    alt='comment'
                />
                <p>{countComment}</p>
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
