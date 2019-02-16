import React from 'react';
import { Form, Input, Modal } from 'antd';
import './change-password.component.scss';
import PropTypes from 'prop-types';

export class ChangePasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            error: ''
        };
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => {
                this.validateField(name, value);
            });
    };

    validateField = (fieldName, value) => {
        let error = this.state.error;

        let confirmFirstNewPasswordValid = false;
        let confirmSecondNewPasswordValid = false;

        const handleValidationFields = {
            oldPassword: () => {
            },
            newPassword: () => {
                confirmFirstNewPasswordValid = value === this.state.confirmNewPassword;
                error = confirmFirstNewPasswordValid ? '' : `Password doesn't match`;
            },
            confirmNewPassword: () => {
                confirmSecondNewPasswordValid = value === this.state.newPassword;
                error = confirmSecondNewPasswordValid ? '' : `Password doesn't match`;
            }
        };

        handleValidationFields[fieldName]();

        this.setState({ error });
    };

    changePassword = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = this.state;
        this.props.changePassword({ oldPassword, newPassword }).then(({ error }) => {
            if (error) {
                return;
            }
            this.props.onHide();
            this.setState({ oldPassword: '', newPassword: '', confirmNewPassword: '', });
        });
    };

    cancelChanges = () => {
        this.props.onHide();

        this.setState({
            oldPassword: '', newPassword: '', confirmNewPassword: '',
            formErrors: { oldPassword: '', newPassword: '', confirmNewPassword: '' }
        });
    };

    getChangePasswordOkBtnProps = () => {
        return {
            form: 'change-password-form',
            htmlType: 'submit',
            disabled: this.state.error || !this.state.oldPassword || !this.state.newPassword || !this.state.confirmNewPassword,
            title: this.state.error || !this.state.oldPassword || !this.state.newPassword || !this.state.confirmNewPassword ? this.state.error || 'All fields are required' : ''
        };
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 13 },
        };

        return (
            <Modal className='change-password-component'
                   title='Change Password'
                   visible={this.props.showModal}
                   onOk={this.changePassword}
                   okButtonProps={this.getChangePasswordOkBtnProps()}
                   onCancel={this.cancelChanges}
                   okText={'Save'}
                   cancelText={'Cancel'}
                   closable={true}
                   destroyOnClose={true}>
                <Form id='change-password-form' className={'login-form'} onSubmit={this.changePassword}>
                    <Form.Item
                        {...formItemLayout}
                        label='Old password:'>
                        <Input autoFocus='true' type='password' name='oldPassword'
                               placeholder='Old password...'
                               value={this.state.oldPassword}
                               onChange={this.handleUserInput}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label='New password:'>
                        <Input type='password' name='newPassword'
                               placeholder='New password...'
                               value={this.state.newPassword}
                               onChange={this.handleUserInput}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label='Confirm password:'>
                        <Input type='password' name='confirmNewPassword'
                               placeholder='Confirm new password...'
                               value={this.state.confirmNewPassword}
                               onChange={this.handleUserInput}/>
                    </Form.Item>

                    <div className='error-container'>{this.state.error}</div>
                </Form>
            </Modal>
        );
    };
}

ChangePasswordComponent.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
};
