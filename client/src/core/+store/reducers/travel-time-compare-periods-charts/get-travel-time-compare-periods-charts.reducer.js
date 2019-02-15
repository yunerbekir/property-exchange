import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { TravelTimeComparePeriodsChartModel } from '../../../../shared/models/TravelTimeComparePeriodsChartModel';

export const GET_TRAVEL_TIME_COMPARE_PERIODS_CHARTS = 'GET_TRAVEL_TIME_COMPARE_PERIODS_CHARTS';

export const getTravelTimeComparePeriodsChartsAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: `comparePeriodsCharts` }).then((chartsGroupedByTravelTimeId) => {
            const parsedResult = {};
            Object.keys(chartsGroupedByTravelTimeId).forEach((travelTimeId) => {
                parsedResult[travelTimeId] = chartsGroupedByTravelTimeId[travelTimeId].map(chartJson => TravelTimeComparePeriodsChartModel.fromJson(chartJson));
            });

            return dispatch({
                type: GET_TRAVEL_TIME_COMPARE_PERIODS_CHARTS,
                payload: parsedResult
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getTravelTimeComparePeriodsChartsReducer = {
    type: GET_TRAVEL_TIME_COMPARE_PERIODS_CHARTS,
    handler: (state, action) => {
        return { ...state, ...action.payload };
    }
};
