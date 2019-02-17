import { connect } from 'react-redux';
import { LoginComponent } from './login.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/auth/+auth.reducer';
import { registerUserAction } from '../../../core/+store/reducers/auth/registerUser.reducer';

const mapDispatchToProps = {
    loginAction: actions.loginAction,
    registerUserAction,
};

const mapStateToProps = () => ({});

export const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
