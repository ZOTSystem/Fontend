import Request from "../utils/Request";

export const GetTestDetailService = async (accountId) => {
    try {
        const respone = await Request({
            method: "get",
            url: `history/getHistory?accountId=${accountId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const GetAllSubject = async () => {
    try {
        const response = await Request({
            method: "get",
            url: 'history/getAllSubject',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

export const StatictisService = async (accountId, subjectName) => {
    try {
        const response = await Request({
            method: "get",
            url: `history/statistic?accountId=${accountId}&subjectName=${subjectName}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        return e;
    }
}