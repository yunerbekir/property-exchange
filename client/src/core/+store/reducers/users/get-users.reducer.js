import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { UserModel } from '../../../../shared/models/UserModel';

export const GET_USERS = 'GET_USERS';

export const getUsersAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: 'users' }).then((users) => {

            return dispatch({
                type: GET_USERS,
                payload: users.map(userJson => UserModel.fromJson(userJson)),
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getUsersReducer = {
    type: GET_USERS,
    handler: (state, action) => {
        return [...action.payload];
    }
};
