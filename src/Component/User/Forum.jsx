import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/Forum.css';
import '../../assets/Style.css';
import Header from '../../Layout/User/Header';
import CreatePost from './ForumComponent/CreatePost';
import PostList from './PostList';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import FilterPost from './ForumComponent/FilterPost';

export default function Forum() {
    const { posts } = useContext(PostContext);

    return (
        <>
            <Header />
            <div className='body-forum'>
                <div className='container'>
                    <CreatePost />
                    <FilterPost />
                    <div className='post-container'>
                        <PostList posts={posts} />
                    </div>
                </div>
            </div>
        </>
    );
}
