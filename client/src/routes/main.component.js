import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { NavbarComponent } from '../core';
import { AppLayoutModel } from '../shared/models/AppLayoutModel';

import './main.component.scss';
import { AuthenticateContainer } from './authenticate/authenticate.container';
import { DashboardContainer } from './dashboard/dashboard.container';
import { DevicesContainer } from './settings/devices/devices.container';
import { UsersContainer } from './settings/users/users.container';
import { DefaultParamsContainer } from './settings/default-params/default-params.container';
import deviceMarker from '../core/assets/map-markers/map-marker-solid.svg';

import { Layout } from 'antd';
import L from 'leaflet';
import { LoaderComponent } from '../shared';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: deviceMarker,
    iconUrl: deviceMarker,
    shadowUrl: null,
    iconAnchor: [12, 12],
    iconSize: [24, 24],
});

export class MainComponent extends React.Component {
    state = {
        showLoader: true
    };

    static getThemeName(theme) {
        switch (theme) {
            case 'Day Theme':
                return 'day';
            case 'Night Theme':
                return 'night';
            default:
                return 'day';
        }
    }

    static updateBodyThemeClass(theme) {
        Array.from(document.documentElement.classList).filter(c => c.indexOf('theme-') > -1).forEach(obsoleteThemeClass => document.documentElement.classList.remove(obsoleteThemeClass));

        document.documentElement.classList.add(`theme-${MainComponent.getThemeName(theme)}`);
    }

    getAllLayoutSettings() {
        this.props.getAppLayoutSettingsAction().then(() => {
            this.setState({ showLoader: false });
        });
    }

    componentDidMount() {
        MainComponent.updateBodyThemeClass(this.props.appLayout.getSelectedTheme());

        this.props.getApiVersionAction();
        this.getAllLayoutSettings();
    }

    componentWillReceiveProps(nextProps) {
        // Fetch settings in the moment we are logging in
        if (!this.props.auth.token && nextProps.auth.token) {
            this.getAllLayoutSettings();
        }

        if (this.props.appLayout.getSelectedTheme() !== nextProps.appLayout.getSelectedTheme()) {
            MainComponent.updateBodyThemeClass(nextProps.appLayout.getSelectedTheme());
        }
    }

    render() {
        const isLogged = !!this.props.auth.token;

        if ((this.props.history.location.pathname === '/authenticate' && this.props.history.location.search.indexOf('?user=') > -1) || !isLogged) {
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

        return <LoaderComponent visible={this.state.showLoader} isPageLoader={true} style={{ top: 0 }}>
            <Layout>
                <NavbarComponent
                    currentTheme={this.props.appLayout.getSelectedTheme()}
                    user={this.props.auth.user}
                    onLogout={this.props.logoutAction}
                    onChangePassword={this.props.changePasswordAction}
                    version={this.props.version}
                />
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Route exact path='/' render={() => (<Redirect to='/travel-time'/>)}/>
                    <Route exact path='/authenticate' render={() => (<Redirect to='/travel-time'/>)}/>
                    <Route path={`/dashboard`} component={DashboardContainer}/>
                    <Route path={`/settings/users`} render={() => this.props.auth.user.roles !== 'ROLE_ADMIN' ?
                        <Redirect to='/travel-time'/> : <UsersContainer/>}/>
                    <Route path={`/settings/devices`} render={() => this.props.auth.user.roles !== 'ROLE_ADMIN' ?
                        <Redirect to='/travel-time'/> : <DevicesContainer/>}/>
                    <Route path={`/settings/defaultParams`}
                           render={() => this.props.auth.user.roles !== 'ROLE_ADMIN' ?
                               <Redirect to='/travel-time'/> : <DefaultParamsContainer/>}/>
                </Layout.Content>
            </Layout>
        </LoaderComponent>;
    }
}

MainComponent.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.any.isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    logoutAction: PropTypes.func.isRequired,
    getAppLayoutSettingsAction: PropTypes.func.isRequired,
    version: PropTypes.object.isRequired,
    getApiVersionAction: PropTypes.func.isRequired,
};
