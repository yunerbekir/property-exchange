import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const REMOVE_USER = 'REMOVE_USER';

export const removeUserAction = (userId) => {
    return (dispatch, getState) => {
        return ajax.delete({ url: `users/${userId}` }).then(() => {
            return dispatch({
                type: REMOVE_USER,
                payload: userId,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const removeUserReducer = {
    type: REMOVE_USER,
    handler: (state, action) => {
        const removedUserId = action.payload;

        return [...state.filter(currentUser => currentUser.id !== removedUserId)];
    }
};
