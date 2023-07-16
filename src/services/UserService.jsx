import Request from "../utils/Request"

export const LoginService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: `home/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone.data;
    } catch (e) {
        return (e);
    }
}

export const GetInforService = async (token) => {
    try {
        const response = await Request({
            method: "get",
            url: `home/info?token=${token}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

export const RegisterService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "home/register",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const ConfirmAccountService = async (email) => {
    try {
        const respone = await Request({
            method: "get",
            url: `home/confirm?email=${email}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const ForgorPasswordService = async (email) => {
    try {
        const respone = await Request({
            method: "post",
            url: `home/forgotPassword?email=${email}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

// export const LoginByGoogleService = async (user) => {
//     try {
//         const response = await Request({
//             method: "get",
//             url: `home/search?email=${user.email}`,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         if (response.data.status === 200) {
//             const data = {
//                 email: response.data.user.email,
//                 password: response.data.user.password
//             };
//             return await LoginService(data);
//         }
//         const result = await RegisterService(user);
//         console.log(result);
//         if (result.status === 200) {
//             console.log("123");
//             const data = {
//                 email: response.data.user.email,
//                 password: response.data.user.password
//             };
//             return await LoginService(data);
//         }
//     } catch (e) {
//         return e;
//     }
// }

export const LoginByGoogleService = async (data) => {
    try {
        const response = await Request({
            method: "post",
            url: `home/loginByGoogle`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return response.data;
    } catch (e) {
        return e;
    }
}


export const UpdateUserService = async (data) => {
    try {
        const response = await Request({
            method: "post",
            url: "home/updateUser",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        })
        return response.data;
    } catch (e) {
        return e;
    }
}

export const GetInforByEmailService = async (email) => {
    try {
        const response = await Request({
            method: "get",
            url: `home/search?email=${email}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        return e;
    }
}


export const ChangePassowrdService = async (accountId, newPassword) => {
    try {
        const response = await Request({
            method: "post",
            url: `home/changePassword?accountId=${accountId}&newPassword=${newPassword}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch(e){
        return e;
    }
}

export const ChangeAvatarService = async (accountId, newAvatar) => {
    try {
        const response = await Request({
            method: "post",
            url: `home/changeAvatar?accountId=${accountId}&newAvatar=${newAvatar}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch(e){
        return e;
    }
}