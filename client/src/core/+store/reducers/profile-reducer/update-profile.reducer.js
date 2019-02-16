import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfileAction = (updatedProfile) => {
    return (dispatch, getState) => {
        return ajax.put({ url: `users`, postData: updatedProfile }).then(() => {
            return dispatch({
                type: UPDATE_PROFILE,
                payload: updatedProfile,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateProfileReducer = {
    type: UPDATE_PROFILE,
    handler: (state, action) => {
        return { ...action.payload };
    }
};
