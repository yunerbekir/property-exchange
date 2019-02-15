import { AppLayoutModel } from '../../../../shared/models/AppLayoutModel';

import { getAppLayoutSettingsReducer, getAppLayoutSettingsAction } from './get-app-layout-settings.reducer';
import { updateAppLayoutSettingsReducer, updateAppLayoutSettingsAction } from './update-app-layout-settings.reducer';

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
    getAppLayoutSettingsAction,
    updateAppLayoutSettingsAction,
};

const REDUCERS = [
    getAppLayoutSettingsReducer,
    updateAppLayoutSettingsReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new AppLayoutModel({});

export function appLayoutReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}


