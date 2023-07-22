import { createContext, useReducer } from 'react';
import {
    getAllPostService,
    addPostService,
    getPostBySubjectService,
    getPostByStatusService,
} from '../services/postService';
import postReducer from '../reducers/postReducer';

const initialState = {
    posts: [],
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
            console.log(error);
        }
    };

    const addPost = async (data) => {
        try {
            await addPostService(data);
            const newPosts = await getAllPostService();
            dispatch({
                type: 'GET_POSTS',
                payload: newPosts,
            });
        } catch (error) {
            console.log(error);
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

    const getPostByStatus = async (status) => {
        try {
            const response = await getPostByStatusService(status);
            dispatch({
                type: 'GET_POSTS',
                payload: response,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostContext.Provider value={{ posts: state.posts, addPost, getAllPost, getPostBySubject, getPostByStatus }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
