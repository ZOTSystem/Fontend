import request from '../utils/request';

const END_POINTS = {
    GET_ALL_POST: 'post/getAllPost',
    ADD_POST: 'post/AddPost'
}

export const getAllPostService = async () => await request.get(END_POINTS.GET_ALL_POST);

export const addPostService = async (data) => await request.post(END_POINTS.ADD_POST, data);