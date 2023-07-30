import { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Modal, notification } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { getPointerContentEditable, setEndOfContentEditable } from '../../../utils/focusEditable';
import { UserContext } from '../../../contexts/UserContext';
import { CommentContext } from '../../../contexts/CommentContext';

const defaultAvatar = '../Image/Avatar_null.png';

export default function Comment({ comment, isEditing, onEditComment, onCancelEditMode, onSaveComment }) {
    const { fullName, avatar, content } = comment;
    const contentRef = useRef();
    const caretPos = useRef();
    const [textContent, setTextContent] = useState(content);
    const [open, setOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const { user } = useContext(UserContext);
    const { getCommentsByPost, deleteComment } = useContext(CommentContext);

    const showModal = (comment) => {
        setOpen(true);
        setSelectedComment(comment);
    };

    const cancelModal = () => {
        setOpen(false);
    };

    //Display notification
    const [api, contextHolder] = notification.useNotification();
    const openNotificationDeletedComment = (placement) => {
        api.success({
            message: 'Thông báo',
            description: 'Bình luận đã được xóa !',
            placement,
        });
    };

    const handleEditComment = () => {
        onSaveComment(comment, contentRef.current.textContent);
        contentRef.current.focus();
    };

    const handleDeleteComment = async (comment) => {
        await deleteComment(comment.postCommentId);
        await getCommentsByPost(comment.postId);
        cancelModal();
        openNotificationDeletedComment('topRight');
    };

    useEffect(() => {
        if (isEditing) {
            setEndOfContentEditable(contentRef.current);
        }
    }, [textContent, isEditing]);

    return (
        <div className='comment-wrapper'>
            {contextHolder}
            <div className='comment-left'>
                <Avatar
                    src={
                        <img
                            src={!avatar ? defaultAvatar : avatar}
                            alt='avatar'
                        />
                    }
                />
            </div>
            <div className='comment-right'>
                <div className='comment-content'>
                    <span>{fullName}</span>

                    <p
                        ref={contentRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onInput={(e) => {
                            caretPos.current = getPointerContentEditable(contentRef.current);
                            setTextContent(e.target.textContent);
                        }}
                    >
                        {content}
                    </p>
                </div>
                {!isEditing && comment.accountId === user.accountId && (
                    <div className='comment-action'>
                        <button
                            className='comment-action-btn'
                            onClick={() => onEditComment(comment)}
                        >
                            Chỉnh sửa
                        </button>
                        <button
                            className='comment-action-btn'
                            onClick={() => showModal(comment)}
                        >
                            Xóa
                        </button>
                    </div>
                )}
                {isEditing && (
                    <div className='comment-action'>
                        <button
                            className='comment-action-btn'
                            onClick={handleEditComment}
                        >
                            Lưu
                        </button>
                        <button
                            className='comment-action-btn'
                            onClick={onCancelEditMode}
                        >
                            Hủy
                        </button>
                    </div>
                )}
                <Modal
                    title='Xác nhận'
                    open={open}
                    okText='Đồng ý'
                    cancelText='Hủy bỏ'
                    onOk={() => {
                        handleDeleteComment(selectedComment);
                    }}
                    onCancel={cancelModal}
                    className='confirm-delete-modal'
                >
                    <h3>Bạn có đồng ý xóa bình luận này?</h3>
                </Modal>
            </div>
        </div>
    );
}
