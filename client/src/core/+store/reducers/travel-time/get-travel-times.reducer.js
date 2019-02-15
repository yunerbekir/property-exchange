import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { TravelTimeModel } from '../../../../shared/models/TravelTimeModel';

export const GET_TRAVEL_TIMES = 'GET_TRAVEL_TIMES';

export const getTravelTimesAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: 'travelTimes' }).then((travelTimes) => {

            return dispatch({
                type: GET_TRAVEL_TIMES,
                payload: travelTimes.map(travelTimeJson => TravelTimeModel.fromJson(travelTimeJson)),
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getTravelTimesReducer = {
    type: GET_TRAVEL_TIMES,
    handler: (state, action) => {
        return [...action.payload];
    }
};
