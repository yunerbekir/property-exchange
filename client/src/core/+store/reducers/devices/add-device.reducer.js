import { ajax } from '../../../utils/ajax-requests.util';
import { DeviceModel } from '../../../../shared/models/DeviceModel';
import { reducerUtils } from '../../../index';

export const ADD_DEVICE = 'ADD_DEVICE';

export const addDeviceAction = (device) => {
    const deviceInstance = new DeviceModel(device);

    return (dispatch, getState) => {
        return ajax.post({ url: 'devices', postData: deviceInstance }).then(() => {
            return dispatch({
                type: ADD_DEVICE,
                payload: deviceInstance,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const addDeviceReducer = {
    type: ADD_DEVICE,
    handler: (state, action) => {
        return [...state, action.payload];
    }
};
