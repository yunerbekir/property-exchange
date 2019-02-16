import { connect } from 'react-redux';
import { DashboardComponent } from './dashboard.component';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = {
};

const mapStateToProps = () => ({
});

export const DashboardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));
