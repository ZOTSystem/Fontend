import { useState } from 'react';
import Comment from './ForumComponent/Comment';

const CommentList = ({ comments }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.postCommentId);
    };

    const handleCancelEditMode = () => {
        setEditingCommentId(null);
    };

    const handleSaveComment = (comment, updatedContent) => {
        // Handle saving the updated content here (you can use the comment.postCommentId and updatedContent)
        // For example: Call an API to update the comment on the server
        console.log(comment.postCommentId, updatedContent);

        setEditingCommentId(null);
    };

    return (
        <div className="comment-list">
            {comments?.map((comment) => (
                <Comment
                    key={comment.postCommentId}
                    comment={comment}
                    isEditing={editingCommentId === comment.postCommentId}
                    onEditComment={handleEditComment}
                    onCancelEditMode={handleCancelEditMode}
                    onSaveComment={handleSaveComment}
                />
            ))}
        </div>
    );
};

export default CommentList;
