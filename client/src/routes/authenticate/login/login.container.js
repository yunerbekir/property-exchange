import { connect } from 'react-redux';
import { LoginComponent } from './login.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/auth/+auth.reducer';
import { registerUserAction } from '../../../core/+store/reducers/users/register-user.reducer';

const mapDispatchToProps = {
    loginAction: actions.loginAction,
    registerUserAction,
};

const mapStateToProps = ({ appLayout }) => ({
    appLayout,
});

export const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
