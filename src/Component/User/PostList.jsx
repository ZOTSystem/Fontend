import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import Comment from './ForumComponent/Comment';

const PostList = ({ posts }) => {
    return (
        <div className='post'>
            {posts.length > 0 ? (
                posts.map((post) => {
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
                })
            ) : (
                <h3 className='post-empty'>Không tìm thấy bài viết nào !</h3>
            )}
        </div>
    );
};

export default PostList;
