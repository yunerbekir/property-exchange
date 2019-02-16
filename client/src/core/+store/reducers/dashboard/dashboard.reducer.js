import { ajax, reducerUtils } from '../../../index';

export const GET_DASHBOARD = 'GET_DASHBOARD';

export const getDashboardAction = () => {
    return (dispatch, getState) => {
        return ajax.get({ url: 'dashboard' }).then((data) => {

            return dispatch({
                type: GET_DASHBOARD,
                payload: data
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

const getDashboardReducer = {
    type: GET_DASHBOARD,
    handler: (state, action) => ({
        ...state, ...action.payload
    })
};


export const actions = {
    getDashboardAction,
};

const ACTION_HANDLERS = {};

const REDUCERS = [
    getDashboardReducer,
];

REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initState = {};

export function dashboardReducer(state = initState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
