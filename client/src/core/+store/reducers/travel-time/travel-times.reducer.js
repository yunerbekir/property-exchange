import { addTravelTimeReducer, addTravelTimeAction } from './add-travel-time.reducer';
import { getTravelTimesReducer, getTravelTimesAction } from './get-travel-times.reducer';
import { removeTravelTimeReducer, removeTravelTimeAction } from './remove-travel-time.reducer';
import { updateTravelTimeActionReducer, updateTravelTimeAction } from './update-travel-times.reducer';
import { dataSortFunction } from '../../../';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    addTravelTimeAction,
    getTravelTimesAction,
    removeTravelTimeAction,
    updateTravelTimeAction,
};

const REDUCERS = [
    addTravelTimeReducer,
    getTravelTimesReducer,
    removeTravelTimeReducer,
    updateTravelTimeActionReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = [];

// ------------------------------------
// Reducer
// ------------------------------------
export function travelTimesReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action).sort(dataSortFunction) : state;
}
