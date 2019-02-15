import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { AppLayoutModel } from '../../../../shared/models/AppLayoutModel';

export const GET_APP_LAYOUT_SETTINGS = 'GET_APP_LAYOUT_SETTINGS';

export const getAppLayoutSettingsAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: 'users/userSettings' }).then((appLayoutJson) => {
            return dispatch({
                type: GET_APP_LAYOUT_SETTINGS,
                payload: AppLayoutModel.fromJson(appLayoutJson),
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getAppLayoutSettingsReducer = {
    type: GET_APP_LAYOUT_SETTINGS,
    handler: (state, action) => {
        return action.payload;
    }
};
