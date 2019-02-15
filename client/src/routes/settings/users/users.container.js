import { connect } from 'react-redux';
import { UsersComponent } from './users.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/users/users.reducer';


const mapDispatchToProps = {
    getUsersAction: actions.getUsersAction,
    addUserAction: actions.addUserAction,
    removeUserAction: actions.removeUserAction,
    updateUserAction: actions.updateUserAction,
};

const mapStateToProps = (state) => ({
    users: state.users
});

export const UsersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersComponent));
