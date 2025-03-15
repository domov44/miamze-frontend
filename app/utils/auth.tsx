import Cookies from 'js-cookie';

export const getToken = (): string | undefined => {
    return Cookies.get('access_token');
};

export const setToken = (token: string) => {
    Cookies.set('access_token', token, { expires: 1 });
};

export const removeToken = () => {
    Cookies.remove('access_token');
};
