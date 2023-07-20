import Request from "../utils/Request";

export const GetAllAccountUser = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "user/getAllAccountUser",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}