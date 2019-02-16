import { ajax, reducerUtils } from '../../../index';

export const REGISTER_USER = 'REGISTER_USER';

export const registerUserAction = ({ username, password, email }) => {
    return (dispatch, getState) => {
        return ajax.post({ url: 'auth/register', postData: { username, password: btoa(password), email } }).then(({ token }) => {
            localStorage.token = token;

            const parsedUser = JSON.parse(atob(token.split('.')[1]));
            const user = {
                username: parsedUser.sub,
                roles: parsedUser.roles
            };

            return dispatch({
                type: REGISTER_USER,
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

export const registerUserReducer = {
    type: REGISTER_USER,
    handler: (state, action) => ({
        ...state, ...action.payload
    })
};
