import { loginAction, loginReducer } from './login.reducer';
import { logoutAction, logoutReducer } from './logout.reducer';
import { changePasswordAction, changePasswordReducer } from './change-password.reducer';
import { registerUserAction, registerUserReducer } from './registerUser.reducer';

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
    loginAction,
    logoutAction,
    changePasswordAction,
    registerUserAction,
};

const ACTION_HANDLERS = {};

const REDUCERS = [
    loginReducer,
    logoutReducer,
    changePasswordReducer,
    registerUserReducer,
];

REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: {},
    token: localStorage.token
};

try {
    const parsedUser = JSON.parse(atob(localStorage.token.split('.')[1])).user;
    initialState.user = {
        username: parsedUser.username,
        email: parsedUser.email,
        id: parsedUser.id
    };
} catch (e) {
    initialState.user = {};
}

export function authReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
