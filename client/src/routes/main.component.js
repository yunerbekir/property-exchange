import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { NavbarComponent } from '../core';

import './main.component.scss';
import { AuthenticateContainer } from './authenticate/authenticate.container';
import { DashboardContainer } from './dashboard/dashboard.container';

import { Layout } from 'antd';
import { LoaderComponent } from '../shared';
import { ProfileContainer } from './profile/profile.container';

export class MainComponent extends React.Component {
    componentWillReceiveProps(nextProps) {
        // Fetch settings in the moment we are logging in
        if (!this.props.auth.token && nextProps.auth.token) {
        }
    }

    render() {
        const isLogged = !!this.props.auth.token;

        if (!isLogged) {
            return (
                <Layout>
                    <div>
                        <Route path='/' render={({ location }) => {
                            if (location.pathname !== '/authenticate') {
                                return <Redirect to='/authenticate'/>;
                            }

                            return null;
                        }}/>
                        <Route path={`/authenticate`} component={AuthenticateContainer}/>
                    </div>
                </Layout>
            );
        }

        return <LoaderComponent visible={false} isPageLoader={true} style={{ top: 0 }}>
            <Layout>
                <NavbarComponent
                    className={'nav-bar'}
                    user={this.props.auth.user}
                    onLogout={this.props.logoutAction}
                    onChangePassword={this.props.changePasswordAction}
                />
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Route exact path='/' render={() => (<Redirect to='/dashboard'/>)}/>
                    <Route exact path='/dashboard' component={DashboardContainer}/>
                    <Route exact path='/authenticate' render={() => (<Redirect to='/dashboard'/>)}/>
                    <Route path={`/profile`} component={ProfileContainer}/>
                </Layout.Content>
            </Layout>
        </LoaderComponent>;
    }
}

MainComponent.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.any.isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    logoutAction: PropTypes.func.isRequired,
};
