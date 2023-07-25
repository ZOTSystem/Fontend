import { useSearchParams } from 'react-router-dom';
import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import Comment from './ForumComponent/Comment';

const PostList = ({ posts }) => {
    const [searchParams] = useSearchParams();
    const statusQueryParams = searchParams.get('status');

    return (
        <div className="post">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.postId} className="form-post">
                        <PostContent post={post} />
                        {(!statusQueryParams || statusQueryParams === 'Approved') && (
                            <>
                                <SendComment postId={post.postId} />
                                {/* <Comment /> */}
                            </>
                        )}
                    </div>
                ))
            ) : (
                <h3 className="post-empty">Không tìm thấy bài viết nào !</h3>
            )}
        </div>
    );
};

export default PostList;
