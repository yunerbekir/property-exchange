import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { TravelTimesDataModel } from '../../../../shared/models/TravelTimesDataModel';

export const GET_TRAVEL_TIME_DATA = 'GET_TRAVEL_TIME_DATA';

export const getTravelTimesDataAction = (travelTimeId) => {
    return (dispatch, getState) => {
        return ajax.get({ url: `travelTimeData/${travelTimeId}` }).then((travelTimesData) => {

            return dispatch({
                type: GET_TRAVEL_TIME_DATA,
                payload: {
                    [travelTimeId]: TravelTimesDataModel.fromJson({
                        travelTimeId: travelTimeId,
                        data: travelTimesData
                    })
                },
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getTravelTimeDataReducer = {
    type: GET_TRAVEL_TIME_DATA,
    handler: (state, action) => {
        return { ...state, ...action.payload };
    }
};
