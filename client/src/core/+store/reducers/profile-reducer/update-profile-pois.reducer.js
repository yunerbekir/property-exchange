import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_PROFILE_POIS = 'UPDATE_PROFILE_POIS';

export const updateProfilePoisAction = (newPois) => {
    return (dispatch, getState) => {
        return ajax.put({ url: `users/pois`, postData: { pois: newPois } }).then(() => {
            return dispatch({
                type: UPDATE_PROFILE_POIS,
                payload: newPois,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateProfilePoisReducer = {
    type: UPDATE_PROFILE_POIS,
    handler: (state, action) => {
        return { ...state, pois: [...action.payload] };
    }
};
