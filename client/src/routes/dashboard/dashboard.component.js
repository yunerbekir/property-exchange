import React from 'react';
import PropTypes from 'prop-types';
import { AppLayoutModel } from '../../shared/models/AppLayoutModel';
import { Button } from 'antd/lib/radio';

export class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                text:'maciii <3'
            }
        };
    }

    componentDidMount() {
        // if (this.props.history.location.search.indexOf('?user=') > -1) {
        //     this.createUserAndLogin();
        // }
    }

    render() {

        return (
            <React.Fragment>
                <Button>{this.state.data.value}</Button>
            </React.Fragment>

        );
    }
}

DashboardComponent.propTypes = {
    history: PropTypes.object.isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
};

