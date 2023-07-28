import request from '../utils/request';

export const GetAllNewsService = async () => {
    try {
        const respone = await request({
            method: 'get',
            url: `news/getAllNews`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return respone;
    } catch (e) {
        return e;
    }
};

export const GetAllNewsCategoryService = async () => {
    try {
        const respone = await request({
            method: 'get',
            url: `news/getAllNewsCategory`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return respone;
    } catch (e) {
        return e;
    }
};

