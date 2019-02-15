import {
    getTravelTimeComparePeriodsChartDataReducer,
    getTravelTimeComparePeriodsChartDataAction
} from './get-travel-time-compare-periods-chart-data.reducer';
import {
    clearTravelTimeComparePeriodsChartDataReducer,
    clearTravelTimeComparePeriodsChartDataAction
} from './clear-travel-time-compare-periods-chart-data.reducer';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    getTravelTimeComparePeriodsChartDataAction,
    clearTravelTimeComparePeriodsChartDataAction,
};

const REDUCERS = [
    getTravelTimeComparePeriodsChartDataReducer,
    clearTravelTimeComparePeriodsChartDataReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export function travelTimeComparePeriodsChartDataReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
