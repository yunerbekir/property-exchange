export const LOGOUT = 'LOGOUT';

export const logoutAction = () => {
    return (dispatch, getState) => {
        localStorage.removeItem('token');

        return dispatch({
            type: LOGOUT,
            payload: null
        });
    };
};

export const logoutReducer = {
    type: LOGOUT,
    handler: (state, action) => ({
        ...state,
        token: '',
        user: {},
    })
};
