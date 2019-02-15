export const CLEAR_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA = 'CLEAR_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA';

export const clearTravelTimeComparePeriodsChartDataAction = (chartIds) => {
    return (dispatch, getState) => {
        return dispatch({
            type: CLEAR_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA,
            payload: chartIds,
        });
    };
};

export const clearTravelTimeComparePeriodsChartDataReducer = {
    type: CLEAR_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA,
    handler: (state, action) => {
        return Object.keys(state)
            .filter(currentTravelTimeId => !action.payload.includes(currentTravelTimeId))
            .reduce((newState, id) => {
                newState[id] = state[id];
                return newState;
            }, {});

    }
};
