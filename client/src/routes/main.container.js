import { connect } from 'react-redux';

import { MainComponent } from './main.component';
import { withRouter } from 'react-router-dom';
import { logoutAction } from '../core/+store/reducers/auth/logout.reducer';
import { changePasswordAction } from '../core/+store/reducers/auth/change-password.reducer';
import { registerUserAction } from '../core/+store/reducers/auth/registerUser.reducer';
import { actions } from '../core/+store/reducers/app-layout/app-layout.reducer';
import { getApiVersionAction } from '../core/+store/reducers/version/get-version.reducer';

const mapDispatchToProps = {
    logoutAction,
    changePasswordAction,
    getAppLayoutSettingsAction: actions.getAppLayoutSettingsAction,
    getApiVersionAction,
    registerUserAction,
};

const mapStateToProps = ({ auth, appLayout, version }) => {
    return ({ auth, appLayout, version });
};

export const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
