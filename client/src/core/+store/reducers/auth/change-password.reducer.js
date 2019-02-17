import { ajax } from '../../../index';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const changePasswordAction = ({ oldPassword, newPassword }) => {
    return (dispatch, getState) => {
        return ajax.post({
            url: 'auth/changePassword',
            postData: { oldPassword: oldPassword, newPassword: newPassword }
        })
            .then(() => {
                return dispatch({
                    type: CHANGE_PASSWORD,
                    payload: null
                });
            }).catch((error) => {
                if (error.message) {
                    console.error(error.message);
                }

                return { error };
            });
    };
};

export const changePasswordReducer = {
    type: CHANGE_PASSWORD,
    handler: (state, action) => ({
        ...state
    })
};
