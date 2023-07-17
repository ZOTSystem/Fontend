import request from '../utils/request';

const END_POINTS = {
    GET_ALL_SUBJECT: 'Subject/getAllSubject'
}

export const getAllSubjectService = async () => await request.get(END_POINTS.GET_ALL_SUBJECT)