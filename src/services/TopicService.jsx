import Request from '../utils/Request';

export const GetTopicByGrade = async (grade, subjectId) => {
    try {
        const respone = await Request({
            method: 'get',
            url: `Topics/getTopicByGrade?grade=${grade}&subjectId=${subjectId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
