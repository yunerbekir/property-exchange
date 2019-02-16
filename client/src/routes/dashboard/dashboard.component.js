import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                text: 'mrrrr',
            }
        };
    }

    componentDidMount() {
        // if (this.props.history.location.search.indexOf('?user=') > -1) {
        //     this.createUserAndLogin();
        // }
    }

    render() {
        console.log('aaaaaaa');
        return (
            <React.Fragment>
                <Card>
                    <p>{this.state.data.text}</p>
                </Card>
            </React.Fragment>

        );
    }
}

DashboardComponent.propTypes = {
    history: PropTypes.object.isRequired,
};

