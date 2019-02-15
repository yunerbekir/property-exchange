import { getApiVersionReducer, getApiVersionAction } from './get-version.reducer';

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
    getApiVersionAction,
};

const REDUCERS = [
    getApiVersionReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    buildDate: window.buildDate,
    packageVersion: window.packageVersion,
    api: window.API_BASE_URL,
    apiVersion: ''
};

export function versionReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}


