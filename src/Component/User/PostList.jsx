import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import Comment from './ForumComponent/Comment';
import { useSearchParams } from 'react-router-dom';

const PostList = ({ posts }) => {
    const [searchParams] = useSearchParams();
    const statusQueryParams = searchParams.get('status');

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
                            {(!statusQueryParams || statusQueryParams === 'Approved') && (
                                <>
                                    <SendComment postId={postId} />
                                    {/* <Comment /> */}
                                </>
                            )}
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
