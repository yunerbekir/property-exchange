import { connect } from 'react-redux';
import { ProfileComponent } from './profile.component';
import { withRouter } from 'react-router-dom';
import { getProfileAction } from '../../core/+store/reducers/profile-reducer/get-profile.reducer';
import { updateProfileAction } from '../../core/+store/reducers/profile-reducer/update-profile.reducer';

const mapDispatchToProps = {
    getProfileAction,
    updateProfileAction
};

const mapStateToProps = ({ profile }) => ({ profile });

export const ProfileContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileComponent));
