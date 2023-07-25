import { createContext, useReducer } from 'react';
import commentReducer from '../reducers/commentReducer';
import { getCommentsByPostService } from '../services/commentService';

const initialState = {
    loading: true,
    comments: [],
};

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentReducer, initialState);
    const { loading, comments } = state;

    const getCommentsByPost = async (postId) => {
        try {
            const response = await getCommentsByPostService(postId);
            dispatch({
                type: 'GET_COMMENTS',
                payload: response,
                loading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CommentContext.Provider value={{ loading, comments, getCommentsByPost }}>{children}</CommentContext.Provider>
    );
};

export default CommentProvider;
