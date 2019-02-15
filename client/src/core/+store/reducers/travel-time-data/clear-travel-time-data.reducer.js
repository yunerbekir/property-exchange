export const CLEAR_TRAVEL_TIME_DATA = 'CLEAR_TRAVEL_TIME_DATA';

export const clearTravelTimesDataAction = (travelTimeId) => {
    return (dispatch, getState) => {
        return dispatch({
            type: CLEAR_TRAVEL_TIME_DATA,
            payload: travelTimeId,
        });
    };
};

export const clearTravelTimeDataReducer = {
    type: CLEAR_TRAVEL_TIME_DATA,
    handler: (state, action) => {
        return Object.keys(state)
            .filter(currentTravelTimeId => action.payload !== currentTravelTimeId)
            .reduce((newState, id) => {
                newState[id] = state[id];
                return newState;
            }, {});
    }
};
