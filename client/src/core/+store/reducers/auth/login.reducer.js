import { ajax, reducerUtils } from '../../../index';

export const LOGIN = 'LOGIN';

export const loginAction = ({ username, password }) => {
    return (dispatch, getState) => {
        return ajax.post({ url: 'auth/login', postData: { username, password: btoa(password) } }).then(({ token }) => {
            localStorage.token = token;

            const parsedUser = JSON.parse(atob(localStorage.token.split('.')[1])).user;
            const user = {
                username: parsedUser.username,
                email: parsedUser.email,
                id: parsedUser.id
            };

            return dispatch({
                type: LOGIN,
                payload: {
                    token,
                    user
                }
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const loginReducer = {
    type: LOGIN,
    handler: (state, action) => ({
        ...state, ...action.payload
    })
};
