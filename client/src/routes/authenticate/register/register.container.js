import { connect } from 'react-redux';
import { RegisterComponent } from './register.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/auth/+auth.reducer';

const mapDispatchToProps = {
    registerAction: actions.registerUserAction,
    logInAction: actions.loginAction,
};

const mapStateToProps = () => ({
});

export const RegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterComponent));
