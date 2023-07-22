import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/Forum.css';
import '../../assets/Style.css';
import Header from '../../Layout/User/Header';
import CreatePost from './ForumComponent/CreatePost';
import PostList from './PostList';
import { useContext, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';
import FilterPost from './ForumComponent/FilterPost';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import PostStatusTab from './ForumComponent/PostStatusTab';

export default function Forum() {
    const { posts } = useContext(PostContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const statusList = [
        {
            id: 1,
            name: 'Approved',
            title: 'Bài viết của tôi',
        },
        {
            id: 2,
            name: 'Pending',
            title: 'Chờ phê duyệt',
        },
        {
            id: 3,
            name: 'Rejected',
            title: 'Bị từ chối',
        },
    ];

    useEffect(() => {
        user?.roleId == '4' && navigate('?status=Approved');
    }, [user.roleId]);

    return (
        <>
            <Header />
            <div className='body-forum'>
                <div className='container'>
                    <CreatePost />
                    <div className='post-filter-container'>
                        {user && <PostStatusTab statusList={statusList} />}
                        <FilterPost />
                    </div>
                    <div className='post-container'>
                        <PostList posts={posts} />
                    </div>
                </div>
            </div>
        </>
    );
}
