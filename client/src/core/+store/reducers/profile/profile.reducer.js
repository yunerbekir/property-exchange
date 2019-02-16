import { ajax, reducerUtils } from '../../../index';

 const GET_PROFILE = 'GET_PROFILE';

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
                type: GET_PROFILE,
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

const profileReducer = {
    type: GET_PROFILE,
    handler: (state, action) => ({
        ...state, ...action.payload
    })
};


export const actions = {
  getDashboardAction,
};

const ACTION_HANDLERS = {};

const REDUCERS = [
    profileReducer,
];

REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);




export function profileReducer(state = initState, action){
  const handler= ACTION_HANDLERS[action.type];

  return handler? handler(state,action): state;
}
