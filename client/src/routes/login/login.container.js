import { connect } from 'react-redux';
import { LoginComponent } from './login.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../core/+store/reducers/auth/+auth.reducer';
import { actions as userActions } from '../../core/+store/reducers/users/users.reducer';

const mapDispatchToProps = {
    loginAction: actions.loginAction,
    addUserAction: userActions.addUserAction,
};

const mapStateToProps = ({ appLayout }) => ({
    appLayout,
});

export const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
