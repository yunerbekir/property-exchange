import { connect } from 'react-redux';

import { MainComponent } from './main.component';
import { withRouter } from 'react-router-dom';
import { logoutAction } from '../core/+store/reducers/auth/logout.reducer';
import { changePasswordAction } from '../core/+store/reducers/auth/change-password.reducer';

const mapDispatchToProps = {
    logoutAction,
    changePasswordAction,
};

const mapStateToProps = ({ auth, appLayout, version }) => {
    return ({ auth, appLayout, version });
};

export const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
