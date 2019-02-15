import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_USER = 'UPDATE_USER';

export const updateUserAction = (user) => {
    delete user.password;

    return (dispatch, getState) => {
        return ajax.put({ url: `users`, postData: user }).then(() => {
            return dispatch({
                type: UPDATE_USER,
                payload: user,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateUserActionReducer = {
    type: UPDATE_USER,
    handler: (state, action) => {
        const updatedUserIdx = state.findIndex(currentUser => currentUser.id === action.payload.id);

        return [...state.slice(0, updatedUserIdx), action.payload, ...state.slice(updatedUserIdx + 1, state.length)];
    }
};
