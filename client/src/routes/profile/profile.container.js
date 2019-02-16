import { connect } from 'react-redux';
import { ProfileComponent } from './profile.component';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = {
};

const mapStateToProps = () => ({
});

export const ProfileContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileComponent));
