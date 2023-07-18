import { createContext, useEffect, useReducer } from 'react';
import { getAllPostService, addPostService } from '../services/postService';
import postReducer from '../reducers/postReducer';

const initialState = {
    posts: [],
    handleAddPost: () => {},
};

export const PostContext = createContext(null);

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);
    useEffect(() => {
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
        getAllPost();
    }, []);

    const handleAddPost = async (data) => {
        try {
            await addPostService(data);
            console.log(data);
            const newPosts = await getAllPostService();
            dispatch({
                type: 'GET_POSTS',
                payload: newPosts,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return <PostContext.Provider value={{ posts: state.posts, handleAddPost }}>{children}</PostContext.Provider>;
};

export default PostProvider;
