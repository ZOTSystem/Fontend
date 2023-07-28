import { createContext, useReducer } from 'react';
import {
    getAllPostService,
    addPostService,
    getPostBySubjectService,
    getPostByStatusService,
    getPostBySubjectAndStatusService,
    getPostByIdService,
} from '../services/postService';
import postReducer from '../reducers/postReducer';

const initialState = {
    loading: true,
    posts: [],
    currentPost: {},
};

export const PostContext = createContext(null);

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    const { loading, posts, currentPost } = state;

    const getAllPost = async () => {
        try {
            const response = await getAllPostService();
            dispatch({
                type: 'GET_POSTS',
                payload: response,
                loading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getPostById = async (postId) => {
        try {
            const response = await getPostByIdService(postId);
            dispatch({
                type: 'GET_POST_DETAILS',
                payload: response,
                loading: false,
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
                loading: false,
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
                loading: false,
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
                loading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getPostBySubjectAndStatus = async (subjectId, status) => {
        try {
            const response = await getPostBySubjectAndStatusService(subjectId, status);
            dispatch({
                type: 'GET_POSTS',
                payload: response,
                loading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                currentPost,
                addPost,
                getAllPost,
                getPostById,
                getPostBySubject,
                getPostByStatus,
                getPostBySubjectAndStatus,
            }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
