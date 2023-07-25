import Comment from './ForumComponent/Comment';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments?.map((comment) => (
                <Comment key={comment.postCommentId} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
