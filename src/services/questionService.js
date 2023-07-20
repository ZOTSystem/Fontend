import Request from '../utils/request';

export const GetQuestionByTopicId = async (topicId) => {
    try {
        const respone = await Request({
            method: 'get',
            url: `Question/getQuestionByTopicId?topicId=${topicId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return respone;
    } catch (e) {
        return e;
    }
};
