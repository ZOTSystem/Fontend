import request from '../utils/request';

const END_POINTS = {
    GET_ALL_POST: 'post/getAllPost'
}

export const getAllPostService = async () => await request.get(END_POINTS.GET_ALL_POST);