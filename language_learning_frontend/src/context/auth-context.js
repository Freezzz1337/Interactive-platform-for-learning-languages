import {createContext, useEffect, useState} from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {saveToken, getToken, removeToken} = useAuth();

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            removeToken();
        }
    }, [getToken, removeToken]);

    const login = (serverResponse) => {

        const {token, expiresIn, userType} = serverResponse;
        saveToken(token, expiresIn);
        setIsAuthenticated(true);
        setUserType(userType);
    }

    const logout = () => {
        setUserType(null);
        setIsAuthenticated(false);
        removeToken();
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;