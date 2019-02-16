import { ajax } from '../../../utils/ajax-requests.util';
import { UserModel } from '../../../../shared/models/UserModel';
import { reducerUtils } from '../../../index';

export const REGISTER_USER = 'REGISTER_USER';

export const registerUserAction = (user) => {
    const userInstance = new UserModel(user);

    return (dispatch, getState) => {
        return ajax.post({ url: 'users', postData: userInstance }).then(() => {
            return dispatch({
                type: REGISTER_USER,
                payload: userInstance,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const registerUserReducer = {
    type: REGISTER_USER,
    handler: (state, action) => {
        delete action.payload.password;
        return [...state, action.payload];
    }
};
