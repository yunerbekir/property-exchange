import React from 'react';
import PropTypes from 'prop-types';
import '../login-register.component.scss';

import { Button, Form, Input } from 'antd';
import { LoaderComponent } from '../../../shared';

export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showLoader: false,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.login = this.login.bind(this);
        this.performLoginAction = this.performLoginAction.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    login(e) {
        e.preventDefault();
        const { username, password } = this.state;
        this.performLoginAction({ username, password });
    }

    performLoginAction({ username, password }) {
        this.setState({ showLoader: true }, () => {
            this.props.loginAction({ username, password }).then((result) => {
                if (!result) {
                    this.setState({ showLoader: false });
                }
            });
        });
    }

    componentDidMount() {
        // if (this.props.history.location.search.indexOf('?user=') > -1) {
        //     this.createUserAndLogin();
        // }
    }

    render() {
        return (
            <div className={'login-component'}>
                <Form className={'login-form'} onSubmit={this.login}>
                    <Input autoFocus={true}
                           type='text' name='username'
                           placeholder='Username...'
                           value={this.state.username}
                           onChange={this.handleUserInput}/>
                    <Input type='password' name='password'
                           placeholder='Password...'
                           value={this.state.password}
                           onChange={this.handleUserInput}/>
                    <Input type='text' className={'hidden-input'}/>
                    <Button htmlType={'submit'}>
                        <LoaderComponent visible={this.state.showLoader}>Log in</LoaderComponent>
                    </Button>
                </Form>

            </div>

        );
    }
}

LoginComponent.propTypes = {
    registerUserAction: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loginAction: PropTypes.func.isRequired,
};

