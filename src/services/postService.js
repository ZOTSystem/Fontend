import request from '../utils/request';

const END_POINTS = {
    GET_ALL_POST: 'post/getAllPost',
    ADD_POST: 'post/AddPost',
    GET_BY_SUBJECT: 'post/FilterPostBySubject',
    GET_BY_STATUS: 'post/GetPostByStatus'
};

export const getAllPostService = async () => await request.get(END_POINTS.GET_ALL_POST);

export const addPostService = async (data) => await request.post(END_POINTS.ADD_POST, data);

export const getPostBySubjectService = async (subjectId) =>
    await request.get(`${END_POINTS.GET_BY_SUBJECT}?subjectId=${subjectId}`);

export const getPostByStatusService = async (status) => await request.get(`${END_POINTS.GET_BY_STATUS}?status=${status}`);