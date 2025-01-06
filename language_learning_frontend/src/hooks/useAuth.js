import Cookies from "js-cookie";

const TOKEN_KEY = "jwtToken";
const useAuth = () => {

    const saveToken = (token, expirationTime) => {
        const expirationDate = new Date(expirationTime);
        Cookies.set(TOKEN_KEY, token, {expires: expirationDate});
    }

    const getToken = () => Cookies.get(TOKEN_KEY);

    const isTokenExpired = () => {
        const token = getToken();
        if (!token) return true;

        const expirationTime = Cookies.getJSON(`${TOKEN_KEY}_expiration`);
        if (!expirationTime) return true;

        return new Date() > new Date(expirationTime);
    }

    const removeToken = () => {
        Cookies.remove(TOKEN_KEY);
    }

    return {
        saveToken,
        getToken,
        isTokenExpired,
        removeToken
    };
};
export default useAuth;
