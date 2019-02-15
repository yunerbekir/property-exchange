import {
    addTravelTimeComparePeriodsChartReducer,
    addTravelTimeComparePeriodsChartAction
} from './add-travel-time-compare-periods-chart.reducer';
import {
    removeTravelTimeComparePeriodsChartReducer,
    removeTravelTimeComparePeriodsChartAction
} from './remove-travel-time-compare-periods-chart.reducer';
import {
    updateTravelTimeComparePeriodsChartReducer,
    updateTravelTimeComparePeriodsChartAction
} from './update-travel-time-compare-periods-chart.reducer';
import {
    getTravelTimeComparePeriodsChartsReducer,
    getTravelTimeComparePeriodsChartsAction
} from './get-travel-time-compare-periods-charts.reducer';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    addTravelTimeComparePeriodsChartAction,
    removeTravelTimeComparePeriodsChartAction,
    updateTravelTimeComparePeriodsChartAction,
    getTravelTimeComparePeriodsChartsAction,
};

const REDUCERS = [
    addTravelTimeComparePeriodsChartReducer,
    removeTravelTimeComparePeriodsChartReducer,
    updateTravelTimeComparePeriodsChartReducer,
    getTravelTimeComparePeriodsChartsReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export function travelTimeComparePeriodsChartsReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
