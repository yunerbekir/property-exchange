import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { MatchConfigurationsComponent } from './match-configurations.component';
import { Link } from 'react-router-dom';
import './dashboard.component.scss';

export class DashboardComponent extends React.Component {
    componentDidMount() {
        this.props.getDashboardAction();
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <p style={{ fontSize: '18px', textAlign: 'center' }}>
                    <span style={{
                        marginRight: '5px',
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>{this.props.dashboard.activeUsers && this.props.dashboard.activeUsers.length}</span>
                        Active property seeking users. Be one of them. Update your <Link to='/profile'
                                                                                         className='nav-text'>Profile</Link>.
                    </p>
                </Card>
                <MatchConfigurationsComponent dashboard={this.props.dashboard}/>
            </React.Fragment>

        );
    }
}

DashboardComponent.propTypes = {
    history: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    getDashboardAction: PropTypes.func.isRequired,
};

