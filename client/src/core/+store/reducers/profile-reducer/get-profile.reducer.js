import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const GET_PROFILE = 'GET_PROFILE';

export const getProfileAction = () => {
    const id = 0;
    return (dispatch, getState) => {
        return ajax.get({ url: `users/${id}` }).then((user) => {

            return dispatch({
                type: GET_PROFILE,
                payload: user,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getProfileReducer = {
    type: GET_PROFILE,
    handler: (state, action) => {
        return { ...action.payload };
    }
};
