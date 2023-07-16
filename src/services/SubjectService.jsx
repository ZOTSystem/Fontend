import Request from "../utils/Request";

export const GetAllSubjectService = async () => {
    try{
        const respone = await Request({
            method: 'get', 
            url: `Subject/getAllSubject`,
            headers: {
                "Content-Type": "application/json",
            }, 
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}