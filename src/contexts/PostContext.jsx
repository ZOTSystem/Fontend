import { createContext, useEffect, useReducer } from 'react';
import { getAllPostService } from '../services/postService';
import postReducer from '../reducers/postReducer';

const initialState = {
    posts: [],
};

export const PostContext = createContext(null);

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    useEffect(() => {
        const getAllPost = async () => {
            const response = await getAllPostService();
            dispatch({
                type: 'GET_POSTS',
                payload: response,
            });
        };
        getAllPost();
    }, []);

    return <PostContext.Provider value={state}>{children}</PostContext.Provider>;
};

export default PostProvider;
