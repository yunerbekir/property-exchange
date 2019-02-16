import { ajax, reducerUtils } from '../../../index';

export const GET_DASHBOARD = 'GET_DASHBOARD';

const getDashboardAction = ({ username, password }) => {
    return (dispatch, getState) => {
        return ajax.post({ url: 'auth/login', postData: { username, password: btoa(password) } }).then(({ token }) => {
            localStorage.token = token;

            const parsedUser = JSON.parse(atob(token.split('.')[1]));
            const user = {
                username: parsedUser.sub,
                roles: parsedUser.roles
            };

            return dispatch({
                type: GET_DASHBOARD,
                payload: {
                    token,
                    data
                }
            });
        }).catch((error) => {
            reducerUtils.handleAjaxErrors(error);
        });
    };
};

const dashboardReducer = {
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
    dashboardReducer,
];

REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);


export function dashboardReducer(state = initState, action){
  const handler= ACTION_HANDLERS[action.type];

  return handler? handler(state,action): state;
}
