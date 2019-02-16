import { ajax, reducerUtils } from '../../../index';

export const LOGIN = 'LOGIN';

export const loginAction = ({ username, password }) => {
    return (dispatch, getState) => {
        return ajax.post({ url: 'auth/login', postData: { username, password: btoa(password) } }).then(({ token }) => {
            localStorage.token = token;

            const parsedUser = JSON.parse(atob(token.split('.')[1]));
            const user = {
                username: parsedUser.sub,
                roles: parsedUser.roles
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
