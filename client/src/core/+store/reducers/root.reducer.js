import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { appLayoutReducer } from './app-layout/app-layout.reducer';
import { authReducer } from './auth/+auth.reducer';
import { usersReducer } from './users/users.reducer';
import { devicesReducer } from './devices/devices.reducer';
import { travelTimesReducer } from './travel-time/travel-times.reducer';
import { travelTimesDataReducer } from './travel-time-data/travel-times-data.reducer';
import { travelTimeComparePeriodsChartsReducer } from './travel-time-compare-periods-charts/travel-time-compare-periods-charts.reducer';
import { travelTimeComparePeriodsChartDataReducer } from './travel-time-compare-periods-chart-data/travel-time-compare-periods-chart-data.reducer';
import { versionReducer } from './version/version.reducer';


export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        toastr: toastrReducer,
        auth: authReducer,
        appLayout: appLayoutReducer,
        users: usersReducer,
        devices: devicesReducer,
        travelTimes: travelTimesReducer,
        travelTimesData: travelTimesDataReducer,
        travelTimeComparePeriodsCharts: travelTimeComparePeriodsChartsReducer,
        travelTimeComparePeriodsChartsData: travelTimeComparePeriodsChartDataReducer,
        version: versionReducer,
        ...asyncReducers
    });
};

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
        return;
    }

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};
