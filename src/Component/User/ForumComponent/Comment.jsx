import { useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { getPointerContentEditable, setEndOfContentEditable } from '../../../utils/focusEditable';
const url = '../Image/Forum/forum-avatar1.png';
const baitoan = '../Image/Forum/baitoan.png';

export default function Comment({ comment, isEditing, onEditComment, onCancelEditMode, onSaveComment }) {
    const { fullName, content } = comment;
    const contentRef = useRef();
    const caretPos = useRef();
    const [textContent, setTextContent] = useState(content);

    const handleEditComment = () => {
        onSaveComment(comment, contentRef.current.textContent);
        contentRef.current.focus();
    };

    useEffect(() => {
        if (isEditing) {
            setEndOfContentEditable(contentRef.current);
        }
    }, [textContent, isEditing]);

    return (
        <div className="comment-wrapper">
            <div className="comment-left">
                <Avatar src={<img src={url} alt="avatar" />} />
            </div>
            <div className="comment-right">
                <div className="comment-content">
                    <div>{fullName} • 15 giờ trước</div>

                    <p
                        ref={contentRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onInput={(e) => {
                            caretPos.current = getPointerContentEditable(contentRef.current);
                            setTextContent(e.target.textContent);
                        }}>
                        {content}
                    </p>
                </div>
                {!isEditing ? (
                    <div className="comment-action">
                        <button className="comment-action-btn" onClick={() => onEditComment(comment)}>
                            Chỉnh sửa
                        </button>
                        <button className="comment-action-btn">Xóa</button>
                    </div>
                ) : (
                    <div className="comment-action">
                        <button className="comment-action-btn" onClick={handleEditComment}>
                            Lưu
                        </button>
                        <button className="comment-action-btn" onClick={onCancelEditMode}>
                            Hủy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
