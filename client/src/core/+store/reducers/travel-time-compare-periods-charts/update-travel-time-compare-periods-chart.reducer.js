import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const UPDATE_TRAVEL_TIME_COMPARE_PERIODS_CHARTS = 'UPDATE_TRAVEL_TIME_COMPARE_PERIODS_CHARTS';

export const updateTravelTimeComparePeriodsChartAction = (travelTimeId, travelTimeChart) => {
    return (dispatch, getState) => {
        return ajax.put({
            url: `comparePeriodsCharts`,
            postData: travelTimeChart
        }).then(() => {
            const currentTravelTimeCharts = getState().travelTimeComparePeriodsCharts[travelTimeId] || [];
            const updatedChartIdx = currentTravelTimeCharts.findIndex(chart => chart.id === travelTimeChart.id);

            return dispatch({
                type: UPDATE_TRAVEL_TIME_COMPARE_PERIODS_CHARTS,
                payload: {
                    [travelTimeId]: [...currentTravelTimeCharts.slice(0, updatedChartIdx), travelTimeChart, ...currentTravelTimeCharts.slice(updatedChartIdx + 1, currentTravelTimeCharts.length)]
                },
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const updateTravelTimeComparePeriodsChartReducer = {
    type: UPDATE_TRAVEL_TIME_COMPARE_PERIODS_CHARTS,
    handler: (state, action) => {
        return { ...state, ...action.payload };
    }
};
