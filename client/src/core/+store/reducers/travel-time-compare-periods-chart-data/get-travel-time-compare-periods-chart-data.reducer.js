import { ajax } from '../../../utils/ajax-requests.util';
import { reducerUtils } from '../../../index';
import { TravelTimeComparePeriodsChartDataModel } from '../../../../shared/models/TravelTimeComparePeriodsChartDataModel';

export const GET_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA = 'GET_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA';

export const getTravelTimeComparePeriodsChartDataAction = ({ chartId, originDeviceId, destinationDeviceId }) => {
    return (dispatch, getState) => {
        return ajax.get({ url: `comparePeriodsCharts/${chartId}?originDeviceId=${originDeviceId}&destinationDeviceId=${destinationDeviceId}` }).then((chartData) => {
            return dispatch({
                type: GET_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA,
                payload: {
                    [chartId]: TravelTimeComparePeriodsChartDataModel.fromJson({
                        chartId: chartId,
                        data: chartData
                    })
                },
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

export const getTravelTimeComparePeriodsChartDataReducer = {
    type: GET_TRAVEL_TIME_COMPARE_PERIODS_CHART_DATA,
    handler: (state, action) => {
        return { ...state, ...action.payload };
    }
};
