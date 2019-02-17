import React from 'react';
import { Icon, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoColored from '../../../core/assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangePasswordComponent } from '../../../routes/authenticate/change-password.component';

import './navbar.component.scss';

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
        const defaultSelectedKey = window.location.pathname.indexOf('profile') === -1 ? '1' : '2';
        const { user, onLogout, onChangePassword } = this.props;

        const isThemeDay = true;
        const navLogoSrc = isThemeDay ? LogoColored : LogoColored;

        return (<Layout.Header className={'nav-bar'} style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className='logo'>
                <Link to='/'>
                    <img className='nav-logo' alt='ITW Logo' src={navLogoSrc}/>
                </Link>
            </div>
            <Menu
                className={'menu-bar'}
                mode='horizontal'
                defaultSelectedKeys={[defaultSelectedKey]}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key='1'>
                    <Link to='/dashboard' className='nav-text'>Home</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                    <Link to='/profile' className='nav-text'>My Profile</Link>
                </Menu.Item>

                <Menu.SubMenu style={{ float: 'right' }}
                              title={<span><Icon type='user'/>{user.username || 'username'}</span>}>
                    <Menu.Item key='setting:1' onClick={this.onShowModal}><FontAwesomeIcon icon='key'/> Change Password
                    </Menu.Item>
                    <Menu.Item onClick={onLogout} key='setting:3'><FontAwesomeIcon icon='lock'/> Logout</Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <ChangePasswordComponent showModal={this.state.showModal}
                                     onHide={this.onHideModal}
                                     changePassword={onChangePassword}/>
        </Layout.Header>);
    }
}


NavbarComponent.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
};
