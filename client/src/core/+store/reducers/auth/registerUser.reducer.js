import { ajax, reducerUtils } from '../../../index';
import { v4 } from 'node-uuid';

export const REGISTER_USER = 'REGISTER_USER';

export const registerUserAction = ({ username, password, email }) => {
    return (dispatch, getState) => {
        return ajax.post({
            url: 'auth/register',
            postData: {
                id: v4(),
                username,
                password: btoa(password),
                email
            }
        }).then(({ token }) => {
            localStorage.token = token;

            const parsedUser = JSON.parse(atob(localStorage.token.split('.')[1])).user;
            const user = {
                username: parsedUser.username,
                email: parsedUser.email,
                id: parsedUser.id
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
