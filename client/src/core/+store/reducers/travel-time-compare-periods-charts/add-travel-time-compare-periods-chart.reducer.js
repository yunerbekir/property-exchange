import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { TravelTimeComparePeriodsChartModel } from '../../../../shared/models/TravelTimeComparePeriodsChartModel';

export const ADD_TRAVEL_TIME_COMPARE_CHARTS_CHART = 'ADD_TRAVEL_TIME_COMPARE_CHARTS_CHART';

export const addTravelTimeComparePeriodsChartAction = (travelTimeId, travelTimeChartJson) => {
    const chartInstance = new TravelTimeComparePeriodsChartModel(travelTimeChartJson);

    return (dispatch, getState) => {
        return ajax.post({
            url: `comparePeriodsCharts/${travelTimeId}`,
            postData: chartInstance
        }).then(() => {
            return dispatch({
                type: ADD_TRAVEL_TIME_COMPARE_CHARTS_CHART,
                payload: {
                    [travelTimeId]: [chartInstance, ...getState().travelTimeComparePeriodsCharts[travelTimeId] || {}]
                },
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });


    };
};

export const addTravelTimeComparePeriodsChartReducer = {
    type: ADD_TRAVEL_TIME_COMPARE_CHARTS_CHART,
    handler: (state, action) => {
        return { ...state, ...action.payload };
    }
};
