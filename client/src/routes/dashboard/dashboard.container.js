import { connect } from 'react-redux';
import { DashboardComponent } from './dashboard.component';
import { withRouter } from 'react-router-dom';
import { getDashboardAction } from '../../core/+store/reducers/dashboard/dashboard.reducer';

const mapDispatchToProps = {
    getDashboardAction
};

const mapStateToProps = ({ dashboard }) => ({
    dashboard
});

export const DashboardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));
