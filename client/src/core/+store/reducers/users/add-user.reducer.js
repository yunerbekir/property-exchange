import { ajax } from '../../../utils/ajax-requests.util';
import { UserModel } from '../../../../shared/models/UserModel';
import { reducerUtils } from '../../../index';

export const ADD_USER = 'ADD_USER';

export const addUserAction = (user) => {
    const userInstance = new UserModel(user);

    return (dispatch, getState) => {
        return ajax.post({ url: 'users', postData: userInstance }).then(() => {
            return dispatch({
                type: ADD_USER,
                payload: userInstance,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const addUserReducer = {
    type: ADD_USER,
    handler: (state, action) => {
        delete action.payload.password;
        return [...state, action.payload];
    }
};
