import { getTravelTimeDataReducer, getTravelTimesDataAction } from './get-travel-time-data.reducer';
import { clearTravelTimeDataReducer, clearTravelTimesDataAction } from './clear-travel-time-data.reducer';
import {
    getTravelTimeOriginDestinationPercentageDataReducer,
    getTravelTimesOriginDestinationPercentageDataAction
} from './get-travel-time-origin-destination-percentage-data.reducer';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    getTravelTimesDataAction,
    clearTravelTimesDataAction,
    getTravelTimesOriginDestinationPercentageDataAction,
};

const REDUCERS = [
    getTravelTimeDataReducer,
    clearTravelTimeDataReducer,
    getTravelTimeOriginDestinationPercentageDataReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export function travelTimesDataReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
