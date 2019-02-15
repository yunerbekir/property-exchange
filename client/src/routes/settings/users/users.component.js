import React from 'react';
import { Form, Input, Modal } from 'antd';
import { CrudTableComponent } from '../../../shared/components/crud-table/crud-table.component';
import PropTypes from 'prop-types';
import { UserModel } from '../../../shared/models/UserModel';
import { LoaderComponent } from '../../../shared';

export class UsersComponent extends React.Component {
    _ismounted = false;

    state = {
        showNewUserModal: false,
        newUserUsername: '',
        newUserPassword: '',
        newUserRole: 'ROLE_VIEWER',
        showLoader: true,
    };

    onUserAdd = () => {
        this.setState({ showNewUserModal: true });
    };

    onNewUsernameChange = (e) => {
        this.setState({ newUserUsername: e.target.value });
    };

    onNewPasswordChange = (e) => {
        this.setState({ newUserPassword: e.target.value });
    };

    onRoleChange = () => {
        this.setState((prevState) => {
            return { newUserRole: prevState.newUserRole === 'ROLE_VIEWER' ? 'ROLE_ADMIN' : 'ROLE_VIEWER' };
        });
    };

    onNewUserCancel = () => {
        this.setState({
            showNewUserModal: false,
            newUserUsername: '',
            newUserPassword: '',
            newUserRole: 'ROLE_VIEWER',
        });
    };

    onUserSave = (e) => {
        e.preventDefault();
        this.props.addUserAction({
            username: this.state.newUserUsername,
            password: this.state.newUserPassword,
            role: this.state.newUserRole,
        }).then((result) => {
            if (result) {
                this.setState({
                    showNewUserModal: false,
                    newUserUsername: '',
                    newUserPassword: '',
                    newUserRole: 'ROLE_VIEWER'
                });
            }
        });
    };

    onUserEdit = (userJson) => {
        this.props.updateUserAction(new UserModel(userJson));
    };
    onUserRemove = (user) => {
        this.props.removeUserAction(user.id);
    };

    getNewUserModalOkBtnProps = () => {
        return {
            form: 'user-form',
            htmlType: 'submit',
            disabled: !this.state.newUserUsername || !this.state.newUserPassword,
            title: !this.state.newUserUsername || !this.state.newUserPassword ? 'All fields are required' : ''
        };
    };

    componentDidMount() {
        this._ismounted = true;

        this.props.getUsersAction().then(() => {
            if (this._ismounted) {
                this.setState({ showLoader: false });
            }
        });
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div style={{ padding: '0 15px' }}>
                <LoaderComponent visible={this.state.showLoader} isPageLoader={true}/>
                <CrudTableComponent
                    columns={[{
                        title: 'Username',
                        dataIndex: 'username',
                        width: '50%',
                        sorter: (a, b) => a.username.localeCompare(b.username)
                    }]}
                    data={this.props.users}
                    onItemAdd={this.onUserAdd}
                    onItemEdit={this.onUserEdit}
                    onItemRemove={this.onUserRemove}
                    addBtnText={'New User'}/>
                <Modal title='New User'
                       visible={this.state.showNewUserModal}
                       onOk={this.onUserSave}
                       onCancel={this.onNewUserCancel}
                       okText={'Save'}
                       cancelText={'Cancel'}
                       okButtonProps={this.getNewUserModalOkBtnProps()}
                       closable={true}
                       destroyOnClose={true}>
                    <Form id={'user-form'} onSubmit={this.onUserSave}>
                        <Form.Item
                            {...formItemLayout}
                            label='Username:'>
                            <Input autoFocus={true}
                                   placeholder='Username...'
                                   value={this.state.newUserUsername}
                                   onChange={this.onNewUsernameChange}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label='Password:'>
                            <Input type='password'
                                   placeholder='Password...'
                                   value={this.state.newUserPassword}
                                   onChange={this.onNewPasswordChange}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}


UsersComponent.propTypes = {
    users: PropTypes.arrayOf(PropTypes.instanceOf(UserModel)).isRequired,
    getUsersAction: PropTypes.func.isRequired,
    addUserAction: PropTypes.func.isRequired,
    removeUserAction: PropTypes.func.isRequired,
    updateUserAction: PropTypes.func.isRequired,
};
