import { Input, Avatar, Modal, notification } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

import { useContext, useState } from 'react';
import { CommentContext } from '../../../contexts/CommentContext';
import CommentList from '../CommentList';
import { PostContext } from '../../../contexts/PostContext';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

const defaultAvatar = '../Image/Avatar_null.png';
const upload = '../Image/Forum/upload.png';
const send = '../Image/Forum/send.png';
const { TextArea } = Input;
export default function SendComment({ post }) {
    const { comments, addComment, getCommentsByPost } = useContext(CommentContext);
    const { getAllPost, getPostByStatus } = useContext(PostContext);
    const { user } = useContext(UserContext);
    const [content, setContent] = useState('');
    const [searchParams] = useSearchParams();
    const statusQueryParams = searchParams.get('status');

    const handleSendComment = () => {
        addComment({ postId: post.postId, content });
        setContent('');
        openNotificationSendCommentSuccess('topRight');
        showModal(post.postId);
        if (statusQueryParams) {
            getPostByStatus(statusQueryParams, user.accountId);
        } else {
            getAllPost();
        }
    };

    //Display notification
    const [api, contextHolder] = notification.useNotification();
    const openNotificationSendCommentSuccess = (placement) => {
        api.success({
            message: 'Thông báo',
            description: 'Bình luận đã được gửi !',
            placement,
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (postId) => {
        setIsModalOpen(true);
        getCommentsByPost(postId);
    };

    const cancelModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}
            <div className='form-bottom'>
                <div className='form-comment'>
                    <div className='form-comment-left'>
                        <Avatar
                            src={
                                <img
                                    src={!post?.avatar ? defaultAvatar : post.avatar}
                                    alt='avatar'
                                    className='avatar'
                                />
                            }
                        />
                    </div>
                    <div className='form-comment-midle'>
                        <TextArea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Viết bình luận...'
                            autoSize
                        ></TextArea>
                    </div>
                    <div className='form-comment-right'>
                        <img
                            src={upload}
                            alt='upload'
                        ></img>
                        <img
                            src={send}
                            alt='send'
                            onClick={handleSendComment}
                        ></img>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    title='Bình luận'
                    cancelText='Đóng'
                    okButtonProps={{ style: { display: 'none' } }}
                    open={isModalOpen}
                    onCancel={cancelModal}
                    className='comment-modal'
                >
                    <CommentList comments={comments} />
                </Modal>
            )}
        </>
    );
}
