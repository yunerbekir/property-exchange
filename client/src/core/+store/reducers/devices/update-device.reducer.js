import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_DEVICE = 'UPDATE_DEVICE';

export const updateDeviceAction = (device) => {
    return (dispatch, getState) => {
        return ajax.put({ url: `devices`, postData: device }).then(() => {
            return dispatch({
                type: UPDATE_DEVICE,
                payload: device,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateDeviceActionReducer = {
    type: UPDATE_DEVICE,
    handler: (state, action) => {
        const updatedDeviceIdx = state.findIndex(currentDevice => currentDevice.id === action.payload.id);

        return [...state.slice(0, updatedDeviceIdx), action.payload, ...state.slice(updatedDeviceIdx + 1, state.length)];
    }
};
