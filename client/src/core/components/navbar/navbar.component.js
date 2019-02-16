import React from 'react';
import { Icon, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoWhite from '../../../core/assets/images/InTime_logo_login@2x.png';
import LogoColored from '../../../core/assets/images/InTime_logo_login@2x.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangePasswordComponent } from '../../../routes/authenticate/change-password.component';

import './navbar.component.scss';
import { VersionInformationComponent } from '../../../routes/authenticate/version-information.component';

export class NavbarComponent extends React.Component {
    state = {
        showModal: false,
        showVersionModal: false,
    };

    onShowModal = () => {
        this.setState({ showModal: true });
    };

    onHideModal = () => {
        this.setState({ showModal: false });
    };

    onShowVersionModal = () => {
        this.setState({ showVersionModal: true });
    };

    onHideVersionModal = () => {
        this.setState({ showVersionModal: false });
    };

    render() {
        const { user, currentTheme, onLogout, onChangePassword } = this.props;

        const isThemeDay = currentTheme.toLowerCase().indexOf('day') !== -1;
        const navLogoSrc = isThemeDay ? LogoColored : LogoWhite;

        return (<Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className='logo'>
                <Link to='/'>
                    <img className='nav-logo' alt='ITW Logo' src={navLogoSrc}/>
                </Link>
            </div>
            <Menu
                mode='horizontal'
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key='1'>
                    <Link to='/travel-time' className='nav-text'>Travel Time</Link>
                </Menu.Item>
                {
                    this.props.user.roles === 'ROLE_ADMIN' ? <Menu.SubMenu key='2'
                                                                           title={<span><Icon
                                                                               type='setting'/>Settings</span>}>
                        <Menu.Item key='setting:1'><Link to='/settings/devices'
                                                         className='nav-text'><Icon
                            type='hdd'/> Devices</Link></Menu.Item>
                        <Menu.Item key='setting:2'><Link to='/settings/users'
                                                         className='nav-text'><Icon
                            type='team'/> Users</Link></Menu.Item>
                        <Menu.Item key='setting:4'><Link to='/settings/defaultParams'
                                                         className='nav-text'><Icon
                            type='code-o'/>Set Default Configs</Link></Menu.Item>
                    </Menu.SubMenu> : null
                }

                <Menu.SubMenu style={{ float: 'right' }}
                              title={<span><Icon type='user'/>{user.username || 'username'}</span>}>
                    <Menu.Item key='setting:1' onClick={this.onShowModal}><FontAwesomeIcon icon='key'/> Change Password
                    </Menu.Item>
                    <Menu.Item key='setting:2' onClick={this.onShowVersionModal}><FontAwesomeIcon
                        icon='info-circle'/> Version Information
                    </Menu.Item>
                    <Menu.Item onClick={onLogout} key='setting:3'><FontAwesomeIcon icon='lock'/> Logout</Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <ChangePasswordComponent showModal={this.state.showModal}
                                     onHide={this.onHideModal}
                                     changePassword={onChangePassword}/>
            <VersionInformationComponent showModal={this.state.showVersionModal}
                                         onHide={this.onHideVersionModal}
                                         version={this.props.version}/>
        </Layout.Header>);
    }
}


NavbarComponent.propTypes = {
    user: PropTypes.object.isRequired,
    currentTheme: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    version: PropTypes.object.isRequired,
};
