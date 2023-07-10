import Request from "../utils/Request";

export const GetAllModService = async (page) => {
    try{
        const respone = await Request({
            method: 'get', 
            url: `account/getAllMod?page=${page}&pageSize=5`,
            headers: {
                "Content-Type": "application/json",
            }, 
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const AddModService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "account/AddUser",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone.data;
    } catch(e){
        return e;
    }
}

// export const GetAllEmail = async () => {
//     try{
//         const respone = await Request({
//             method: 'get', 
//             url: 'account/getAllEmail',
//             headers: {
//                 "Content-Type": "application/json",
//             }, 
//         });
//         return respone.data;
//     } catch (e) {
//         return e;
//     }
// }

export const ChangeStatusService = async (accountId, string) => {
    try {
        const respone = await Request({
            method: "post",
            url: `account/ChangeStatus?accountId=${accountId}&status=${string}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch(e){
        return e;
    }
}

export const UpdateModService = async (accountId,data) => {
    try {
        const respone = await Request({
            method: "post",
            url: `account/UpdateMod?accountId=${accountId}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone.data;
    } catch(e){
        return e;
    }
}