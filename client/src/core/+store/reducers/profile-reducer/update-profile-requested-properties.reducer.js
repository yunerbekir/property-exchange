import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_PROFILE_REQUESTED_PROPERTIES = 'UPDATE_PROFILE_REQUESTED_PROPERTIES';

export const updateProfileRequestedPropertiesAction = (newProperties) => {
    return (dispatch, getState) => {
        return ajax.put({
            url: `users/requestedProperties`,
            postData: { requestedProperties: newProperties }
        }).then(() => {
            return dispatch({
                type: UPDATE_PROFILE_REQUESTED_PROPERTIES,
                payload: newProperties,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateProfileRequestedPropertiesReducer = {
    type: UPDATE_PROFILE_REQUESTED_PROPERTIES,
    handler: (state, action) => {
        return { ...state, requestedproperties: [...action.payload] };
    }
};
