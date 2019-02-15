import { addDeviceReducer, addDeviceAction } from './add-device.reducer';
import { getDevicesReducer, getDevicesAction } from './get-devices.reducer';
import { removeDeviceReducer, removeDeviceAction } from './remove-device.reducer';
import { updateDeviceActionReducer, updateDeviceAction } from './update-device.reducer';
import { dataSortFunction } from '../../../';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    addDeviceAction,
    getDevicesAction,
    removeDeviceAction,
    updateDeviceAction,
};

const REDUCERS = [
    addDeviceReducer,
    getDevicesReducer,
    removeDeviceReducer,
    updateDeviceActionReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = [];

// ------------------------------------
// Reducer
// ------------------------------------
export function devicesReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action).sort(dataSortFunction) : state;
}
