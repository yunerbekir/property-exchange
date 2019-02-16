import { getProfileReducer, getProfileAction } from './get-profile.reducer';
import { updateProfileReducer, updateProfileAction } from './update-profile.reducer';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    getProfileAction,
    updateProfileAction,
};

const REDUCERS = [
    getProfileReducer,
    updateProfileReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export function profileReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
