import request from '../utils/request';

export const AddTestDetailService = async (accountId) => {
    try {
        const respone = await request({
            method: 'post',
            url: `TestDetail/addTestDetail?accountId=${accountId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return respone;
    } catch (e) {
        return e;
    }
};