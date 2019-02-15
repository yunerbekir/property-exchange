import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { DeviceModel } from '../../../../shared/models/DeviceModel';

export const GET_DEVICES = 'GET_DEVICES';

export const getDevicesAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: 'devices' }).then((devices) => {
            return dispatch({
                type: GET_DEVICES,
                payload: devices.map(deviceJson => DeviceModel.fromJson(deviceJson)),
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getDevicesReducer = {
    type: GET_DEVICES,
    handler: (state, action) => {
        return [...action.payload];
    }
};
