import React from 'react';
import PropTypes from 'prop-types';
import {LoginContainer} from './login/login.container'
import {RegisterContainer} from './register/register.container'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane;

export class AuthenticateComponent extends React.Component {

    componentDidMount() {
        // if (this.props.history.location.search.indexOf('?user=') > -1) {
        //     this.createUserAndLogin();
        // }
    }

    render() {

        return (
            <React.Fragment>
                <Tabs defaultActiveKey="1">
                <TabPane tab="Login" key="1"><LoginContainer/></TabPane>
                <TabPane tab="Register" key="2"><RegisterContainer/></TabPane>
                </Tabs>
            </React.Fragment>
        );
    }
}

AuthenticateComponent.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

