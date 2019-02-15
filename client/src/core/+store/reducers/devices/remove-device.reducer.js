import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const REMOVE_DEVICE = 'REMOVE_DEVICE';

export const removeDeviceAction = (deviceId) => {
    return (dispatch, getState) => {
        return ajax.delete({ url: `devices/${deviceId}` }).then(() => {
            return dispatch({
                type: REMOVE_DEVICE,
                payload: deviceId,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const removeDeviceReducer = {
    type: REMOVE_DEVICE,
    handler: (state, action) => {
        const removedDeviceId = action.payload;

        return [...state.filter(currentDevice => currentDevice.id !== removedDeviceId)];
    }
};
