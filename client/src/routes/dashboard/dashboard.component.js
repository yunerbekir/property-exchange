import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDashboardAction();
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <p>Active Users: {this.props.dashboard.activeUsers && this.props.dashboard.activeUsers.length}</p>
                </Card>
            </React.Fragment>

        );
    }
}

DashboardComponent.propTypes = {
    history: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    getDashboardAction: PropTypes.func.isRequired,
};

