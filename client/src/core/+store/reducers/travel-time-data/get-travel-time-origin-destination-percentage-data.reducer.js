import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { TravelTimesDataModel } from '../../../../shared/models/TravelTimesDataModel';

export const GET_TRAVEL_TIME_ORIGIN_DESTINATION_PERCENTAGE_DATA = 'GET_TRAVEL_TIME_ORIGIN_DESTINATION_PERCENTAGE_DATA';

export const getTravelTimesOriginDestinationPercentageDataAction = (travelTimeId) => {
    return (dispatch, getState) => {
        return ajax.get({ url: `travelTimeOriginDestinationData/${travelTimeId}` }).then((travelTimesData) => {

            return dispatch({
                type: GET_TRAVEL_TIME_ORIGIN_DESTINATION_PERCENTAGE_DATA,
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

export const getTravelTimeOriginDestinationPercentageDataReducer = {
    type: GET_TRAVEL_TIME_ORIGIN_DESTINATION_PERCENTAGE_DATA,
    handler: (state, action) => {
        return { ...state, ...action.payload };
    }
};
