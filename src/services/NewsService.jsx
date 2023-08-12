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

export const AddNewsService = async (jsonData) => {
    try {
        const respone = await request({
            method: 'post',
            url: `news/addnews`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonData,
        });
        console.log(respone);
        return respone;
    } catch (e) {
        return e;
    }
}

export const EditNewsService = async (data) => {
    try {
        const respone = await request({
            method: 'post',
            url: `news/editNews`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data),
        });
        return respone;
    } catch (e) {
        return e;
    }
}

export const ChangeStatusNewsService = async (newsId, status) => {
    try {
        const respone = await request({
            method: 'post',
            url: `news/changeStatusNews?newsId=${newsId}&status=${status}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return respone;
    } catch (e) {
        return e;
    }
}
