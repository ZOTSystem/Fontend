import { createContext, useEffect, useReducer } from 'react';
import { getAllPostService, addPostService, getPostBySubjectService } from '../services/postService';
import postReducer from '../reducers/postReducer';

const initialState = {
    posts: [],
    handleAddPost: () => {},
};

export const PostContext = createContext(null);

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    const getAllPost = async () => {
        try {
            const response = await getAllPostService();
            dispatch({
                type: 'GET_POSTS',
                payload: response,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllPost();
    }, []);

    const handleAddPost = async (data) => {
        try {
            await addPostService(data);
            const newPosts = await getAllPostService();
            dispatch({
                type: 'GET_POSTS',
                payload: newPosts,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const getPostBySubject = async (subjectId) => {
        try {
            const response = await getPostBySubjectService(subjectId);
            dispatch({
                type: 'GET_POSTS',
                payload: response,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostContext.Provider value={{ posts: state.posts, handleAddPost, getAllPost, getPostBySubject }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
