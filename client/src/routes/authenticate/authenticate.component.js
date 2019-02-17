import React from 'react';
import PropTypes from 'prop-types';
import { LoginContainer } from './login/login.container';
import { RegisterContainer } from './register/register.container';
import { Tabs } from 'antd';
import './authenticate.component.scss';


const TabPane = Tabs.TabPane;

export class AuthenticateComponent extends React.Component {
    render() {
        return (
            <div className={'authenticate-container'}>
                <React.Fragment>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab='Login' key='1'><LoginContainer /></TabPane>
                        <TabPane tab='Register' key='2'><RegisterContainer /></TabPane>
                    </Tabs>
                </React.Fragment>

            </div>
        );
    }
}

AuthenticateComponent.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

