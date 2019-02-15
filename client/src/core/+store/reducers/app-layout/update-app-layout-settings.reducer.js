import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_APP_LAYOUT_SETTINGS = 'UPDATE_APP_LAYOUT_SETTINGS';

export const updateAppLayoutSettingsAction = (updatedAppLayoutSettings) => {
    return (dispatch, getState) => {
        return ajax.put({ url: `users/userSettings`, postData: updatedAppLayoutSettings }).then(() => {
            return dispatch({
                type: UPDATE_APP_LAYOUT_SETTINGS,
                payload: updatedAppLayoutSettings,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateAppLayoutSettingsReducer = {
    type: UPDATE_APP_LAYOUT_SETTINGS,
    handler: (state, action) => {
        return action.payload;
    }
};
