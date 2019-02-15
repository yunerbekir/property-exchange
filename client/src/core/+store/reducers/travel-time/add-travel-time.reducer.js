import { ajax } from '../../../utils/ajax-requests.util';
import { TravelTimeModel } from '../../../../shared/models/TravelTimeModel';
import { reducerUtils } from '../../../index';

export const ADD_TRAVEL_TIME = 'ADD_TRAVEL_TIME';

export const addTravelTimeAction = (travelTime) => {
    const travelTimeInstance = new TravelTimeModel(travelTime);
    travelTimeInstance.setAsNewlyAdded();

    return (dispatch, getState) => {
        return ajax.post({ url: 'travelTimes', postData: travelTimeInstance }).then(() => {
            return dispatch({
                type: ADD_TRAVEL_TIME,
                payload: travelTimeInstance,
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const addTravelTimeReducer = {
    type: ADD_TRAVEL_TIME,
    handler: (state, action) => {
        return [...state, action.payload];
    }
};
