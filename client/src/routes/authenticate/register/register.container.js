import { connect } from 'react-redux';
import { RegisterComponent } from './register.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/auth/+auth.reducer';
import { actions as userActions } from '../../../core/+store/reducers/users/users.reducer';

const mapDispatchToProps = {
    registerAction: actions.registerUserAction,
    logInAction: actions.loginAction,
    addUserAction: userActions.addUserAction,
};

const mapStateToProps = ({ appLayout }) => ({
    appLayout,
});

export const RegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterComponent));
