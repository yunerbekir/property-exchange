import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_TRAVEL_TIME = 'UPDATE_TRAVEL_TIME';

export const updateTravelTimeAction = (travelTime) => {
    return (dispatch, getState) => {
        return ajax.put({ url: `travelTimes`, postData: travelTime }).then(() => {
            return dispatch({
                type: UPDATE_TRAVEL_TIME,
                payload: travelTime,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateTravelTimeActionReducer = {
    type: UPDATE_TRAVEL_TIME,
    handler: (state, action) => {
        const updatedTravelTimeIdx = state.findIndex(currentTravelTime => currentTravelTime.id === action.payload.id);

        return [...state.slice(0, updatedTravelTimeIdx), action.payload, ...state.slice(updatedTravelTimeIdx + 1, state.length)];
    }
};
