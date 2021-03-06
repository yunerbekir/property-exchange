import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { authReducer } from './auth/+auth.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer';
import { profileReducer } from './profile-reducer/profile.reducer';


export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        toastr: toastrReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        profile: profileReducer,
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
