import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const REMOVE_TRAVEL_TIME = 'REMOVE_TRAVEL_TIME';

export const removeTravelTimeAction = (travelTimeId) => {
    return (dispatch, getState) => {
        return ajax.delete({ url: `travelTimes/${travelTimeId}` }).then(() => {
            return dispatch({
                type: REMOVE_TRAVEL_TIME,
                payload: travelTimeId,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const removeTravelTimeReducer = {
    type: REMOVE_TRAVEL_TIME,
    handler: (state, action) => {
        const removedTravelTimeId = action.payload;

        return [...state.filter(currentTravelTime => currentTravelTime.id !== removedTravelTimeId)];
    }
};
