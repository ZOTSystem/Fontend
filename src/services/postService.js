import request from '../utils/request';

const END_POINTS = {
    GET_ALL_POST: 'post/getAllPost',
    GET_BY_ID: 'post/getPostDetail',
    ADD_POST: 'post/AddPost',
    GET_BY_SUBJECT: 'post/GetPostBySubject',
    GET_BY_STATUS: 'post/GetPostByStatus',
    GET_BY_SUBJECT_STATUS: 'post/GetPostBySubjectAndStatus',
};

export const getAllPostService = async () => await request.get(END_POINTS.GET_ALL_POST);

export const getPostByIdService = async (postId) => await request.get(`${END_POINTS.GET_BY_ID}?postId=${postId}`);

export const addPostService = async (data) => await request.post(END_POINTS.ADD_POST, data);

export const getPostBySubjectService = async (subjectId) =>
    await request.get(`${END_POINTS.GET_BY_SUBJECT}?subjectId=${subjectId}`);

export const getPostByStatusService = async (status) =>
    await request.get(`${END_POINTS.GET_BY_STATUS}?status=${status}`);

export const getPostBySubjectAndStatusService = async (subjectId, status) =>
    await request.get(`${END_POINTS.GET_BY_SUBJECT_STATUS}?subjectId=${subjectId}&status=${status}`);
