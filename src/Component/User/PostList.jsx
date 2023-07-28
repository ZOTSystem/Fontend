import { useNavigate, useSearchParams } from 'react-router-dom';
import PostContent from './ForumComponent/PostContent';
import SendComment from './ForumComponent/SendComment';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Button, notification } from 'antd';
import { PostContext } from '../../contexts/PostContext';

const PostList = ({ posts }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const statusQueryParams = searchParams.get('status');
    const { user } = useContext(UserContext);
    const { changePostStatus } = useContext(PostContext);

    //Display notification
    const [api, contextHolder] = notification.useNotification();
    const openNotificationApprovedPost = (placement) => {
        api.success({
            message: 'Thông báo',
            description: 'Bài viết đã được phê duyệt !',
            placement,
        });
    };

    const openNotificationRejectedPost = (placement) => {
        api.error({
            message: 'Thông báo',
            description: 'Bài viết đã bị từ chối !',
            placement,
        });
    };

    const handleApprovedPost = async (post) => {
        await changePostStatus(post.postId, 'Approved');
        navigate('/admin/manageForum?status=Approved');
        openNotificationApprovedPost('topRight');
    };

    const handleRejectedPost = async (post) => {
        await changePostStatus(post.postId, 'Rejected');
        navigate('/admin/manageForum?status=Rejected');
        openNotificationRejectedPost('topRight');
    };

    return (
        <div className='post'>
            {contextHolder}
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
                        {statusQueryParams === 'Pending' && user.roleId == 2 && (
                            <div className='admin-action-btn'>
                                <Button
                                    className='approve'
                                    type='primary'
                                    onClick={() => handleApprovedPost(post)}
                                >
                                    Đồng ý
                                </Button>
                                <Button
                                    className='reject'
                                    type='primary'
                                    danger
                                    onClick={() => handleRejectedPost(post)}
                                >
                                    Từ chối
                                </Button>
                            </div>
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
