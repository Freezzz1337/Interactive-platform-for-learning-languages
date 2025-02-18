import Cookies from "js-cookie";

const TOKEN_KEY = "jwtToken";
const useAuth = () => {

    const saveToken = (token, expirationTime) => {
        const days = expirationTime / (24 * 60 * 60 * 1000);
        Cookies.set(TOKEN_KEY, token, {expires: days});
    }

    const getToken = () => Cookies.get(TOKEN_KEY);

    const removeToken = () => {
        Cookies.remove(TOKEN_KEY);
    }

    return {
        saveToken,
        getToken,
        removeToken
    };
};
export default useAuth;
