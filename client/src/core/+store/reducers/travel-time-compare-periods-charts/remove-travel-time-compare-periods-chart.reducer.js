import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';

export const REMOVE_TRAVEL_TIME_COMPARE_PERIODS_CHART = 'REMOVE_TRAVEL_TIME_COMPARE_PERIODS_CHART';

export const removeTravelTimeComparePeriodsChartAction = (travelTimeId, chartId) => {
    return (dispatch, getState) => {
        return ajax.delete({ url: `comparePeriodsCharts/${chartId}` }).then(() => {
            return dispatch({
                type: REMOVE_TRAVEL_TIME_COMPARE_PERIODS_CHART,
                payload: { travelTimeId, chartId },
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const removeTravelTimeComparePeriodsChartReducer = {
    type: REMOVE_TRAVEL_TIME_COMPARE_PERIODS_CHART,
    handler: (state, action) => {
        const { travelTimeId, chartId } = action.payload;
        const updatedTravelTimeCharts = state[travelTimeId].filter(chart => chart.id !== chartId);

        return { ...state, [travelTimeId]: updatedTravelTimeCharts };
    }
};
