import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import Comment from './ForumComponent/Comment';

const PostList = ({ posts }) => {
    return (
        <div className='post'>
            {posts.map((post) => {
                const { postId, subjectId, accountId, postText, postFile, status, createDate } = post;
                return (
                    <div
                        key={postId}
                        className='form-post'
                    >
                        <PostContent
                            subjectId={subjectId}
                            accountId={accountId}
                            postText={postText}
                            postFile={postFile}
                            status={status}
                            createDate={createDate}
                        />
                        <SendComment postId={postId} />
                        {/* <Comment /> */}
                    </div>
                );
            })}
        </div>
    );
};

export default PostList;
