import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const GET_API_VERSION = 'GET_API_VERSION';

export const getApiVersionAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: 'version' }).then((apiVersion) => {
            return dispatch({
                type: GET_API_VERSION,
                payload: apiVersion,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getApiVersionReducer = {
    type: GET_API_VERSION,
    handler: (state, action) => {
        const apiVersion = action.payload;
        return { ...state, apiVersion };
    }
};
