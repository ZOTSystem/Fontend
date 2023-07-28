import { useSearchParams } from 'react-router-dom';
import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const PostList = ({ posts }) => {
    const [searchParams] = useSearchParams();
    const statusQueryParams = searchParams.get('status');
    const { user } = useContext(UserContext);

    return (
        <div className='post'>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div
                        key={post.postId}
                        className='form-post'
                    >
                        <PostContent post={post} />
                        {(!statusQueryParams || (statusQueryParams === 'Approved' && user.roleId !== 2)) && (
                            <>
                                <SendComment postId={post.postId} />
                            </>
                        )}
                    </div>
                ))
            ) : (
                <h3 className='post-empty'>Không tìm thấy bài viết nào !</h3>
            )}
        </div>
    );
};

export default PostList;
