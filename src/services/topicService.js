import Request from '../utils/request';

export const GetTopicByGrade = async (grade, subjectId, topicType, accountId) => {
    try {
        const respone = await Request({
            method: 'get',
            url: `Topics/getTopicByGrade?grade=${grade}&subjectId=${subjectId}&topicType=${topicType}&accountId=${accountId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('topic: ' + respone)
        return respone;
    } catch (e) {
        return e;
    }
};
