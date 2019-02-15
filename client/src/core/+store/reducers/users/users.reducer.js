import { addUserReducer, addUserAction } from './add-user.reducer';
import { getUsersReducer, getUsersAction } from './get-users.reducer';
import { removeUserReducer, removeUserAction } from './remove-user.reducer';
import { updateUserActionReducer, updateUserAction } from './update-user.reducer';
import { dataSortFunction } from '../../..';

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
    addUserAction,
    getUsersAction,
    removeUserAction,
    updateUserAction,
};

const REDUCERS = [
    addUserReducer,
    getUsersReducer,
    removeUserReducer,
    updateUserActionReducer,
];

const ACTION_HANDLERS = {};
REDUCERS.forEach(reducer => ACTION_HANDLERS[reducer.type] = reducer.handler);

const initialState = [];

// ------------------------------------
// Reducer
// ------------------------------------
export function usersReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action).sort(dataSortFunction) : state;
}
