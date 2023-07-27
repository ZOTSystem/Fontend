import { Input, Avatar, Modal, notification } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

import { useContext, useState } from 'react';
import { CommentContext } from '../../../contexts/CommentContext';
import CommentList from '../CommentList';
import PostDetails from './PostDetails';
import { PostContext } from '../../../contexts/PostContext';

const url = '../Image/Forum/forum-avatar1.png';
const like = '../Image/Forum/like.png';
const liked = '../Image/Forum/liked.png';
const comment = '../Image/Forum/comment.png';
const upload = '../Image/Forum/upload.png';
const send = '../Image/Forum/send.png';
const { TextArea } = Input;
export default function SendComment({ postId }) {
    const { comments, addComment, getCommentsByPost } = useContext(CommentContext);
    const [content, setContent] = useState('');

    const handleSendComment = () => {
        addComment({ postId, content });
        setContent('');
        openNotificationSendCommentSuccess('topRight');
        showModal(postId);
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
            <div className="form-bottom">
                <div className="form-comment">
                    <div className="form-comment-left">
                        <Avatar src={<img src={url} alt="avatar" />} />
                    </div>
                    <div className="form-comment-midle">
                        <TextArea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Viết bình luận..."
                            autoSize></TextArea>
                    </div>
                    <div className="form-comment-right">
                        <img src={upload} alt="upload"></img>
                        <img src={send} alt="send" onClick={handleSendComment}></img>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    title="Bình luận"
                    cancelText="Đóng"
                    okButtonProps={{ style: { display: 'none' } }}
                    open={isModalOpen}
                    onCancel={cancelModal}
                    className="comment-modal">
                    <CommentList comments={comments} />
                </Modal>
            )}
        </>
    );
}
