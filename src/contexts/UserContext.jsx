import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { GetInforService } from '../services/userService';

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [cookies] = useCookies(['token']);
    const [user, setUser] = useState('');
    const [token, setToken] = useState(cookies?.token ? cookies.token : '');
    const HandleGetInfo = async () => {
        const result = await GetInforService(token);
        if (result.status === 200) {
            setUser(result.data);
        }
    };

    useEffect(() => {
        if (token) {
            HandleGetInfo();
        }
    }, [token]);

    const onSetUser = (value) => {
        setUser(value.data);
        setToken(value.token);
    };

    const onSetToken = (value) => {
        setToken(value);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                onSetUser,
                onSetToken,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
