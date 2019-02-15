import { connect } from 'react-redux';
import { TravelTimeComponent } from './travel-time.component';
import { withRouter } from 'react-router-dom';
import { actions as travelTimeActions } from '../../core/+store/reducers/travel-time/travel-times.reducer';
import { actions as travelTimeComparisonPeriodsChartActions } from '../../core/+store/reducers/travel-time-compare-periods-charts/travel-time-compare-periods-charts.reducer';
import { actions as travelTimesDataActions } from '../../core/+store/reducers/travel-time-data/travel-times-data.reducer';
import { actions as devicesActions } from '../../core/+store/reducers/devices/devices.reducer';
import { actions as travelTimeComparePeriodsChartDataActions } from '../../core/+store/reducers/travel-time-compare-periods-chart-data/travel-time-compare-periods-chart-data.reducer';

const mapDispatchToProps = {
    addTravelTimeAction: travelTimeActions.addTravelTimeAction,
    updateTravelTimeAction: travelTimeActions.updateTravelTimeAction,
    removeTravelTimeAction: travelTimeActions.removeTravelTimeAction,
    getTravelTimesAction: travelTimeActions.getTravelTimesAction,
    getDevicesAction: devicesActions.getDevicesAction,
    getTravelTimesDataAction: travelTimesDataActions.getTravelTimesDataAction,
    addTravelTimeComparePeriodsChartAction: travelTimeComparisonPeriodsChartActions.addTravelTimeComparePeriodsChartAction,
    updateTravelTimeComparePeriodsChartAction: travelTimeComparisonPeriodsChartActions.updateTravelTimeComparePeriodsChartAction,
    removeTravelTimeComparePeriodsChartAction: travelTimeComparisonPeriodsChartActions.removeTravelTimeComparePeriodsChartAction,
    getTravelTimeComparePeriodsChartsAction: travelTimeComparisonPeriodsChartActions.getTravelTimeComparePeriodsChartsAction,
    getTravelTimeComparePeriodsChartDataAction: travelTimeComparePeriodsChartDataActions.getTravelTimeComparePeriodsChartDataAction,
    clearTravelTimesDataAction: travelTimesDataActions.clearTravelTimesDataAction,
    clearTravelTimeComparePeriodsChartDataAction: travelTimeComparePeriodsChartDataActions.clearTravelTimeComparePeriodsChartDataAction,
    getTravelTimesOriginDestinationPercentageDataAction: travelTimesDataActions.getTravelTimesOriginDestinationPercentageDataAction,
};

const mapStateToProps = (state) => ({
    travelTimes: state.travelTimes,
    travelTimeComparePeriodsCharts: state.travelTimeComparePeriodsCharts,
    travelTimesData: state.travelTimesData,
    devices: state.devices,
    appLayout: state.appLayout,
    travelTimeComparePeriodsChartsData: state.travelTimeComparePeriodsChartsData,
});

export const TravelTimeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TravelTimeComponent));
