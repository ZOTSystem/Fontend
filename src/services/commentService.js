import request from '../utils/request';

const END_POINTS = {
    ADD_COMMENT: 'comment/AddComment',
    GET_BY_POST: 'comment/getCommentByPost',
};

export const addCommentService = async (data) => await request.post(END_POINTS.ADD_COMMENT, data);

export const getCommentsByPostService = async (postId) =>
    await request.get(`${END_POINTS.GET_BY_POST}?postId=${postId}`);
