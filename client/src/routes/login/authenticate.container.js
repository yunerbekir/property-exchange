import { connect } from 'react-redux';
import { AuthenticateComponent } from './authenticate.component';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = {
};

const mapStateToProps = () => ({
});

export const AuthenticateContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticateComponent));
