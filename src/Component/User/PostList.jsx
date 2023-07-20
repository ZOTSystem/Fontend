import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import Comment from './ForumComponent/Comment';

const PostList = ({ posts }) => {
    return (
        <div className='post'>
            {posts?.map((post) => {
                const { postId, subjectName, fullName, postText, postFile, status, createDate } = post;
                return (
                    <div
                        key={postId}
                        className='form-post'
                    >
                        <PostContent
                            subjectName={subjectName}
                            fullName={fullName}
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
